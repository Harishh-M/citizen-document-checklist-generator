import { GoogleGenAI, Type } from '@google/genai';
import { DocumentRecord, ServiceRecord } from '../config/db.js';

export interface ValidatedDocumentItem {
  id?: number;
  name: string;
  status: 'mandatory' | 'conditional';
  reason: string;
  officialDescription?: string;
  conditionRule?: string | null;
  source: string;
}

export interface ChecklistResponse {
  service: string;
  department: string;
  summary: string;
  citizenProfileSummary: string;
  mandatoryDocuments: ValidatedDocumentItem[];
  conditionalDocuments: ValidatedDocumentItem[];
  allDocuments: ValidatedDocumentItem[];
  source: string;
  sourceDate: string;
  disclaimer: string;
  aiGenerated: boolean;
  modelName: string;
  hallucinationAudit: {
    totalOfficialDocs: number;
    aiProposedDocs: number;
    unsupportedDocsFiltered: string[];
    passedValidation: boolean;
  };
}

let aiClient: GoogleGenAI | null = null;

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

export class GeminiService {
  private static systemInstruction = `You are an AI assistant for government service documentation.
Your task is to generate a personalized document checklist.

IMPORTANT RULES:
1. Use ONLY the government requirements provided in the context.
2. Never invent a document.
3. Never create a government rule that is not present in the supplied information.
4. Do not assume that a document is required unless the supplied information supports it.
5. Classify documents as mandatory or conditional only when supported by the provided requirements.
6. Explain documents using simple, citizen-friendly language.
7. If the supplied information is insufficient, clearly state that information is insufficient.
8. Do not present assumptions as official requirements.
9. Return valid JSON only.
10. Preserve the source information associated with the government requirements.`;

  /**
   * Generates a personalized document checklist by analyzing citizen details against government requirements
   */
  public static async analyzeChecklist(
    service: ServiceRecord,
    officialDocuments: DocumentRecord[],
    citizenData: Record<string, any>
  ): Promise<ChecklistResponse> {
    const ai = getGenAIClient();

    // If Gemini client cannot be initialized (e.g. key not provided), use safe rule-based fallback
    if (!ai) {
      console.log('[GeminiService] No API key detected. Using deterministic government rule engine fallback.');
      return this.ruleBasedFallback(service, officialDocuments, citizenData, 'Deterministic Government Rule Engine (No Gemini API Key)');
    }

    try {
      const prompt = `SELECTED SERVICE:
Name: ${service.service_name}
Department: ${service.department}
Description: ${service.description}
Eligibility Criteria: ${service.eligibility || 'Standard state resident criteria'}

CITIZEN DETAILS:
${JSON.stringify(citizenData, null, 2)}

GOVERNMENT REQUIREMENTS (Official Government Registry Source of Truth):
${officialDocuments.map((doc, idx) => `
[Requirement #${idx + 1}]
Name: "${doc.document_name}"
Official Description: ${doc.description}
Default Requirement Type: ${doc.mandatory ? 'Mandatory' : 'Conditional'}
Applicable Condition Rule: ${doc.condition_rule || 'Applies to all eligible applicants'}
Official Source: ${doc.source}
`).join('\n')}

SOURCE:
${service.source} (Last verified: ${service.last_updated})

TASK:
Analyze the citizen's specific details against each government requirement above.
- For mandatory documents, explain in simple, friendly terms why the citizen needs to provide this.
- For conditional documents, determine whether based on the citizen's provided profile (e.g., income, occupation, category, student status, housing condition, age), the document applies or when the citizen must carry it.
- Never output any document not listed in the GOVERNMENT REQUIREMENTS.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: this.systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              service: { type: Type.STRING },
              summary: { type: Type.STRING },
              citizenProfileSummary: { type: Type.STRING, description: 'Short summary of the citizen profile applied' },
              documents: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    status: { type: Type.STRING, description: 'Must be either "mandatory" or "conditional"' },
                    reason: { type: Type.STRING, description: 'Simple, citizen-friendly explanation' }
                  },
                  required: ['name', 'status', 'reason']
                }
              },
              source: { type: Type.STRING },
              sourceDate: { type: Type.STRING },
              disclaimer: { type: Type.STRING }
            },
            required: ['service', 'summary', 'documents', 'source', 'disclaimer']
          }
        }
      });

      const responseText = response.text?.trim() || '';
      const parsed = JSON.parse(responseText);

      // Validate and enforce Hallucination Prevention Safeguards
      return this.validateAndFilterResponse(parsed, service, officialDocuments, citizenData, 'gemini-2.5-flash');
    } catch (error: any) {
      console.error('[GeminiService] AI generation failed or returned invalid format:', error);
      return this.ruleBasedFallback(service, officialDocuments, citizenData, `Fallback Engine (AI Error: ${error.message || 'Service Unavailable'})`);
    }
  }

  /**
   * Strict Hallucination Prevention Filter
   * Cross-references AI-generated documents against official government registry requirements
   */
  private static validateAndFilterResponse(
    aiOutput: any,
    service: ServiceRecord,
    officialDocuments: DocumentRecord[],
    citizenData: Record<string, any>,
    modelName: string
  ): ChecklistResponse {
    const unsupportedDocsFiltered: string[] = [];
    const validatedDocs: ValidatedDocumentItem[] = [];

    const rawDocs = Array.isArray(aiOutput.documents) ? aiOutput.documents : [];

    // Map each official document for fast matching
    const officialMap = new Map<string, DocumentRecord>();
    for (const doc of officialDocuments) {
      officialMap.set(this.normalizeName(doc.document_name), doc);
    }

    // Check each document proposed by AI
    for (const rawDoc of rawDocs) {
      const docName = String(rawDoc.name || '').trim();
      const normalized = this.normalizeName(docName);

      // Find match in official database
      let match = officialMap.get(normalized);

      // Try substring or keyword matching if direct match fails
      if (!match) {
        for (const [key, doc] of officialMap.entries()) {
          if (key.includes(normalized) || normalized.includes(key)) {
            match = doc;
            break;
          }
        }
      }

      if (!match) {
        // AI generated an unsupported document not present in government source of truth!
        console.warn(`[Hallucination Prevention] AI attempted to invent unsupported document: "${docName}". Discarded.`);
        unsupportedDocsFiltered.push(docName);
        continue;
      }

      const status: 'mandatory' | 'conditional' = 
        rawDoc.status === 'mandatory' || rawDoc.status === 'conditional' 
          ? rawDoc.status 
          : (match.mandatory ? 'mandatory' : 'conditional');

      validatedDocs.push({
        id: match.id,
        name: match.document_name, // Enforce official government nomenclature
        status,
        reason: String(rawDoc.reason || match.description),
        officialDescription: match.description,
        conditionRule: match.condition_rule,
        source: match.source
      });
    }

    // If AI missed any mandatory official documents, guarantee they are included
    for (const official of officialDocuments) {
      const exists = validatedDocs.some(v => v.id === official.id);
      if (!exists) {
        validatedDocs.push({
          id: official.id,
          name: official.document_name,
          status: official.mandatory ? 'mandatory' : 'conditional',
          reason: official.mandatory
            ? `Standard mandatory verification: ${official.description}`
            : (official.condition_rule || official.description),
          officialDescription: official.description,
          conditionRule: official.condition_rule,
          source: official.source
        });
      }
    }

    const mandatory = validatedDocs.filter(d => d.status === 'mandatory');
    const conditional = validatedDocs.filter(d => d.status === 'conditional');

    return {
      service: service.service_name,
      department: service.department,
      summary: aiOutput.summary || `Personalized document requirements analyzed for ${service.service_name}.`,
      citizenProfileSummary: aiOutput.citizenProfileSummary || this.summarizeCitizen(citizenData),
      mandatoryDocuments: mandatory,
      conditionalDocuments: conditional,
      allDocuments: validatedDocs,
      source: service.source,
      sourceDate: service.last_updated,
      disclaimer: 'Requirements are based on the official government information stored in the system. Please verify the latest official requirements before submitting your application.',
      aiGenerated: true,
      modelName,
      hallucinationAudit: {
        totalOfficialDocs: officialDocuments.length,
        aiProposedDocs: rawDocs.length,
        unsupportedDocsFiltered,
        passedValidation: unsupportedDocsFiltered.length === 0
      }
    };
  }

  /**
   * Deterministic Fallback Engine when AI is unavailable or offline
   */
  private static ruleBasedFallback(
    service: ServiceRecord,
    officialDocuments: DocumentRecord[],
    citizenData: Record<string, any>,
    reason: string
  ): ChecklistResponse {
    const validatedDocs: ValidatedDocumentItem[] = officialDocuments.map(doc => {
      let isMandatory = Boolean(doc.mandatory);
      let customReason = doc.description;

      // Personalized heuristics based on citizen data
      if (doc.condition_rule) {
        // Income & Bank Statement conditions
        if (citizenData.annualIncome && Number(citizenData.annualIncome) > 200000 && doc.document_name.toLowerCase().includes('bank')) {
          isMandatory = true;
          customReason = `Based on your stated income (₹${Number(citizenData.annualIncome).toLocaleString()}), bank account transaction proof is required.`;
        } 
        // Non-salaried informal income affidavit
        else if (citizenData.occupation && (citizenData.occupation.includes('Self-Employed') || citizenData.occupation.includes('Daily Wage') || citizenData.occupation.includes('Agricultural')) && doc.document_name.toLowerCase().includes('affidavit')) {
          isMandatory = true;
          customReason = `Required as you indicated "${citizenData.occupation}" without standard salary certificates.`;
        }
        // Social Category / Caste Certificate
        else if (citizenData.category && citizenData.category !== 'General' && doc.document_name.toLowerCase().includes('caste')) {
          isMandatory = true;
          customReason = `Required because you indicated social category "${citizenData.category}" for affirmative benefits/exemptions.`;
        }
        // Residence / Rental Agreement
        else if (citizenData.accommodationType && citizenData.accommodationType.includes('Rented') && doc.document_name.toLowerCase().includes('rental')) {
          isMandatory = true;
          customReason = `Required because you indicated living in rented / leased accommodation.`;
        }
        // Delayed Birth Registration
        else if (citizenData.delayedDays && !citizenData.delayedDays.includes('Under 21') && doc.document_name.toLowerCase().includes('magistrate')) {
          isMandatory = true;
          customReason = `Mandatory because the birth registration is delayed beyond standard 21-day timeline (${citizenData.delayedDays}).`;
        }
        // Widow Pension Death Certificate
        else if (citizenData.pensionCategory && citizenData.pensionCategory.includes('Widow') && doc.document_name.toLowerCase().includes('death')) {
          isMandatory = true;
          customReason = `Mandatory to substantiate eligibility under the Widow Pension scheme.`;
        }
        // Housing Land Patta / Deed
        else if (citizenData.ownsLandPlot === 'Yes' && doc.document_name.toLowerCase().includes('land')) {
          isMandatory = true;
          customReason = `Required to verify undisputed title for Beneficiary-Led individual construction grant.`;
        }
        // Active Loan Statement
        else if (citizenData.existingLoanStatus && citizenData.existingLoanStatus.includes('Active') && doc.document_name.toLowerCase().includes('loan')) {
          isMandatory = true;
          customReason = `Required to apply interest subsidy to your existing active bank education loan.`;
        }
        // Disability UDID
        else if (citizenData.disabilityStatus === 'Yes' && doc.document_name.toLowerCase().includes('disability')) {
          isMandatory = true;
          customReason = `Required for Persons with Benchmark Disabilities (PwD) quota verification.`;
        }
        else {
          customReason = `Condition: ${doc.condition_rule}`;
        }
      } else {
        customReason = `Required for identity and statutory verification: ${doc.description}`;
      }

      return {
        id: doc.id,
        name: doc.document_name,
        status: isMandatory ? 'mandatory' : 'conditional',
        reason: customReason,
        officialDescription: doc.description,
        conditionRule: doc.condition_rule,
        source: doc.source
      };
    });

    const mandatory = validatedDocs.filter(d => d.status === 'mandatory');
    const conditional = validatedDocs.filter(d => d.status === 'conditional');

    return {
      service: service.service_name,
      department: service.department,
      summary: `Standard government document checklist prepared for ${service.service_name}. (${reason})`,
      citizenProfileSummary: this.summarizeCitizen(citizenData),
      mandatoryDocuments: mandatory,
      conditionalDocuments: conditional,
      allDocuments: validatedDocs,
      source: service.source,
      sourceDate: service.last_updated,
      disclaimer: 'Requirements are based on the available government information in the system database. Please verify latest guidelines before application submission.',
      aiGenerated: false,
      modelName: 'Government Rule Engine (Deterministic)',
      hallucinationAudit: {
        totalOfficialDocs: officialDocuments.length,
        aiProposedDocs: officialDocuments.length,
        unsupportedDocsFiltered: [],
        passedValidation: true
      }
    };
  }

  private static normalizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  private static summarizeCitizen(data: Record<string, any>): string {
    const parts: string[] = [];
    if (data.name) parts.push(`Citizen: ${data.name}`);
    if (data.age) parts.push(`Age: ${data.age} yrs`);
    if (data.district) parts.push(`District: ${data.district}`);
    if (data.occupation) parts.push(`Occupation: ${data.occupation}`);
    if (data.annualIncome) parts.push(`Annual Income: ₹${Number(data.annualIncome).toLocaleString()}`);
    if (data.category) parts.push(`Category: ${data.category}`);
    if (data.purpose) parts.push(`Purpose: ${data.purpose}`);
    return parts.length > 0 ? parts.join(' | ') : 'Applicant Profile Details Provided';
  }
}

