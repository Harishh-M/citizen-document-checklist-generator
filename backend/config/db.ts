import fs from 'fs';
import path from 'path';

export interface ServiceRecord {
  id: number;
  service_name: string;
  department: string;
  description: string;
  eligibility: string;
  procedure_steps: string;
  source: string;
  last_updated: string;
  created_at?: string;
}

export interface DocumentRecord {
  id: number;
  service_id: number;
  document_name: string;
  description: string;
  mandatory: boolean | number;
  condition_rule: string | null;
  source: string;
  created_at?: string;
}

export interface CitizenRequestRecord {
  id: number;
  service_id: number;
  citizen_data: any;
  created_at: string;
}

export interface AIResultRecord {
  id: number;
  request_id: number;
  generated_result: any;
  model_name: string;
  created_at: string;
}

export interface RegistryFileFormat {
  services: ServiceRecord[];
  documents: DocumentRecord[];
  citizen_requests: CitizenRequestRecord[];
  ai_results: AIResultRecord[];
}

/**
 * Modular Database Store Interface
 * 
 * Defines the contract for data persistence across government services, official document
 * requirements, citizen audit trails, and AI result records.
 * 
 * Implementations:
 * - JsonFileStore: Local JSON file-backed store (zero external database dependency).
 * - MySQLStore (future): Can be plugged in to connect to an external MySQL / Cloud SQL server.
 */
export interface IDatabaseStore {
  getStatus(): {
    connected: boolean;
    mode: string;
    storageType: string;
    dataFile: string;
    totalServices: number;
    totalDocuments: number;
    totalRequests: number;
  };
  getServices(): Promise<ServiceRecord[]>;
  getServiceById(id: number): Promise<ServiceRecord | null>;
  addService(service: Omit<ServiceRecord, 'id' | 'created_at'>): Promise<ServiceRecord>;
  updateService(id: number, data: Partial<ServiceRecord>): Promise<ServiceRecord | null>;
  getDocumentsByServiceId(serviceId: number): Promise<DocumentRecord[]>;
  addDocument(doc: Omit<DocumentRecord, 'id' | 'created_at'>): Promise<DocumentRecord>;
  updateDocument(id: number, data: Partial<DocumentRecord>): Promise<DocumentRecord | null>;
  deleteDocument(id: number): Promise<boolean>;
  saveCitizenRequest(serviceId: number, citizenData: any): Promise<number>;
  saveAIResult(requestId: number, result: any, modelName: string): Promise<number>;
  getChecklistByRequestId(requestId: number): Promise<{ request: CitizenRequestRecord; result: AIResultRecord; service: ServiceRecord } | null>;
  resetToDefaultSeed(): void;
}

/**
 * Default Verified Government Registry Seeds (Fallback)
 */
const DEFAULT_SERVICES: ServiceRecord[] = [
  {
    id: 1,
    service_name: 'Income Certificate',
    department: 'Department of Revenue & Disaster Management',
    description: 'Official document certifying the annual household income of an individual or family for welfare schemes, school/college fee concessions, and government quotas.',
    eligibility: 'Resident of the state with verifiable legal income sources. Household income limits vary by scheme.',
    procedure_steps: '1. Submit application with ID and proof of residence. 2. Field verification by Village Administrative Officer (VAO) or Revenue Inspector. 3. Final issuance by Tahsildar.',
    source: 'National e-Governance Division (NeGD) Citizen Services Portal',
    last_updated: '2026-08-15'
  },
  {
    id: 2,
    service_name: 'Residence / Domicile Certificate',
    department: 'Department of Revenue & District Administration',
    description: 'Official legal proof validating an applicant continuous residency within a specific state, district, or taluk for education or employment reservations.',
    eligibility: 'Applicant must have continuously resided in the state/district for a minimum continuous duration (typically 5 to 7 years) or have ancestral domicile.',
    procedure_steps: '1. Fill citizen details. 2. Attach address and residence continuous proofs. 3. Revenue inspection and Tahsildar digital signature.',
    source: 'State Citizen Portal Public Manual (Rev-Dept 2026)',
    last_updated: '2026-08-20'
  },
  {
    id: 3,
    service_name: 'Scholarship Application (Post-Matric / Merit-cum-Means)',
    department: 'Department of Higher Education & Social Welfare',
    description: 'Financial assistance and tuition fee reimbursement for meritorious students from economically weaker sections and reserved social communities.',
    eligibility: 'Enrolled in recognized higher education institution (UG/PG/Diploma). Parent annual income within scheme caps (e.g., under INR 2,50,000 for full waiver).',
    procedure_steps: '1. Online student registration. 2. Verification of marksheets and institutional bonafide by college nodal officer. 3. Direct Benefit Transfer (DBT) sanction.',
    source: 'National Scholarship Portal (NSP) Operational Guidelines',
    last_updated: '2026-07-10'
  },
  {
    id: 4,
    service_name: 'Community / Caste Certificate',
    department: 'Department of Social Welfare & Backward Classes',
    description: 'Government statutory certificate confirming the social community, caste, or tribe of the citizen to claim constitutional affirmative action benefits.',
    eligibility: 'Must belong to Scheduled Caste (SC), Scheduled Tribe (ST), Other Backward Class (OBC), or Most Backward Class (MBC) as recognized in the state gazette.',
    procedure_steps: '1. Application submission with parental blood-relative records. 2. Spot enquiry and community register check. 3. Issuance by competent Sub-Divisional Magistrate or Tahsildar.',
    source: 'Ministry of Social Justice & Empowerment e-Services Manual',
    last_updated: '2026-08-01'
  },
  {
    id: 5,
    service_name: 'Birth Certificate Registration',
    department: 'Department of Public Health & Municipal Administration',
    description: 'Primary legal record of a person birth, including date, location, and parentage details vital for all civil rights and identity credentials.',
    eligibility: 'Any birth occurring within the jurisdiction of the municipal corporation, municipality, or village panchayat.',
    procedure_steps: '1. Hospital Form-1 birth intimation within 21 days of delivery. 2. Medical officer verification. 3. Issuance by Registrar of Births and Deaths.',
    source: 'Civil Registration System (CRS) - Office of the Registrar General',
    last_updated: '2026-09-01'
  },
  {
    id: 6,
    service_name: 'Old Age / Social Security Pension',
    department: 'Department of Social Security & Disability Welfare',
    description: 'Monthly financial pension grant provided to senior citizens living in economic distress or without sufficient family financial support.',
    eligibility: 'Citizen aged 60 years or older. Family income below official Below Poverty Line (BPL) threshold. No adult earning member providing sustained support.',
    procedure_steps: '1. Application submission with proof of age and BPL card. 2. Verification of physical living condition and bank account. 3. Monthly DBT pension authorization.',
    source: 'National Social Assistance Programme (NSAP) Directive',
    last_updated: '2026-06-25'
  },
  {
    id: 7,
    service_name: 'Affordable Housing Scheme (PMAY / State Housing)',
    department: 'Housing & Urban Development Department',
    description: 'Central and state government subsidized housing initiative providing pucca homes or construction assistance to homeless and kutcha-house dwellers.',
    eligibility: 'Citizen/family must not own a pucca house anywhere in India. Income category: Economically Weaker Section (EWS) or Low Income Group (LIG).',
    procedure_steps: '1. Household registration and geo-tagged home survey. 2. Land title verification. 3. Direct milestone fund transfer into beneficiary bank account.',
    source: 'Housing For All Urban & Rural Mission Guidelines 2026',
    last_updated: '2026-05-30'
  },
  {
    id: 8,
    service_name: 'Student Education Loan Interest Subsidy (CSIS)',
    department: 'Ministry of Education - Higher Education Financing Authority',
    description: 'Scheme offering full interest subsidy during the moratorium period (course period plus one year) on educational loans taken for professional/technical courses.',
    eligibility: 'Admitted to recognized technical/professional degree. Total parental/family income from all sources not exceeding INR 4,50,000 per annum.',
    procedure_steps: '1. Avail education loan from scheduled commercial bank. 2. Submit income certificate and bonafide to lending branch. 3. Ministry subsidy credit.',
    source: 'Central Sector Interest Subsidy Scheme (CSIS) Portal',
    last_updated: '2026-07-18'
  }
];

const DEFAULT_DOCUMENTS: DocumentRecord[] = [
  // Service 1: Income Certificate
  { id: 101, service_id: 1, document_name: 'Aadhaar Card', description: 'Government-issued 12-digit biometrically linked unique identity card of the applicant.', mandatory: true, condition_rule: null, source: 'National e-Governance Division (NeGD)' },
  { id: 102, service_id: 1, document_name: 'Address Proof (Ration Card or Voter ID)', description: 'Document verifying that the applicant resides in the territorial jurisdiction of the issuing authority.', mandatory: true, condition_rule: null, source: 'National e-Governance Division (NeGD)' },
  { id: 103, service_id: 1, document_name: 'Income Proof (Salary Slip / Form 16 / IT Return)', description: 'Documentary proof of earnings such as recent 3-month payslip for salaried persons or Income Tax Return assessment.', mandatory: true, condition_rule: null, source: 'Department of Revenue & Disaster Management Manual' },
  { id: 104, service_id: 1, document_name: 'Bank Passbook Statement (6 Months)', description: 'Bank account statement showing transaction flow and average monthly credits.', mandatory: false, condition_rule: 'Required when applicant is self-employed, daily wage earner, agricultural worker, or when annual income exceeds threshold limits without formal salary slips.', source: 'Revenue Department Circular 2026-Rev/B' },
  { id: 105, service_id: 1, document_name: 'Affidavit of Non-Salaried Income', description: 'Self-declaration notarized on non-judicial stamp paper stating annual household income from informal sources.', mandatory: false, condition_rule: 'Required only if the applicant does not have salary slips or IT returns to substantiate unorganized sector income.', source: 'State Revenue Manual Section 4(c)' },
  { id: 106, service_id: 1, document_name: 'Caste Certificate', description: 'Community certificate proving social category.', mandatory: false, condition_rule: 'Required only when seeking fee waiver or concessional processing under SC/ST/OBC category provisions.', source: 'Revenue Department Guidelines' },

  // Service 2: Residence / Domicile Certificate
  { id: 201, service_id: 2, document_name: 'Aadhaar Card', description: 'Primary biometric identity credential verifying name, date of birth, and biometric record.', mandatory: true, condition_rule: null, source: 'State Citizen Portal Public Manual' },
  { id: 202, service_id: 2, document_name: 'Utility Bill (Electricity Bill or Water Connection Bill)', description: 'Recent utility bill (under 3 months old) showing current residential address and metered service connection.', mandatory: true, condition_rule: null, source: 'State Citizen Portal Public Manual' },
  { id: 203, service_id: 2, document_name: 'Proof of Continuous Residence (5+ Years)', description: 'Historical documentary evidence like Land Tax receipt, voter list extract, or school record proving continuous stay.', mandatory: true, condition_rule: null, source: 'State Citizen Portal Public Manual' },
  { id: 204, service_id: 2, document_name: 'Registered Rental / Lease Agreement', description: 'Notarized or sub-registrar stamped tenancy contract between tenant and landlord.', mandatory: false, condition_rule: 'Required if the applicant is residing in rented accommodation rather than owned/ancestral property.', source: 'State Citizen Portal Public Manual (Rev-Dept 2026)' },
  { id: 205, service_id: 2, document_name: 'School Transfer Certificate (TC) or Leaving Certificate', description: 'Institutional educational certificate stating applicant school location and dates of study.', mandatory: false, condition_rule: 'Required if applicant claims native domicile by virtue of completed basic primary and secondary education in the state.', source: 'State Citizen Portal Public Manual (Rev-Dept 2026)' },

  // Service 3: Scholarship Application
  { id: 301, service_id: 3, document_name: 'Aadhaar Card', description: 'Mandatory identity card linked to citizen mobile number and seeded with NPCI for Direct Benefit Transfer.', mandatory: true, condition_rule: null, source: 'National Scholarship Portal (NSP) Operational Guidelines' },
  { id: 302, service_id: 3, document_name: 'Previous Academic Year Marksheet / Degree Certificate', description: 'Official transcript or grade sheet verifying minimum qualifying academic performance criteria.', mandatory: true, condition_rule: null, source: 'National Scholarship Portal (NSP) Operational Guidelines' },
  { id: 303, service_id: 3, document_name: 'Bonafide Student Certificate / College ID Card', description: 'Formal certification issued by the principal or head of institution verifying regular full-time enrollment.', mandatory: true, condition_rule: null, source: 'National Scholarship Portal (NSP) Operational Guidelines' },
  { id: 304, service_id: 3, document_name: 'Bank Account Passbook (Aadhaar-Seeded)', description: 'Front page of bank passbook displaying applicant name, active account number, and IFSC code.', mandatory: true, condition_rule: null, source: 'National Scholarship Portal (NSP) Operational Guidelines' },
  { id: 305, service_id: 3, document_name: 'Parental Income Certificate', description: 'Valid official income certificate issued by the competent revenue authority (Tahsildar) for the current financial year.', mandatory: true, condition_rule: null, source: 'National Scholarship Portal (NSP) Operational Guidelines' },
  { id: 306, service_id: 3, document_name: 'Community / Caste Certificate', description: 'Official state certificate recognizing SC, ST, OBC, or Minority community status.', mandatory: false, condition_rule: 'Required when applying under category-specific scholarships such as Post-Matric SC/ST or OBC Welfare schemes.', source: 'National Scholarship Portal (NSP) Operational Guidelines' },
  { id: 307, service_id: 3, document_name: 'Disability Certificate (UDID Card)', description: 'Unique Disability Identity Card issued by the competent government district medical board.', mandatory: false, condition_rule: 'Required only if the student is applying under the Persons with Benchmark Disabilities (PwD) scholarship quota.', source: 'Ministry of Social Justice & Empowerment Guidelines' },

  // Service 4: Community / Caste Certificate
  { id: 401, service_id: 4, document_name: 'Aadhaar Card', description: 'Personal identity verification document of the applicant.', mandatory: true, condition_rule: null, source: 'Ministry of Social Justice & Empowerment e-Services Manual' },
  { id: 402, service_id: 4, document_name: 'School Transfer Certificate (TC) showing Caste/Tribe', description: 'School or college TC explicitly recording the community and sub-caste recorded at the time of admission.', mandatory: true, condition_rule: null, source: 'Ministry of Social Justice & Empowerment e-Services Manual' },
  { id: 403, service_id: 4, document_name: 'Father or Blood Relative Community Certificate', description: 'Community certificate of father, paternal grandfather, or real sibling issued by revenue authority.', mandatory: true, condition_rule: null, source: 'Ministry of Social Justice & Empowerment e-Services Manual' },
  { id: 404, service_id: 4, document_name: 'Ration Card / Family Smart Card', description: 'State civil supplies smart card establishing genealogical family composition and parental relationship.', mandatory: true, condition_rule: null, source: 'Ministry of Social Justice & Empowerment e-Services Manual' },
  { id: 405, service_id: 4, document_name: 'Local Ward / Village Administrative Verification Report', description: 'Field inquiry report confirming long-standing local community status.', mandatory: false, condition_rule: 'Required if blood relative certificates are unavailable, lost, or originally issued in a different district/state.', source: 'Ministry of Social Justice & Empowerment e-Services Manual' },

  // Service 5: Birth Certificate Registration
  { id: 501, service_id: 5, document_name: 'Hospital Discharge Summary / Form-1 Birth Report', description: 'Medical birth intimation slip issued by the attending hospital or nursing home at time of delivery.', mandatory: true, condition_rule: null, source: 'Civil Registration System (CRS) Manual' },
  { id: 502, service_id: 5, document_name: 'Aadhaar Cards of Both Parents', description: 'Identity proofs of the mother and father to record biological parentage and identity numbers.', mandatory: true, condition_rule: null, source: 'Civil Registration System (CRS) Manual' },
  { id: 503, service_id: 5, document_name: 'Parents Marriage Certificate / Joint Residence Proof', description: 'Document validating parents marital record and legal matrimonial residence address.', mandatory: false, condition_rule: 'Required if registration is delayed beyond 21 days or parents address differs from hospital admission ledger.', source: 'Civil Registration System (CRS) Manual' },
  { id: 504, service_id: 5, document_name: 'Magistrate Order or Notarized Affidavit for Delayed Birth', description: 'Court or Executive Magistrate sanction order authorizing registration of delayed birth.', mandatory: false, condition_rule: 'Mandatory if birth event is being registered after 30 days up to 1 year or more following date of birth.', source: 'Civil Registration Act Section 13(3)' },

  // Service 6: Old Age / Social Security Pension
  { id: 601, service_id: 6, document_name: 'Aadhaar Card', description: 'Proof of identity and demographic record.', mandatory: true, condition_rule: null, source: 'National Social Assistance Programme (NSAP) Directive' },
  { id: 602, service_id: 6, document_name: 'Age Proof (Birth Certificate / Voter ID / Medical Age Certificate)', description: 'Document strictly confirming that applicant has attained 60 years of age or older.', mandatory: true, condition_rule: null, source: 'National Social Assistance Programme (NSAP) Directive' },
  { id: 603, service_id: 6, document_name: 'Bank Passbook (Single Account in Scheduled Bank)', description: 'First page of single bank account passbook for automatic monthly DBT pension disbursement.', mandatory: true, condition_rule: null, source: 'National Social Assistance Programme (NSAP) Directive' },
  { id: 604, service_id: 6, document_name: 'BPL Ration Card or Indigent Income Certificate', description: 'Valid Below Poverty Line (BPL) ration card or revenue income certificate establishing destitute status.', mandatory: true, condition_rule: null, source: 'National Social Assistance Programme (NSAP) Directive' },
  { id: 605, service_id: 6, document_name: 'Death Certificate of Husband', description: 'Official municipal death certificate of deceased spouse.', mandatory: false, condition_rule: 'Mandatory strictly for applicants applying under the Widow / Destitute Women Pension category.', source: 'Social Security Pension Rules 2026' },
  { id: 606, service_id: 6, document_name: 'Affidavit of Destitution / No Earning Adult Son', description: 'Notarized self-affidavit declaring lack of regular financial support from adult offspring.', mandatory: false, condition_rule: 'Required where state social security pension rules mandate verification of destitution without adult earning sons.', source: 'NSAP State Implementation Code' },

  // Service 7: Affordable Housing Scheme
  { id: 701, service_id: 7, document_name: 'Aadhaar Card of Head and All Family Members', description: 'Biometric identity cards of all co-inhabiting family members for national de-duplication.', mandatory: true, condition_rule: null, source: 'Housing For All Urban & Rural Mission Guidelines 2026' },
  { id: 702, service_id: 7, document_name: 'Income Proof / EWS Certificate', description: 'Income certificate certifying household income is within Economically Weaker Section (EWS < INR 3,00,000) bracket.', mandatory: true, condition_rule: null, source: 'Housing For All Urban & Rural Mission Guidelines 2026' },
  { id: 703, service_id: 7, document_name: 'Bank Account Details with IFSC', description: 'Passbook copy with IFSC code linked to PFMS for direct installment subsidies.', mandatory: true, condition_rule: null, source: 'Housing For All Urban & Rural Mission Guidelines 2026' },
  { id: 704, service_id: 7, document_name: 'Photograph of Existing Kutcha / Unsettled Living Structure', description: 'Photograph depicting applicant living in temporary, kutcha, thatched, or damaged dwelling.', mandatory: true, condition_rule: null, source: 'Housing For All Urban & Rural Mission Guidelines 2026' },
  { id: 705, service_id: 7, document_name: 'Land Patta / Ownership Title Deed', description: 'Registered legal deed or government land patta showing undisputed ownership of proposed construction plot.', mandatory: false, condition_rule: 'Mandatory when applying under the Beneficiary-Led Construction (BLC) component to construct a pucca house on owned land.', source: 'Housing For All Urban & Rural Mission Guidelines 2026' },
  { id: 706, service_id: 7, document_name: 'Non-Encumbrance Certificate (EC)', description: 'Certificate from Sub-Registrar confirming property has no legal mortgages or court liens.', mandatory: false, condition_rule: 'Required when financial institutional home loans or municipal building plan approvals are integrated into the subsidy.', source: 'Housing For All Urban & Rural Mission Guidelines 2026' },

  // Service 8: Student Education Loan Interest Subsidy
  { id: 801, service_id: 8, document_name: 'Aadhaar Card of Student & Co-borrower Parent', description: 'Biometric proof of identity for student borrower and parent guarantor.', mandatory: true, condition_rule: null, source: 'Central Sector Interest Subsidy Scheme (CSIS) Portal' },
  { id: 802, service_id: 8, document_name: 'Entrance Examination Scorecard / Merit Admission Letter', description: 'Scorecard of national/state exam (JEE, NEET, GATE, CAT, CET) or merit allotment letter from central counseling.', mandatory: true, condition_rule: null, source: 'Central Sector Interest Subsidy Scheme (CSIS) Portal' },
  { id: 803, service_id: 8, document_name: 'Official Fee Structure on College Letterhead', description: 'Certified fee statement signed by registrar/dean detailing tuition, exam, lab, and university charges.', mandatory: true, condition_rule: null, source: 'Central Sector Interest Subsidy Scheme (CSIS) Portal' },
  { id: 804, service_id: 8, document_name: 'Annual Family Income Certificate (< INR 4.5 Lakhs)', description: 'Valid current-year income certificate issued by Tahsildar or designated competent revenue officer.', mandatory: true, condition_rule: null, source: 'Central Sector Interest Subsidy Scheme (CSIS) Portal' },
  { id: 805, service_id: 8, document_name: 'Existing Education Loan Sanction Letter & Account Statement', description: 'Formal loan sanction letter issued by a scheduled commercial bank outlining principal and disbursed tranche.', mandatory: false, condition_rule: 'Required if claiming interest subsidy against an already sanctioned or active educational loan account.', source: 'Central Sector Interest Subsidy Scheme (CSIS) Portal' }
];

/**
 * JsonFileStore
 * 
 * Production-ready, zero-database store that manages official government services and
 * document requirements directly in a structured local JSON data file.
 * Requires NO external database (no DB_HOST, DB_USER, etc.).
 */
export class JsonFileStore implements IDatabaseStore {
  private filePath: string;
  private services: ServiceRecord[] = [];
  private documents: DocumentRecord[] = [];
  private citizenRequests: CitizenRequestRecord[] = [];
  private aiResults: AIResultRecord[] = [];

  private nextServiceId = 1;
  private nextDocumentId = 1;
  private nextRequestId = 1;
  private nextResultId = 1;

  constructor(customPath?: string) {
    this.filePath = customPath || path.join(process.cwd(), 'backend', 'data', 'government-registry.json');
    this.loadData();
  }

  private loadData(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed: RegistryFileFormat = JSON.parse(raw);
        this.services = parsed.services || [];
        this.documents = parsed.documents || [];
        this.citizenRequests = parsed.citizen_requests || [];
        this.aiResults = parsed.ai_results || [];
        console.log(`[Store] Loaded ${this.services.length} services and ${this.documents.length} document rules from ${path.basename(this.filePath)}`);
      } else {
        // Initialize with verified seeds
        this.services = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
        this.documents = JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
        this.citizenRequests = [];
        this.aiResults = [];
        this.persist();
        console.log(`[Store] Initialized fresh government registry file at ${this.filePath}`);
      }
    } catch (err: any) {
      console.error('[Store] Error reading government registry JSON file. Using default verified seeds in-memory:', err.message);
      this.services = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
      this.documents = JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
      this.citizenRequests = [];
      this.aiResults = [];
    }

    // Initialize ID counters
    this.nextServiceId = Math.max(...this.services.map(s => s.id), 0) + 1;
    this.nextDocumentId = Math.max(...this.documents.map(d => d.id), 0) + 1;
    this.nextRequestId = Math.max(...this.citizenRequests.map(r => r.id), 0) + 1;
    this.nextResultId = Math.max(...this.aiResults.map(a => a.id), 0) + 1;
  }

  private persist(): void {
    try {
      const payload: RegistryFileFormat = {
        services: this.services,
        documents: this.documents,
        citizen_requests: this.citizenRequests,
        ai_results: this.aiResults
      };
      fs.writeFileSync(this.filePath, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (err: any) {
      console.error('[Store] Failed to write changes to registry file:', err.message);
    }
  }

  public getStatus() {
    return {
      connected: true,
      mode: 'Local Government Data Store (JSON)',
      storageType: 'Structured File Registry',
      dataFile: path.basename(this.filePath),
      totalServices: this.services.length,
      totalDocuments: this.documents.length,
      totalRequests: this.citizenRequests.length
    };
  }

  // --- Services ---
  public async getServices(): Promise<ServiceRecord[]> {
    return [...this.services];
  }

  public async getServiceById(id: number): Promise<ServiceRecord | null> {
    return this.services.find(s => s.id === id) || null;
  }

  public async addService(service: Omit<ServiceRecord, 'id' | 'created_at'>): Promise<ServiceRecord> {
    const newRecord: ServiceRecord = {
      ...service,
      id: this.nextServiceId++,
      created_at: new Date().toISOString()
    };
    this.services.push(newRecord);
    this.persist();
    return newRecord;
  }

  public async updateService(id: number, data: Partial<ServiceRecord>): Promise<ServiceRecord | null> {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.services[index] = { ...this.services[index], ...data };
    this.persist();
    return this.services[index];
  }

  // --- Documents ---
  public async getDocumentsByServiceId(serviceId: number): Promise<DocumentRecord[]> {
    return this.documents.filter(d => d.service_id === serviceId);
  }

  public async addDocument(doc: Omit<DocumentRecord, 'id' | 'created_at'>): Promise<DocumentRecord> {
    const newDoc: DocumentRecord = {
      ...doc,
      id: this.nextDocumentId++,
      created_at: new Date().toISOString()
    };
    this.documents.push(newDoc);
    this.persist();
    return newDoc;
  }

  public async updateDocument(id: number, data: Partial<DocumentRecord>): Promise<DocumentRecord | null> {
    const index = this.documents.findIndex(d => d.id === id);
    if (index === -1) return null;
    this.documents[index] = { ...this.documents[index], ...data };
    this.persist();
    return this.documents[index];
  }

  public async deleteDocument(id: number): Promise<boolean> {
    const initialLength = this.documents.length;
    this.documents = this.documents.filter(d => d.id !== id);
    const deleted = this.documents.length < initialLength;
    if (deleted) {
      this.persist();
    }
    return deleted;
  }

  // --- Requests & Results ---
  public async saveCitizenRequest(serviceId: number, citizenData: any): Promise<number> {
    const id = this.nextRequestId++;
    this.citizenRequests.push({
      id,
      service_id: serviceId,
      citizen_data: citizenData,
      created_at: new Date().toISOString()
    });
    this.persist();
    return id;
  }

  public async saveAIResult(requestId: number, result: any, modelName: string): Promise<number> {
    const id = this.nextResultId++;
    this.aiResults.push({
      id,
      request_id: requestId,
      generated_result: result,
      model_name: modelName,
      created_at: new Date().toISOString()
    });
    this.persist();
    return id;
  }

  public async getChecklistByRequestId(requestId: number): Promise<{ request: CitizenRequestRecord; result: AIResultRecord; service: ServiceRecord } | null> {
    const req = this.citizenRequests.find(r => r.id === requestId);
    if (!req) return null;
    const res = this.aiResults.find(r => r.request_id === requestId);
    if (!res) return null;
    const service = this.services.find(s => s.id === req.service_id);
    if (!service) return null;

    return { request: req, result: res, service };
  }

  public resetToDefaultSeed(): void {
    this.services = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
    this.documents = JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
    this.citizenRequests = [];
    this.aiResults = [];
    this.nextServiceId = Math.max(...this.services.map(s => s.id), 0) + 1;
    this.nextDocumentId = Math.max(...this.documents.map(d => d.id), 0) + 1;
    this.nextRequestId = 1;
    this.nextResultId = 1;
    this.persist();
    console.log('[Store] Reset government registry to default verified seed records.');
  }
}

/**
 * Modular Database Store Factory / Singleton Instance
 * 
 * Default is JsonFileStore. To plug in MySQL in the future:
 * 1. Install mysql2
 * 2. Create MySQLStore class implementing IDatabaseStore
 * 3. Return MySQLStore instance here when process.env.DATABASE_TYPE === 'mysql'
 */
export const db: IDatabaseStore = new JsonFileStore();
