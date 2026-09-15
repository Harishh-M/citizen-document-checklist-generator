export interface Service {
  id: number;
  service_name: string;
  department: string;
  description: string;
  eligibility: string;
  procedure_steps: string;
  source: string;
  last_updated: string;
  jurisdiction?: 'State' | 'Central' | 'State/Central';
  created_at?: string;
}

export interface DocumentItem {
  id?: number;
  name: string;
  status: 'mandatory' | 'conditional';
  reason: string;
  officialDescription?: string;
  conditionRule?: string | null;
  source: string;
}

export interface ChecklistResultData {
  requestId: number;
  service: string;
  department: string;
  summary: string;
  citizenProfileSummary: string;
  mandatoryDocuments: DocumentItem[];
  conditionalDocuments: DocumentItem[];
  documents: DocumentItem[];
  source: string;
  sourceDate: string;
  disclaimer: string;
  aiGenerated: boolean;
  modelName: string;
  hallucinationAudit?: {
    totalOfficialDocs: number;
    aiProposedDocs: number;
    unsupportedDocsFiltered: string[];
    passedValidation: boolean;
  };
}

export interface CitizenFormData {
  name: string;
  age?: number | string;
  state?: string;
  district?: string;
  occupation?: string;
  annualIncome?: number | string;
  category?: string;
  purpose?: string;
  yearsOfResidence?: number | string;
  accommodationType?: string;
  courseName?: string;
  institution?: string;
  marksPercentage?: number | string;
  disabilityStatus?: string;
  hasBplCard?: string;
  hasPuccaHouse?: string;
  ownsLandPlot?: string;
  delayedDays?: number | string;
  [key: string]: any;
}
