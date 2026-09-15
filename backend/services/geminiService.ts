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
let currentKey: string | null = null;

function getGenAIClient(overrideKey?: string): GoogleGenAI | null {
  const apiKey = overrideKey || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!aiClient || currentKey !== apiKey) {
    currentKey = apiKey;
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
  public static setApiKey(newKey: string): void {
    process.env.GEMINI_API_KEY = newKey.trim();
    currentKey = newKey.trim();
    aiClient = new GoogleGenAI({
      apiKey: newKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }

  public static disconnectApiKey(): void {
    process.env.GEMINI_API_KEY = '';
    currentKey = null;
    aiClient = null;
  }

  public static async testApiKey(apiKey: string): Promise<{ success: boolean; model: string; message: string }> {
    try {
      const trimmed = apiKey.trim();
      if (!trimmed || trimmed === 'MY_GEMINI_API_KEY' || trimmed.length < 10) {
        return { success: false, model: 'gemini-2.5-flash', message: 'API key is too short or invalid.' };
      }
      const client = new GoogleGenAI({
        apiKey: trimmed,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
      const testPrompt = 'Respond strictly with the single word "VERIFIED".';
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: testPrompt
      });
      if (response && response.text) {
        return {
          success: true,
          model: 'gemini-2.5-flash',
          message: 'Gemini API Key successfully verified and connected with model gemini-2.5-flash!'
        };
      }
      return { success: false, model: 'gemini-2.5-flash', message: 'No response received from Gemini API.' };
    } catch (err: any) {
      let friendlyMsg = 'Authentication failed: Invalid API key or quota exceeded.';
      if (err.message) {
        if (err.message.includes('API key not valid') || err.message.includes('API_KEY_INVALID')) {
          friendlyMsg = 'API key is not valid. Please verify your Google Gemini API key from Google AI Studio.';
        } else if (err.message.includes('quota') || err.message.includes('RESOURCE_EXHAUSTED')) {
          friendlyMsg = 'Gemini API quota exceeded or billing not active for this key.';
        } else {
          try {
            const parsed = JSON.parse(err.message);
            if (parsed.error?.message) friendlyMsg = parsed.error.message;
          } catch (_) {
            friendlyMsg = err.message;
          }
        }
      }
      return {
        success: false,
        model: 'gemini-2.5-flash',
        message: friendlyMsg
      };
    }
  }

  public static getApiKeyStatus(): { configured: boolean; maskedKey?: string; model: string } {
    const key = process.env.GEMINI_API_KEY;
    const configured = Boolean(key && key !== 'MY_GEMINI_API_KEY' && key.trim().length > 10);
    return {
      configured,
      maskedKey: configured ? `${key!.substring(0, 6)}...${key!.substring(key!.length - 4)}` : undefined,
      model: 'gemini-2.5-flash'
    };
  }

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
    citizenData: Record<string, any>,
    overrideApiKey?: string
  ): Promise<ChecklistResponse> {
    const ai = getGenAIClient(overrideApiKey);

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
        // Delayed Birth or Death Registration
        else if (citizenData.delayedDays && !citizenData.delayedDays.includes('Under 21') && doc.document_name.toLowerCase().includes('magistrate')) {
          isMandatory = true;
          customReason = `Mandatory because the event registration is delayed beyond standard 21-day timeline (${citizenData.delayedDays}).`;
        }
        // Unnatural death post-mortem
        else if (citizenData.causeOfDeath && citizenData.causeOfDeath.includes('Unnatural') && doc.document_name.toLowerCase().includes('post-mortem')) {
          isMandatory = true;
          customReason = `Mandatory due to reported accidental or unnatural circumstances requiring medico-legal clearance.`;
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
        else if ((citizenData.disabilityStatus === 'Yes' || service.id === 22) && doc.document_name.toLowerCase().includes('disability')) {
          isMandatory = true;
          customReason = `Required for Persons with Benchmark Disabilities (PwD) statutory verification.`;
        }
        // Severe disability > 80% high support
        else if (Number(citizenData.disabilityPercentage) >= 80 && doc.document_name.toLowerCase().includes('support')) {
          isMandatory = true;
          customReason = `Required for enhanced financial pension grant due to certified >= 80% severe disability.`;
        }
        // Tatkaal Passport
        else if (citizenData.passportScheme === 'Tatkaal' && doc.document_name.toLowerCase().includes('tatkaal')) {
          isMandatory = true;
          customReason = `Mandatory affidavit and verification credential required under the Tatkaal urgent passport scheme.`;
        }
        // Minor Passport / PAN Assessee
        else if (citizenData.age && Number(citizenData.age) < 18 && (doc.document_name.toLowerCase().includes('annexure c') || doc.document_name.toLowerCase().includes('representative assessee'))) {
          isMandatory = true;
          customReason = `Mandatory for minor applicants under 18 years of age represented by parent or legal guardian.`;
        }
        // Passport renewal
        else if (citizenData.passportApplicationType && citizenData.passportApplicationType.includes('Renewal') && doc.document_name.toLowerCase().includes('old / expired passport')) {
          isMandatory = true;
          customReason = `Mandatory for cancellation and re-issuance of existing passport booklet.`;
        }
        // Permanent Driving Licence (requires LL)
        else if (citizenData.dlApplicationType && citizenData.dlApplicationType.includes('Permanent') && doc.document_name.toLowerCase().includes('learner licence')) {
          isMandatory = true;
          customReason = `Mandatory: Valid Learner's Licence must be held for at least 30 days before taking the permanent driving test.`;
        }
        // Medical Form 1A for DL (age >= 40 or commercial)
        else if ((Number(citizenData.age) >= 40 || citizenData.dlCategory === 'Transport / Commercial') && doc.document_name.toLowerCase().includes('form 1a')) {
          isMandatory = true;
          customReason = `Mandatory medical fitness certification required because age is 40+ or licence is for commercial/transport driving.`;
        }
        // Vehicle Hypothecation (Form 34)
        else if (citizenData.vehicleFinanceStatus && citizenData.vehicleFinanceStatus.includes('Loan') && doc.document_name.toLowerCase().includes('hypothecation')) {
          isMandatory = true;
          customReason = `Mandatory Form 34 endorsement because the vehicle is purchased under bank auto loan / finance.`;
        }
        // Vehicle Inter-State NOC (Form 28)
        else if (citizenData.vehicleTransferType && citizenData.vehicleTransferType.includes('Inter-State') && doc.document_name.toLowerCase().includes('form 28')) {
          isMandatory = true;
          customReason = `Mandatory No Objection Certificate from previous state RTO for inter-state vehicle transfer.`;
        }
        // Ration Card Surrender/Deletion Slip
        else if (citizenData.rationCardType && citizenData.rationCardType.includes('Relocation') && doc.document_name.toLowerCase().includes('surrender')) {
          isMandatory = true;
          customReason = `Mandatory deletion/surrender certificate to prevent duplicate enrolment across civil supply jurisdictions.`;
        }
        // PM-KISAN Inherited Land Mutation
        else if (citizenData.landSuccessionType && citizenData.landSuccessionType.includes('Inherited') && doc.document_name.toLowerCase().includes('mutation')) {
          isMandatory = true;
          customReason = `Required to establish lawful genealogical title and mutation of inherited agricultural land.`;
        }
        // MSME GSTIN
        else if (citizenData.isGstLiable === 'Yes' && doc.document_name.toLowerCase().includes('gstin')) {
          isMandatory = true;
          customReason = `Mandatory GSTIN certificate because business turnover or activity is liable to GST registration.`;
        }
        // MSME Partnership / Company Incorporation
        else if (citizenData.enterpriseType && citizenData.enterpriseType !== 'Proprietorship' && (doc.document_name.toLowerCase().includes('partnership') || doc.document_name.toLowerCase().includes('incorporation'))) {
          isMandatory = true;
          customReason = `Mandatory legal deed/certificate verifying registered status of ${citizenData.enterpriseType}.`;
        }
        // Legal Heir NOC from co-heirs
        else if (citizenData.claimingNoc === 'Yes' && doc.document_name.toLowerCase().includes('no-objection')) {
          isMandatory = true;
          customReason = `Required consent affidavits from co-heirs to process claim or pension in single applicant name.`;
        }
        // Remarriage divorce / death certificate
        else if (citizenData.remarriageStatus === 'Yes' && (doc.document_name.toLowerCase().includes('divorce') || doc.document_name.toLowerCase().includes('death certificate of previous'))) {
          isMandatory = true;
          customReason = `Statutory legal proof demonstrating dissolution or termination of previous matrimonial union.`;
        }
        // Head of Family Aadhaar
        else if (citizenData.hasOwnAddressProof === 'No' && doc.document_name.toLowerCase().includes('head of family')) {
          isMandatory = true;
          customReason = `Required because applicant is verifying address using Head of Family (HoF) relationship endorsement.`;
        }
        // Domicile / Nativity Parental Ancestry
        else if (citizenData.domicileBasis && citizenData.domicileBasis.includes('Ancestry') && (doc.document_name.toLowerCase().includes('parent') || doc.document_name.toLowerCase().includes('ancestry') || doc.document_name.toLowerCase().includes('birth certificate of parent'))) {
          isMandatory = true;
          customReason = `Mandatory because domicile is being claimed on the basis of parental ancestry and native lineage.`;
        }
        // Non-Creamy Layer 3-year Income Tax Returns
        else if (citizenData.taxPayerStatus === 'Yes' && (doc.document_name.toLowerCase().includes('tax') || doc.document_name.toLowerCase().includes('itr') || doc.document_name.toLowerCase().includes('salary slip'))) {
          isMandatory = true;
          customReason = `Required to determine non-creamy layer ceiling eligibility based on gross parental/family annual income.`;
        }
        // EWS Asset Declaration
        else if (service.id === 31 && (doc.document_name.toLowerCase().includes('asset') || doc.document_name.toLowerCase().includes('property') || doc.document_name.toLowerCase().includes('land'))) {
          isMandatory = true;
          customReason = `Statutory EWS requirement: Must verify that family landholding is under 5 acres and residential flat is under 1000 sq ft.`;
        }
        // ST Certificate Community Inquiry & Genealogy
        else if (service.id === 34 && (doc.document_name.toLowerCase().includes('genealogy') || doc.document_name.toLowerCase().includes('anthropological') || doc.document_name.toLowerCase().includes('inquiry') || doc.document_name.toLowerCase().includes('rdo'))) {
          isMandatory = true;
          customReason = `Statutory ST requirement: Mandated inquiry by Revenue Divisional Officer (RDO) / Sub-Collector to confirm tribal ethnicity.`;
        }
        // Building Plan Approval: High-Rise / Commercial Fire NOC
        else if (citizenData.buildingType && (citizenData.buildingType.includes('Commercial') || citizenData.buildingType.includes('Multi-Storey') || citizenData.buildingHeightOver15m === 'Yes') && (doc.document_name.toLowerCase().includes('fire') || doc.document_name.toLowerCase().includes('structural'))) {
          isMandatory = true;
          customReason = `Mandatory Fire & Rescue Services NOC and Registered Structural Engineer Stability Certificate for high-rise/commercial structures.`;
        }
        // Trade Licence Hazardous / Eating Establishment
        else if (citizenData.tradeCategory && (citizenData.tradeCategory.includes('Food') || citizenData.tradeCategory.includes('Hazardous') || citizenData.tradeCategory.includes('Manufacturing')) && (doc.document_name.toLowerCase().includes('fire') || doc.document_name.toLowerCase().includes('health'))) {
          isMandatory = true;
          customReason = `Mandatory health officer sanitation clearance and Fire NOC for food and hazardous trade establishments.`;
        }
        // Factory Licence Plant Layout & Boiler NOC
        else if (service.id === 46 && (doc.document_name.toLowerCase().includes('blueprint') || doc.document_name.toLowerCase().includes('hazardous') || doc.document_name.toLowerCase().includes('pollution'))) {
          isMandatory = true;
          customReason = `Mandatory DISH approval for factory premises layout, machine layout, and pollution control consent to operate.`;
        }
        // FSSAI Food Business Water Testing & FSMS
        else if (citizenData.foodBusinessType && (citizenData.foodBusinessType.includes('Manufacturer') || citizenData.foodBusinessType.includes('Processor')) && (doc.document_name.toLowerCase().includes('water') || doc.document_name.toLowerCase().includes('fsms') || doc.document_name.toLowerCase().includes('machinery'))) {
          isMandatory = true;
          customReason = `Mandatory NABL accredited lab potable water test report and FSMS plan required for food manufacturing units.`;
        }
        // GST Non-Proprietor Authorization / Partnership Deed
        else if (citizenData.gstEntityConstitution && citizenData.gstEntityConstitution !== 'Proprietorship' && (doc.document_name.toLowerCase().includes('partnership') || doc.document_name.toLowerCase().includes('board') || doc.document_name.toLowerCase().includes('authorization'))) {
          isMandatory = true;
          customReason = `Mandatory constitutional deed and Letter of Authorization / Board Resolution for registered partnership/company.`;
        }
        // EPFO Demographic Joint Declaration
        else if (citizenData.epfRequestType && citizenData.epfRequestType.includes('Correction') && doc.document_name.toLowerCase().includes('joint declaration')) {
          isMandatory = true;
          customReason = `Mandatory EPFO Joint Declaration Form signed by both employee and authorized employer signatory.`;
        }
        // National Scholarship Hosteller Certificate
        else if (citizenData.studentResidenceType && citizenData.studentResidenceType.includes('Hosteller') && doc.document_name.toLowerCase().includes('hostel')) {
          isMandatory = true;
          customReason = `Mandatory warden-attested hostel fee receipt to claim higher hosteller maintenance allowance.`;
        }
        // Encumbrance Certificate Extended Search
        else if (service.id === 38 && doc.document_name.toLowerCase().includes('prior title') && Number(citizenData.ecSearchYears) > 15) {
          isMandatory = true;
          customReason = `Mandatory prior link documents required for searches spanning beyond 15 years to trace clean title lineage.`;
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

