import { ServiceRecord, DocumentRecord } from './db.js';

export const ALL_SERVICES: ServiceRecord[] = [
  {
    "id": 1,
    "service_name": "Income Certificate",
    "department": "Department of Revenue & Disaster Management (State)",
    "description": "Official document certifying the annual household income of an individual or family for welfare schemes, school/college fee concessions, and government quotas.",
    "eligibility": "Resident of the state with verifiable legal income sources. Household income limits vary by scheme.",
    "procedure_steps": "1. Submit application with ID and proof of residence. 2. Field verification by Village Administrative Officer (VAO) or Revenue Inspector. 3. Final issuance by Tahsildar.",
    "source": "National e-Governance Division (NeGD) Citizen Services Portal",
    "last_updated": "2026-08-15",
    "jurisdiction": "State"
  },
  {
    "id": 2,
    "service_name": "Residence / Domicile Certificate",
    "department": "Department of Revenue & District Administration (State)",
    "description": "Official legal proof validating an applicant continuous residency within a specific state, district, or taluk for education or employment reservations.",
    "eligibility": "Applicant must have continuously resided in the state/district for a minimum continuous duration (typically 5 to 7 years) or have ancestral domicile.",
    "procedure_steps": "1. Fill citizen details. 2. Attach address and residence continuous proofs. 3. Revenue inspection and Tahsildar digital signature.",
    "source": "State Citizen Portal Public Manual (Rev-Dept 2026)",
    "last_updated": "2026-08-20",
    "jurisdiction": "State"
  },
  {
    "id": 3,
    "service_name": "Scholarship Application (Post-Matric / Merit-cum-Means)",
    "department": "Department of Higher Education & Social Welfare (State/Central)",
    "description": "Financial assistance and tuition fee reimbursement for meritorious students from economically weaker sections and reserved social communities.",
    "eligibility": "Enrolled in recognized higher education institution (UG/PG/Diploma). Parent annual income within scheme caps (e.g., under INR 2,50,000 for full waiver).",
    "procedure_steps": "1. Online student registration. 2. Verification of marksheets and institutional bonafide by college nodal officer. 3. Direct Benefit Transfer (DBT) sanction.",
    "source": "National Scholarship Portal (NSP) Operational Guidelines (scholarships.gov.in)",
    "last_updated": "2026-07-10",
    "jurisdiction": "State/Central"
  },
  {
    "id": 4,
    "service_name": "Community / Caste Certificate",
    "department": "Department of Social Welfare & Backward Classes (State)",
    "description": "Government statutory certificate confirming the social community, caste, or tribe of the citizen to claim constitutional affirmative action benefits.",
    "eligibility": "Must belong to Scheduled Caste (SC), Scheduled Tribe (ST), Other Backward Class (OBC), or Most Backward Class (MBC) as recognized in the state gazette.",
    "procedure_steps": "1. Application submission with parental blood-relative records. 2. Spot enquiry and community register check. 3. Issuance by competent Sub-Divisional Magistrate or Tahsildar.",
    "source": "Ministry of Social Justice & Empowerment e-Services Manual",
    "last_updated": "2026-08-01",
    "jurisdiction": "State"
  },
  {
    "id": 5,
    "service_name": "Birth Certificate Registration",
    "department": "Department of Public Health & Municipal Administration (State)",
    "description": "Primary legal record of a person birth, including date, location, and parentage details vital for all civil rights and identity credentials.",
    "eligibility": "Any birth occurring within the jurisdiction of the municipal corporation, municipality, or village panchayat.",
    "procedure_steps": "1. Hospital Form-1 birth intimation within 21 days of delivery. 2. Medical officer verification. 3. Issuance by Registrar of Births and Deaths.",
    "source": "Civil Registration System (CRS) - Office of the Registrar General of India (crsorgi.gov.in)",
    "last_updated": "2026-09-01",
    "jurisdiction": "State"
  },
  {
    "id": 6,
    "service_name": "Old Age / Social Security Pension",
    "department": "Department of Social Security & Disability Welfare (State)",
    "description": "Monthly financial pension grant provided to senior citizens living in economic distress or without sufficient family financial support.",
    "eligibility": "Citizen aged 60 years or older. Family income below official Below Poverty Line (BPL) threshold. No adult earning member providing sustained support.",
    "procedure_steps": "1. Application submission with proof of age and BPL card. 2. Verification of physical living condition and bank account. 3. Monthly DBT pension authorization.",
    "source": "National Social Assistance Programme (NSAP) Directive (nsap.nic.in)",
    "last_updated": "2026-06-25",
    "jurisdiction": "State"
  },
  {
    "id": 7,
    "service_name": "Pradhan Mantri Awas Yojana (PMAY / State Housing)",
    "department": "Ministry of Housing and Urban Affairs / State Housing Board (Central)",
    "description": "Central and state government subsidized housing initiative providing pucca homes or construction assistance to homeless and kutcha-house dwellers.",
    "eligibility": "Citizen/family must not own a pucca house anywhere in India. Income category: Economically Weaker Section (EWS) or Low Income Group (LIG).",
    "procedure_steps": "1. Household registration and geo-tagged home survey. 2. Land title verification. 3. Direct milestone fund transfer into beneficiary bank account.",
    "source": "Housing For All Urban & Rural Mission Guidelines (pmaymis.gov.in)",
    "last_updated": "2026-05-30",
    "jurisdiction": "Central"
  },
  {
    "id": 8,
    "service_name": "Student Education Loan Interest Subsidy (CSIS)",
    "department": "Ministry of Education - Higher Education Financing Authority (Central)",
    "description": "Scheme offering full interest subsidy during the moratorium period (course period plus one year) on educational loans taken for professional/technical courses.",
    "eligibility": "Admitted to recognized technical/professional degree. Total parental/family income from all sources not exceeding INR 4,50,000 per annum.",
    "procedure_steps": "1. Avail education loan from scheduled commercial bank. 2. Submit income certificate and bonafide to lending branch. 3. Ministry subsidy credit.",
    "source": "Central Sector Interest Subsidy Scheme (CSIS) Portal",
    "last_updated": "2026-07-18",
    "jurisdiction": "Central"
  },
  {
    "id": 9,
    "service_name": "Nativity Certificate",
    "department": "Department of Revenue & Disaster Management (State)",
    "description": "Official statutory certificate verifying that an applicant is a native of the state by birth or ancestral lineage, required for state admissions, recruitment quotas, and welfare reservations.",
    "eligibility": "Citizen born in the state or residing permanently with parents possessing certified native domicile.",
    "procedure_steps": "1. Apply online via State e-District / e-Seva portal. 2. VAO field enquiry and Revenue Inspector verification. 3. Approval and digital signature by Tahsildar.",
    "source": "National Portal of India - Citizen Services (services.india.gov.in)",
    "last_updated": "2026-08-10",
    "jurisdiction": "State"
  },
  {
    "id": 10,
    "service_name": "Death Certificate",
    "department": "Department of Public Health & Municipal Administration / CRS (State)",
    "description": "Statutory certificate recording the official date, place, and cause of death of an individual under the Registration of Births and Deaths Act 1969, vital for estate distribution, bank settlement, and insurance claims.",
    "eligibility": "Any death occurring within the administrative jurisdiction of the municipal corporation, municipality, or village panchayat.",
    "procedure_steps": "1. Hospital Form-2 death intimation or family report within 21 days. 2. Cross-verification with cremation/burial authority. 3. Digital issuance by Registrar of Births and Deaths.",
    "source": "Civil Registration System (CRS) - Office of the Registrar General of India (crsorgi.gov.in)",
    "last_updated": "2026-08-25",
    "jurisdiction": "State"
  },
  {
    "id": 11,
    "service_name": "Legal Heir Certificate (Varisu Certificate)",
    "department": "Department of Revenue & District Administration (State)",
    "description": "Official government certificate establishing the direct legal successors of a deceased person for transferring movable/immovable assets, pensions, gratuity, and bank balances.",
    "eligibility": "Surviving direct legal heirs (Spouse, Children, Parents) of the deceased individual.",
    "procedure_steps": "1. Submit online application on e-District portal. 2. Field enquiry by Village Administrative Officer (VAO) and Revenue Inspector. 3. Issuance by Tahsildar / Taluk Executive Magistrate.",
    "source": "State Revenue Administration & e-District Guidelines (edistrict.gov.in)",
    "last_updated": "2026-08-18",
    "jurisdiction": "State"
  },
  {
    "id": 12,
    "service_name": "Marriage Certificate",
    "department": "Commercial Taxes & Registration Department / Inspector General of Registration (State)",
    "description": "Official legal registration of marriage solemnized under the Hindu Marriage Act, Special Marriage Act, or Christian/Muslim personal marriage regulations, essential for passport updates, visas, joint banking, and legal status.",
    "eligibility": "Groom aged 21 or older, Bride aged 18 or older, neither party having a living spouse unless legally divorced.",
    "procedure_steps": "1. Online memorandum registration on State Inspectorate of Registration portal. 2. In-person appearance of couple with three adult witnesses before Sub-Registrar. 3. Issuance of legal marriage certificate.",
    "source": "Department of Registration and Stamps Citizen Charter (igreg.gov.in)",
    "last_updated": "2026-07-28",
    "jurisdiction": "State"
  },
  {
    "id": 13,
    "service_name": "Aadhaar Card / Aadhaar Update",
    "department": "Unique Identification Authority of India (UIDAI), MeitY (Central)",
    "description": "Enrolment or demographic/biometric update of India 12-digit biometric unique identity number, functioning as primary digital proof of identity across India.",
    "eligibility": "Any individual who has resided in India for 182 days or more in the preceding 12 months.",
    "procedure_steps": "1. Book appointment at Aadhaar Seva Kendra or apply demographic updates on myAadhaar portal. 2. Document upload and biometric verification. 3. Processing and physical PVC / e-Aadhaar generation.",
    "source": "Unique Identification Authority of India (UIDAI) (uidai.gov.in)",
    "last_updated": "2026-09-05",
    "jurisdiction": "Central"
  },
  {
    "id": 14,
    "service_name": "PAN Card",
    "department": "Income Tax Department, Ministry of Finance (Central)",
    "description": "Issuance of a 10-digit alphanumeric Permanent Account Number (PAN) used for direct taxation, banking operations, high-value asset purchases, and financial identity verification.",
    "eligibility": "Any Indian citizen, NRI, partnership firm, LLP, company, or minor entering financial transactions exceeding statutory limits.",
    "procedure_steps": "1. Submit Form 49A on Protean NSDL or UTIITSL portal. 2. Paperless e-KYC using Aadhaar OTP or document submission. 3. Dispatch of digital e-PAN and physical laminated PAN card.",
    "source": "Income Tax Department / Protean eGov Technologies (incometax.gov.in / onlineservices.nsdl.com)",
    "last_updated": "2026-08-30",
    "jurisdiction": "Central"
  },
  {
    "id": 15,
    "service_name": "Passport",
    "department": "Consular, Passport & Visa (CPV) Division, Ministry of External Affairs (Central)",
    "description": "Official international travel document issued by the Government of India certifying the holder identity and nationality for travel outside India.",
    "eligibility": "Citizen of India with clear police record and no adverse court prohibitions.",
    "procedure_steps": "1. Fill online application on Passport Seva portal. 2. Book appointment and attend biometric/document verification at PSK or POPSK. 3. Police verification report and Speed Post dispatch.",
    "source": "Ministry of External Affairs - Passport Seva (passportindia.gov.in)",
    "last_updated": "2026-08-22",
    "jurisdiction": "Central"
  },
  {
    "id": 16,
    "service_name": "Voter ID",
    "department": "Election Commission of India (ECI) (Central)",
    "description": "Official photographic identity card issued to all eligible Indian citizens empowering them to exercise their democratic voting franchise in parliamentary and assembly elections.",
    "eligibility": "Indian citizen who has attained 18 years of age on the qualifying date of the calendar year and is an ordinary resident of the electoral constituency.",
    "procedure_steps": "1. Submit Form 6 (fresh enrollment) or Form 8 (correction/shifting) on ECI Voters Portal. 2. Physical verification by Booth Level Officer (BLO). 3. Delivery of Electors Photo Identity Card (EPIC) by India Post.",
    "source": "Election Commission of India - Voter Services Portal (voters.eci.gov.in)",
    "last_updated": "2026-09-02",
    "jurisdiction": "Central"
  },
  {
    "id": 17,
    "service_name": "Driving Licence",
    "department": "Motor Vehicles Department / Regional Transport Office (State)",
    "description": "Statutory licence permitting a qualified citizen to drive light motor vehicles, motorcycles, or commercial vehicles on public roads under the Motor Vehicles Act 1988.",
    "eligibility": "Minimum age 18 for LMV, 16 for gearless 50cc, 20 for commercial transport vehicles, with requisite physical/medical fitness.",
    "procedure_steps": "1. Online application and computer test for Learner Licence (LL) on Sarathi Parivahan. 2. Complete 30 days learning period. 3. Practical driving test at RTO automated test track and permanent DL issuance.",
    "source": "Ministry of Road Transport and Highways - Parivahan Sewa (parivahan.gov.in)",
    "last_updated": "2026-08-12",
    "jurisdiction": "State"
  },
  {
    "id": 18,
    "service_name": "Vehicle Registration",
    "department": "Transport Department / Regional Transport Office (RTO) (State)",
    "description": "Statutory registration of a motor vehicle under the Motor Vehicles Act, assigning an official registration number plate (HSRP) and Registration Certificate (RC).",
    "eligibility": "Citizen or legal entity owning a new or pre-owned motor vehicle registered in the respective state/RTO territorial jurisdiction.",
    "procedure_steps": "1. Form 20 application generated via authorized vehicle dealer on Vahan portal. 2. Payment of road tax and registration fees. 3. Physical inspection by Motor Vehicle Inspector and RC issuance.",
    "source": "Ministry of Road Transport and Highways - Vahan Citizen Services (vahan.parivahan.gov.in)",
    "last_updated": "2026-07-25",
    "jurisdiction": "State"
  },
  {
    "id": 19,
    "service_name": "Ration Card",
    "department": "Department of Food, Civil Supplies & Consumer Protection (State)",
    "description": "Official statutory card issued to households to purchase subsidized essential commodities (rice, wheat, sugar, kerosene) under the National Food Security Act (NFSA).",
    "eligibility": "Citizen households permanently residing in the state classified under Antyodaya (AAY), Priority Household (PHH), or Non-Priority (NPHH) groups.",
    "procedure_steps": "1. Submit online application on State Civil Supplies portal. 2. Taluk Supply Officer (TSO) field inspection. 3. Digital printing and doorstep delivery of Smart Ration Card.",
    "source": "National Food Security Portal (NFSA) - Department of Food and Public Distribution (nfsa.gov.in)",
    "last_updated": "2026-08-16",
    "jurisdiction": "State"
  },
  {
    "id": 20,
    "service_name": "PM-KISAN",
    "department": "Department of Agriculture & Farmers Welfare, Ministry of Agriculture (Central)",
    "description": "Central sector income support scheme providing INR 6,000 per year in three equal installments of INR 2,000 directly into the bank accounts of all landholding farmer families.",
    "eligibility": "Small and marginal farmer families with cultivable landholding registered in revenue records, excluding institutional landholders and income tax payees.",
    "procedure_steps": "1. Self-registration on pmkisan.gov.in or via Common Service Centre (CSC). 2. Land record verification by District Agriculture Officer. 3. Aadhaar-based DBT payment transfer via NPCI.",
    "source": "Ministry of Agriculture and Farmers Welfare - PM-KISAN (pmkisan.gov.in)",
    "last_updated": "2026-08-05",
    "jurisdiction": "Central"
  },
  {
    "id": 21,
    "service_name": "Ayushman Bharat / PM-JAY",
    "department": "National Health Authority (NHA), Ministry of Health and Family Welfare (Central)",
    "description": "Government health assurance scheme offering cashless health cover of up to INR 5,00,000 per family per year for secondary and tertiary hospitalization across empaneled public and private hospitals.",
    "eligibility": "Low-income and vulnerable families identified based on SECC 2011 deprivation criteria or state NFSA beneficiary lists.",
    "procedure_steps": "1. Verify eligibility on beneficiary.nha.gov.in or at empaneled hospital helpdesk. 2. Complete biometric Aadhaar e-KYC. 3. Immediate issuance of Ayushman Card (Golden Card).",
    "source": "National Health Authority - Ayushman Bharat PM-JAY (pmjay.gov.in / beneficiary.nha.gov.in)",
    "last_updated": "2026-08-28",
    "jurisdiction": "Central"
  },
  {
    "id": 22,
    "service_name": "Disability Pension",
    "department": "Department of Social Welfare & Empowerment of Persons with Disabilities (State)",
    "description": "Monthly social welfare pension paid to persons with severe disabilities living below the poverty line to support subsistence, healthcare, and assistive living.",
    "eligibility": "Citizen with minimum 40% permanent disability certified by government medical board, belonging to a BPL household.",
    "procedure_steps": "1. Application submission with UDID card and bank passbook. 2. Revenue officer verification and medical board assessment. 3. Sanction and monthly DBT pension disbursement.",
    "source": "National Social Assistance Programme (NSAP) - Ministry of Rural Development (nsap.nic.in)",
    "last_updated": "2026-07-20",
    "jurisdiction": "State"
  },
  {
    "id": 23,
    "service_name": "Unemployment Assistance",
    "department": "Directorate of Employment and Training, Department of Labour (State)",
    "description": "Monthly financial allowance provided to educated unemployed youth registered with the state employment exchange to assist during job search and skill development.",
    "eligibility": "Educated youth (10th/12th/Degree passed) registered with the state employment exchange for at least 3 to 5 continuous years, family income within state threshold.",
    "procedure_steps": "1. Apply online on State Employment Exchange portal. 2. Verification of live registration card and non-employment status. 3. Quarterly allowance credit to bank account.",
    "source": "Directorate of Employment and Training Citizen Charter (State Labour Dept)",
    "last_updated": "2026-08-08",
    "jurisdiction": "State"
  },
  {
    "id": 24,
    "service_name": "Labour Card / Worker Registration",
    "department": "Ministry of Labour & Employment / State Unorganised Workers Welfare Board (State)",
    "description": "Registration of unorganized workers creating a comprehensive social security registry to extend welfare benefits, accident insurance, healthcare access, and emergency financial relief.",
    "eligibility": "Any worker in the unorganized sector aged between 16 and 59 years who is not an income tax payee and not an EPFO/ESIC member.",
    "procedure_steps": "1. Enrolment on e-Shram portal (eshram.gov.in) or via local CSC. 2. Biometric/OTP authentication with Aadhaar. 3. Instant generation of 12-digit UAN Labour Card.",
    "source": "Ministry of Labour and Employment - e-Shram Portal (eshram.gov.in)",
    "last_updated": "2026-08-14",
    "jurisdiction": "State"
  },
  {
    "id": 25,
    "service_name": "Building/Construction Worker Welfare Scheme",
    "department": "State Building & Other Construction Workers (BOCW) Welfare Board (State)",
    "description": "Statutory welfare benefits including accident compensation, pension, maternity assistance, toolkits, and children educational scholarships for registered construction labourers.",
    "eligibility": "Construction worker aged between 18 and 60 years who has completed at least 90 days of construction work during the preceding 12 months.",
    "procedure_steps": "1. Submit Form-V with 90-day engagement certificate to District Labour Office. 2. Spot enquiry by Labour Inspector. 3. Issuance of BOCW Identity Passbook and welfare enrollment.",
    "source": "Building and Other Construction Workers Welfare Board (bocw.gov.in)",
    "last_updated": "2026-08-02",
    "jurisdiction": "State"
  },
  {
    "id": 26,
    "service_name": "Small Business / MSME Registration",
    "department": "Ministry of Micro, Small and Medium Enterprises (MSME) (Central)",
    "description": "Statutory paperless registration (Udyam Registration) providing micro, small, and medium businesses with priority sector bank lending, collateral-free credit, tender waivers, and government subsidies.",
    "eligibility": "Any enterprise engaged in manufacturing or service operations meeting statutory investment and turnover thresholds (Micro: Investment < INR 1 Cr & Turnover < INR 5 Cr).",
    "procedure_steps": "1. Online self-declaration on official Udyam portal (udyamregistration.gov.in). 2. Automatic verification with PAN and GSTIN databases. 3. Issuance of permanent digital Udyam Certificate with QR code.",
    "source": "Ministry of MSME - Udyam Registration Portal (udyamregistration.gov.in)",
    "last_updated": "2026-08-29",
    "jurisdiction": "Central"
  },
  {
    "id": 27,
    "service_name": "Domicile Certificate (Permanent Resident Certificate)",
    "department": "Department of Revenue & District Administration (State)",
    "description": "Official statutory certification proving permanent resident status in the state by birth, ancestral heritage, or continuous 5-10 year domicile for state quota educational admissions and government recruitment.",
    "eligibility": "Citizen having permanent domicile in the state or continuous verifiable residence for the statutory period (typically 5 to 7 years) with ancestral ties.",
    "procedure_steps": "1. Online application via State e-District / e-Seva portal. 2. Field inquiry by Village Administrative Officer (VAO) and Revenue Inspector. 3. Final digital approval by Tahsildar.",
    "source": "National Portal of India - Domicile / PRC Services (services.india.gov.in)",
    "last_updated": "2026-08-20",
    "jurisdiction": "State"
  },
  {
    "id": 28,
    "service_name": "Character Certificate",
    "department": "State Police Department / Executive Magistrate (State)",
    "description": "Statutory verification certificate issued after background police record and criminal antecedent check, essential for government employment, university admissions, and international visa clearances.",
    "eligibility": "Any resident citizen with clean criminal record and verifiable identity credentials within the police jurisdiction.",
    "procedure_steps": "1. Apply online on State Police Citizen Portal. 2. Station House Officer (SHO) physical field inquiry and criminal database verification. 3. Digitally signed clearance issued by Superintendent of Police or Tahsildar.",
    "source": "State Police Citizen Services Portal (citizen.police.gov.in)",
    "last_updated": "2026-08-15",
    "jurisdiction": "State"
  },
  {
    "id": 29,
    "service_name": "Unemployment Certificate",
    "department": "Department of Revenue & District Administration (State)",
    "description": "Official certificate issued by the competent revenue authority certifying that the applicant is presently unemployed, required to claim government welfare allowances, exam fee waivers, and subsidized training loans.",
    "eligibility": "Educated youth or citizen who is currently not gainfully employed in government, public sector, or formal private employment.",
    "procedure_steps": "1. Submit application with education credentials and non-employment affidavit. 2. VAO field inquiry and employment exchange cross-verification. 3. Certificate approval by Tahsildar.",
    "source": "State Revenue Department & Citizen Services Directorate",
    "last_updated": "2026-07-28",
    "jurisdiction": "State"
  },
  {
    "id": 30,
    "service_name": "Non-Creamy Layer Certificate (OBC-NCL)",
    "department": "Department of Backward Classes Welfare & Revenue Administration (State)",
    "description": "Official statutory certificate certifying that an OBC applicant family annual income from non-agricultural sources does not exceed the creamy layer cap (INR 8 Lakhs per annum), granting eligibility for 27% Central/State OBC reservations.",
    "eligibility": "Applicant belonging to a recognized OBC community whose parental gross annual income is below INR 8,00,000 for the last 3 consecutive financial years, excluding agricultural income.",
    "procedure_steps": "1. Submit Form along with 3-year parental income proof and community certificate. 2. Verification of parental employment category (Class I/II service status). 3. Issuance of NCL certificate by Tahsildar.",
    "source": "Ministry of Personnel, Public Grievances & Pensions (DoPT) / NCBC Guidelines (ncbc.nic.in)",
    "last_updated": "2026-08-30",
    "jurisdiction": "State"
  },
  {
    "id": 31,
    "service_name": "EWS Certificate (Economically Weaker Section)",
    "department": "Department of Revenue & Social Welfare (State)",
    "description": "Income and Asset Certificate granting 10% reservation in civil posts and educational admissions for Economically Weaker Sections among General Category citizens under the 103rd Constitutional Amendment.",
    "eligibility": "Citizen belonging to General Category (not covered under SC, ST, or OBC), gross family annual income below INR 8,00,000, and family not owning 5+ acres agricultural land or 1000+ sq ft residential flat.",
    "procedure_steps": "1. Application submission with family asset and income details. 2. Revenue field inspection of residential premises and agricultural land. 3. Certificate issuance by Tahsildar or Sub-Divisional Magistrate.",
    "source": "Ministry of Social Justice and Empowerment - EWS Directive (socialjustice.gov.in)",
    "last_updated": "2026-08-10",
    "jurisdiction": "State"
  },
  {
    "id": 32,
    "service_name": "OBC Certificate",
    "department": "Department of Backward Classes & Most Backward Classes Welfare (State)",
    "description": "Statutory certificate confirming that an applicant belongs to an Other Backward Class (OBC) recognized in the State or Central OBC gazette list for affirmative action.",
    "eligibility": "Must belong to an eligible backward caste/community officially gazetted in the State/Central list.",
    "procedure_steps": "1. Application submission with parental community documents. 2. Spot enquiry and caste ledger verification by VAO. 3. Issuance by Tahsildar.",
    "source": "National Commission for Backward Classes (NCBC) (ncbc.nic.in)",
    "last_updated": "2026-08-01",
    "jurisdiction": "State"
  },
  {
    "id": 33,
    "service_name": "SC Certificate (Scheduled Caste)",
    "department": "Adi Dravidar and Tribal Welfare Department / Revenue Administration (State)",
    "description": "Constitutional certificate certifying membership in a Scheduled Caste community under the Constitution (Scheduled Castes) Order, essential for educational and employment reservations.",
    "eligibility": "Must belong to a recognized Scheduled Caste community as gazetted for the respective state.",
    "procedure_steps": "1. Online submission with blood-relative SC certificate. 2. Field enquiry by Revenue Inspector and local village inspection. 3. Certificate approval by Tahsildar / Zonal Deputy Tahsildar.",
    "source": "Ministry of Social Justice & Empowerment (socialjustice.gov.in)",
    "last_updated": "2026-08-05",
    "jurisdiction": "State"
  },
  {
    "id": 34,
    "service_name": "ST Certificate (Scheduled Tribe)",
    "department": "Tribal Welfare Department / Revenue Divisional Administration (State)",
    "description": "Statutory tribal identity certificate issued after stringent genealogical and anthropological verification, mandated by the Supreme Court of India.",
    "eligibility": "Citizen belonging to a notified Scheduled Tribe community residing in notified tribal or scheduled areas.",
    "procedure_steps": "1. Application submission with ancestral revenue and school records. 2. Anthropological enquiry and District Vigilance Committee scrutiny. 3. Final issuance strictly by Revenue Divisional Officer (RDO) / Sub-Collector.",
    "source": "Ministry of Tribal Affairs - Guidelines for ST Verification (tribal.nic.in)",
    "last_updated": "2026-08-12",
    "jurisdiction": "State"
  },
  {
    "id": 35,
    "service_name": "Disability Certificate / UDID Card",
    "department": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice (Central)",
    "description": "National biometric-enabled Unique Disability ID (UDID) Card creating a single verifiable digital document for persons with disabilities across all states and central welfare ministries.",
    "eligibility": "Any citizen having 40% or more permanent benchmark disability certified by a government district hospital medical board.",
    "procedure_steps": "1. Register online on Swavlamban Portal (swavlambancard.gov.in). 2. Attend medical board clinical evaluation at assigned District Civil Hospital. 3. Assessment, percentage certification, and postal dispatch of plastic UDID Card.",
    "source": "Swavlamban Portal - DEPwD, Government of India (swavlambancard.gov.in)",
    "last_updated": "2026-08-25",
    "jurisdiction": "Central"
  },
  {
    "id": 36,
    "service_name": "Senior Citizen Certificate",
    "department": "Department of Social Welfare & District Collectorate (State)",
    "description": "Official identity card issued to elderly citizens aged 60 years or above, enabling priority queueing, transport fare concessions, healthcare packages, and state welfare allowances.",
    "eligibility": "Resident citizen who has completed 60 years of age on or before the date of application.",
    "procedure_steps": "1. Submit application with proof of age and residential proof. 2. Verification of civil age credentials. 3. Issuance of laminated Senior Citizen ID Card.",
    "source": "Ministry of Social Justice & State Senior Citizen Welfare Code",
    "last_updated": "2026-07-15",
    "jurisdiction": "State"
  },
  {
    "id": 37,
    "service_name": "Solvency Certificate",
    "department": "Department of Revenue & Land Administration (State)",
    "description": "Official certificate assessing and certifying the net financial worth and property solvency of an individual or firm, essential for executing government public works contracts, tenders, and court bails.",
    "eligibility": "Citizen or business owning undisputed, unencumbered immovable properties evaluated by authorized revenue/engineering valuers.",
    "procedure_steps": "1. Submit property registered deeds, EC, and valuation report. 2. Revenue Inspector site inspection and encumbrance check. 3. Solvency sanction by Tahsildar or District Collector.",
    "source": "State Revenue Standing Orders - Solvency Rules",
    "last_updated": "2026-08-04",
    "jurisdiction": "State"
  },
  {
    "id": 38,
    "service_name": "Encumbrance Certificate (Property EC)",
    "department": "Department of Registration & Stamps / Inspector General of Registration (State)",
    "description": "Official record issued in Form 15 or 16 documenting all registered legal transactions, sales, mortgages, leases, or court attachments on a specified parcel of property over a defined time period (up to 30+ years).",
    "eligibility": "Any property owner, prospective buyer, legal heir, or financial institution seeking property transaction history.",
    "procedure_steps": "1. Search property via Survey Number, Sub-division, and Sub-Registrar Office (SRO) on State Registration portal. 2. Online search fee payment. 3. Digitally signed Form 15 EC download.",
    "source": "Inspector General of Registration & Stamps Portal (igreg.gov.in)",
    "last_updated": "2026-08-22",
    "jurisdiction": "State"
  },
  {
    "id": 39,
    "service_name": "Land Patta / Patta Transfer",
    "department": "Department of Revenue & Survey and Settlement (State)",
    "description": "Official land title deed record issued by the Revenue Department recording the legal owner of an agricultural or residential land plot, including transfer/mutation of patta following purchase or inheritance.",
    "eligibility": "Legal purchaser, gift recipient, or lawful heir of a registered land parcel with valid registered title deeds.",
    "procedure_steps": "1. Submit Patta Transfer application on State Land Records / e-Services portal. 2. Field survey and subdivision verification by Village Surveyor. 3. Tahsildar approval and generation of updated digital Patta.",
    "source": "Directorate of Survey and Land Records (eservices.tn.gov.in / state land portal)",
    "last_updated": "2026-08-18",
    "jurisdiction": "State"
  },
  {
    "id": 40,
    "service_name": "Land Ownership / Chitta / Adangal",
    "department": "Department of Revenue & Land Administration (State)",
    "description": "Certified extract of Village Revenue Register specifying land classification (Wet/Dry), survey number, extent in hectares, revenue tax assessment (Chitta), and seasonal crop cultivation details (Adangal).",
    "eligibility": "Landholding farmer, property owner, or agricultural loan applicant.",
    "procedure_steps": "1. Select District, Taluk, Village, and Survey Number on State Land Records Portal. 2. Instant verification against digitised revenue database. 3. Instant download of digitally certified Chitta/Adangal extract.",
    "source": "AnyROR / Tamil Nilam / MeeBhoomi / Bhulekh State Land Portals",
    "last_updated": "2026-08-14",
    "jurisdiction": "State"
  },
  {
    "id": 41,
    "service_name": "Property Tax Payment & Assessment",
    "department": "Directorate of Municipal Administration / Urban Local Bodies (Local/State)",
    "description": "Annual municipal property tax assessment and statutory tax receipt payment for residential, commercial, or industrial buildings within Municipal Corporation, Municipality, or Town Panchayat limits.",
    "eligibility": "Owner or lawful occupant of any building or vacant land within the urban local body jurisdiction.",
    "procedure_steps": "1. Enter Property Assessment Number or Door Number on Urban Local Body portal. 2. Verify annual rental value, plinth area, and tax dues. 3. Pay online via payment gateway and generate receipt.",
    "source": "Directorate of Municipal Administration Citizen Services Portal",
    "last_updated": "2026-07-30",
    "jurisdiction": "State"
  },
  {
    "id": 42,
    "service_name": "Building Plan Approval",
    "department": "Town & Country Planning Directorate / Municipal Planning Authority (Local/State)",
    "description": "Statutory planning permission and building permit required prior to undertaking any residential, commercial, or industrial construction under the Town and Country Planning Act and Municipal Building By-Laws.",
    "eligibility": "Landowner or authorized builder with clear legal title, patta, and proposed architectural drawings compliant with Floor Space Index (FSI) regulations.",
    "procedure_steps": "1. Online application via Single Window Building Approval Portal. 2. Automated scrutiny of AutoCAD drawings by scrutiny engine. 3. Site inspection by Town Planning Officer and permit issuance.",
    "source": "Directorate of Town and Country Planning (DTCP) Single Window Portal",
    "last_updated": "2026-08-08",
    "jurisdiction": "State"
  },
  {
    "id": 43,
    "service_name": "Trade Licence",
    "department": "Municipal Corporation / Town Panchayat Health Department (Local Body)",
    "description": "Mandatory municipal operational licence certifying that a commercial business, retail shop, food outlet, or trade establishment complies with public health, safety, and fire norms within local body limits.",
    "eligibility": "Any business operator, retailer, hotelier, or trader establishing commercial activity within municipal boundaries.",
    "procedure_steps": "1. Apply online via Urban Local Body Trade Portal. 2. Sanitary Inspector / Health Officer site inspection. 3. Payment of trade fee and digital issuance of Trade Licence certificate.",
    "source": "Municipal Corporation Public Health & Trade Licence Regulations",
    "last_updated": "2026-07-22",
    "jurisdiction": "State"
  },
  {
    "id": 44,
    "service_name": "Shop & Establishment Registration",
    "department": "Department of Labour & Employment (State)",
    "description": "Statutory registration of shops, commercial establishments, software/IT companies, and restaurants regulating employment conditions, work hours, wage payments, and worker safety under the State Shops and Establishments Act.",
    "eligibility": "Any employer or enterprise opening a commercial premises or engaging employees in commercial operations.",
    "procedure_steps": "1. File Form-A online on State Labour Single Window Portal. 2. Upload employer identity, establishment photos, and employee roster. 3. Instant auto-generation of Form-C Registration Certificate.",
    "source": "State Labour Department Single Window Portal (labour.gov.in)",
    "last_updated": "2026-08-16",
    "jurisdiction": "State"
  },
  {
    "id": 45,
    "service_name": "Professional Tax Registration",
    "department": "Commercial Taxes Department / Municipal Corporation (State)",
    "description": "Statutory tax registration required for employers, self-employed professionals (doctors, lawyers, chartered accountants, architects), and traders paying half-yearly professional tax under State Municipal Acts.",
    "eligibility": "Any professional carrying on business, trade, or profession, and every employer employing salaried staff within the state.",
    "procedure_steps": "1. Online enrolment via Commercial Taxes / Municipal Corporation Portal. 2. Entry of turnover or employee salary tiers. 3. Generation of Professional Tax Assessment Certificate.",
    "source": "State Commercial Taxes & Municipal Professional Tax Directorate",
    "last_updated": "2026-07-10",
    "jurisdiction": "State"
  },
  {
    "id": 46,
    "service_name": "Factory Licence",
    "department": "Directorate of Industrial Safety and Health (DISH) / Chief Inspector of Factories (State)",
    "description": "Statutory manufacturing licence issued under the Factories Act 1948 ensuring occupational health, safety, machinery safeguards, and welfare facilities for manufacturing units employing 10+ workers with power (or 20+ without power).",
    "eligibility": "Manufacturing enterprise meeting statutory employee threshold and power consumption criteria.",
    "procedure_steps": "1. Submit plant layout drawings and Form-1 for site clearance on Single Window Portal. 2. Industrial safety inspection by Joint Director of Industrial Safety. 3. Grant of Form-4 Factory Licence.",
    "source": "Directorate of Industrial Safety and Health (DISH) (dish.gov.in)",
    "last_updated": "2026-07-29",
    "jurisdiction": "State"
  },
  {
    "id": 47,
    "service_name": "FSSAI Food Business Licence",
    "department": "Food Safety and Standards Authority of India (FSSAI), MoHFW (Central/State)",
    "description": "Mandatory 14-digit food licence/registration issued under the Food Safety and Standards Act 2006 regulating the manufacture, storage, distribution, sale, and import of food items to ensure food safety.",
    "eligibility": "Any Food Business Operator (FBO), petty hawker, restaurant, cloud kitchen, food manufacturer, or dairy processing unit.",
    "procedure_steps": "1. Online submission on Food Safety Compliance System (FoSCoS - foscos.fssai.gov.in). 2. Food Safety Officer (FSO) physical inspection of kitchen/plant. 3. Issuance of 14-digit FSSAI Licence with QR code.",
    "source": "Food Safety and Standards Authority of India - FoSCoS (foscos.fssai.gov.in)",
    "last_updated": "2026-09-03",
    "jurisdiction": "State/Central"
  },
  {
    "id": 48,
    "service_name": "GST Registration (GSTIN)",
    "department": "Goods and Services Tax Network (GSTN) / CBIC, Ministry of Finance (Central)",
    "description": "Mandatory 15-digit alphanumeric Goods and Services Tax Identification Number (GSTIN) issued to businesses engaged in intra-state or inter-state supply of goods and services exceeding turnover thresholds.",
    "eligibility": "Businesses with aggregate turnover exceeding INR 40 Lakhs (goods) or INR 20 Lakhs (services), e-commerce sellers, or inter-state taxable suppliers.",
    "procedure_steps": "1. Submit Part A & B of Form GST REG-01 on GST Common Portal (gst.gov.in). 2. Complete Aadhaar biometric/OTP authentication. 3. System approval and generation of Form GST REG-06 Registration Certificate.",
    "source": "Goods and Services Tax Network (GSTN) (gst.gov.in)",
    "last_updated": "2026-09-01",
    "jurisdiction": "Central"
  },
  {
    "id": 49,
    "service_name": "EPFO / PF Account Services",
    "department": "Employees Provident Fund Organisation (EPFO), Ministry of Labour (Central)",
    "description": "Central social security services managing retirement savings, employee pension scheme (EPS), provident fund withdrawals, advance advances, and e-Nomination for formal sector workers.",
    "eligibility": "Salaried employees working in establishments with 20 or more persons earning up to INR 15,000/month (or voluntary coverage).",
    "procedure_steps": "1. Log into EPFO Member Unified Portal with UAN and password. 2. Verify KYC (Aadhaar, PAN, Bank IFSC). 3. Submit online PF transfer, advance, or settlement claim with Aadhaar OTP authentication.",
    "source": "Employees Provident Fund Organisation - Member Unified Portal (epfindia.gov.in)",
    "last_updated": "2026-08-26",
    "jurisdiction": "Central"
  },
  {
    "id": 50,
    "service_name": "ESIC Registration / Services",
    "department": "Employees State Insurance Corporation (ESIC), Ministry of Labour (Central)",
    "description": "Statutory social security and health insurance scheme providing comprehensive medical care, sickness benefits, maternity benefits, and disablement benefits to insured employees and their dependants.",
    "eligibility": "Employees in factories and commercial establishments with 10 or more workers earning gross wages up to INR 21,000 per month (INR 25,000 for PwD).",
    "procedure_steps": "1. Employer registers unit online on Shram Suvidha / ESIC portal. 2. Enrol employees with Aadhaar and family details. 3. Generation of biometric e-Pehchan Card for cashless hospital treatment.",
    "source": "Employees State Insurance Corporation Portal (esic.gov.in)",
    "last_updated": "2026-08-19",
    "jurisdiction": "Central"
  },
  {
    "id": 51,
    "service_name": "National Scholarship Application (Central Sector / NSP)",
    "department": "Ministry of Electronics & Information Technology / Department of Higher Education (Central)",
    "description": "Central sector and centrally sponsored scholarships implemented on the National Scholarship Portal (NSP) providing full fee reimbursement and monthly stipends for college and university students.",
    "eligibility": "Meritorious students scoring above 80th percentile in Class 12 board examinations enrolled in recognized higher educational institutions, parental income below INR 4.5 Lakhs.",
    "procedure_steps": "1. Student One-Time Registration (OTR) via NSP portal. 2. Application submission and online document upload. 3. Dual-level institutional nodal officer and state officer e-verification, followed by DBT disbursement.",
    "source": "National Scholarship Portal (NSP) - Ministry of Electronics & IT (scholarships.gov.in)",
    "last_updated": "2026-08-11",
    "jurisdiction": "Central"
  }
];

export const ALL_DOCUMENTS: DocumentRecord[] = [
  {
    "id": 101,
    "service_id": 1,
    "document_name": "Aadhaar Card",
    "description": "Government-issued 12-digit biometrically linked unique identity card of the applicant.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National e-Governance Division (NeGD)"
  },
  {
    "id": 102,
    "service_id": 1,
    "document_name": "Address Proof (Ration Card or Voter ID)",
    "description": "Document verifying that the applicant resides in the territorial jurisdiction of the issuing authority.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National e-Governance Division (NeGD)"
  },
  {
    "id": 103,
    "service_id": 1,
    "document_name": "Income Proof (Salary Slip / Form 16 / IT Return)",
    "description": "Documentary proof of earnings such as recent 3-month payslip for salaried persons or Income Tax Return assessment.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Revenue & Disaster Management Manual"
  },
  {
    "id": 104,
    "service_id": 1,
    "document_name": "Bank Passbook Statement (6 Months)",
    "description": "Bank account statement showing transaction flow and average monthly credits.",
    "mandatory": false,
    "condition_rule": "Required when applicant is self-employed, daily wage earner, agricultural worker, or when annual income exceeds threshold limits without formal salary slips.",
    "source": "Revenue Department Circular 2026-Rev/B"
  },
  {
    "id": 105,
    "service_id": 1,
    "document_name": "Affidavit of Non-Salaried Income",
    "description": "Self-declaration notarized on non-judicial stamp paper stating annual household income from informal sources.",
    "mandatory": false,
    "condition_rule": "Required only if the applicant does not have salary slips or IT returns to substantiate unorganized sector income.",
    "source": "State Revenue Manual Section 4(c)"
  },
  {
    "id": 106,
    "service_id": 1,
    "document_name": "Caste Certificate",
    "description": "Community certificate proving social category.",
    "mandatory": false,
    "condition_rule": "Required only when seeking fee waiver or concessional processing under SC/ST/OBC category provisions.",
    "source": "Revenue Department Guidelines"
  },
  {
    "id": 201,
    "service_id": 2,
    "document_name": "Aadhaar Card",
    "description": "Primary biometric identity credential verifying name, date of birth, and biometric record.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Citizen Portal Public Manual"
  },
  {
    "id": 202,
    "service_id": 2,
    "document_name": "Utility Bill (Electricity Bill or Water Connection Bill)",
    "description": "Recent utility bill (under 3 months old) showing current residential address and metered service connection.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Citizen Portal Public Manual"
  },
  {
    "id": 203,
    "service_id": 2,
    "document_name": "Proof of Continuous Residence (5+ Years)",
    "description": "Historical documentary evidence like Land Tax receipt, voter list extract, or school record proving continuous stay.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Citizen Portal Public Manual"
  },
  {
    "id": 204,
    "service_id": 2,
    "document_name": "Registered Rental / Lease Agreement",
    "description": "Notarized or sub-registrar stamped tenancy contract between tenant and landlord.",
    "mandatory": false,
    "condition_rule": "Required if the applicant is residing in rented accommodation rather than owned/ancestral property.",
    "source": "State Citizen Portal Public Manual (Rev-Dept 2026)"
  },
  {
    "id": 205,
    "service_id": 2,
    "document_name": "School Transfer Certificate (TC) or Leaving Certificate",
    "description": "Institutional educational certificate stating applicant school location and dates of study.",
    "mandatory": false,
    "condition_rule": "Required if applicant claims native domicile by virtue of completed basic primary and secondary education in the state.",
    "source": "State Citizen Portal Public Manual (Rev-Dept 2026)"
  },
  {
    "id": 301,
    "service_id": 3,
    "document_name": "Aadhaar Card",
    "description": "Mandatory identity card linked to citizen mobile number and seeded with NPCI for Direct Benefit Transfer.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Scholarship Portal (NSP) Operational Guidelines"
  },
  {
    "id": 302,
    "service_id": 3,
    "document_name": "Previous Academic Year Marksheet / Degree Certificate",
    "description": "Official transcript or grade sheet verifying minimum qualifying academic performance criteria.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Scholarship Portal (NSP) Operational Guidelines"
  },
  {
    "id": 303,
    "service_id": 3,
    "document_name": "Bonafide Student Certificate / College ID Card",
    "description": "Formal certification issued by the principal or head of institution verifying regular full-time enrollment.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Scholarship Portal (NSP) Operational Guidelines"
  },
  {
    "id": 304,
    "service_id": 3,
    "document_name": "Bank Account Passbook (Aadhaar-Seeded)",
    "description": "Front page of bank passbook displaying applicant name, active account number, and IFSC code.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Scholarship Portal (NSP) Operational Guidelines"
  },
  {
    "id": 305,
    "service_id": 3,
    "document_name": "Parental Income Certificate",
    "description": "Valid official income certificate issued by the competent revenue authority (Tahsildar) for the current financial year.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Scholarship Portal (NSP) Operational Guidelines"
  },
  {
    "id": 306,
    "service_id": 3,
    "document_name": "Community / Caste Certificate",
    "description": "Official state certificate recognizing SC, ST, OBC, or Minority community status.",
    "mandatory": false,
    "condition_rule": "Required when applying under category-specific scholarships such as Post-Matric SC/ST or OBC Welfare schemes.",
    "source": "National Scholarship Portal (NSP) Operational Guidelines"
  },
  {
    "id": 307,
    "service_id": 3,
    "document_name": "Disability Certificate (UDID Card)",
    "description": "Unique Disability Identity Card issued by the competent government district medical board.",
    "mandatory": false,
    "condition_rule": "Required only if the student is applying under the Persons with Benchmark Disabilities (PwD) scholarship quota.",
    "source": "Ministry of Social Justice & Empowerment Guidelines"
  },
  {
    "id": 401,
    "service_id": 4,
    "document_name": "Aadhaar Card",
    "description": "Personal identity verification document of the applicant.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Social Justice & Empowerment e-Services Manual"
  },
  {
    "id": 402,
    "service_id": 4,
    "document_name": "School Transfer Certificate (TC) showing Caste/Tribe",
    "description": "School or college TC explicitly recording the community and sub-caste recorded at the time of admission.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Social Justice & Empowerment e-Services Manual"
  },
  {
    "id": 403,
    "service_id": 4,
    "document_name": "Father or Blood Relative Community Certificate",
    "description": "Community certificate of father, paternal grandfather, or real sibling issued by revenue authority.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Social Justice & Empowerment e-Services Manual"
  },
  {
    "id": 404,
    "service_id": 4,
    "document_name": "Ration Card / Family Smart Card",
    "description": "State civil supplies smart card establishing genealogical family composition and parental relationship.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Social Justice & Empowerment e-Services Manual"
  },
  {
    "id": 405,
    "service_id": 4,
    "document_name": "Local Ward / Village Administrative Verification Report",
    "description": "Field inquiry report confirming long-standing local community status.",
    "mandatory": false,
    "condition_rule": "Required if blood relative certificates are unavailable, lost, or originally issued in a different district/state.",
    "source": "Ministry of Social Justice & Empowerment e-Services Manual"
  },
  {
    "id": 501,
    "service_id": 5,
    "document_name": "Hospital Discharge Summary / Form-1 Birth Report",
    "description": "Medical birth intimation slip issued by the attending hospital or nursing home at time of delivery.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Civil Registration System (CRS) Manual"
  },
  {
    "id": 502,
    "service_id": 5,
    "document_name": "Aadhaar Cards of Both Parents",
    "description": "Identity proofs of the mother and father to record biological parentage and identity numbers.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Civil Registration System (CRS) Manual"
  },
  {
    "id": 503,
    "service_id": 5,
    "document_name": "Parents Marriage Certificate / Joint Residence Proof",
    "description": "Document validating parents marital record and legal matrimonial residence address.",
    "mandatory": false,
    "condition_rule": "Required if registration is delayed beyond 21 days or parents address differs from hospital admission ledger.",
    "source": "Civil Registration System (CRS) Manual"
  },
  {
    "id": 504,
    "service_id": 5,
    "document_name": "Magistrate Order or Notarized Affidavit for Delayed Birth",
    "description": "Court or Executive Magistrate sanction order authorizing registration of delayed birth.",
    "mandatory": false,
    "condition_rule": "Mandatory if birth event is being registered after 30 days up to 1 year or more following date of birth.",
    "source": "Civil Registration Act Section 13(3)"
  },
  {
    "id": 601,
    "service_id": 6,
    "document_name": "Aadhaar Card",
    "description": "Proof of identity and demographic record.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Social Assistance Programme (NSAP) Directive"
  },
  {
    "id": 602,
    "service_id": 6,
    "document_name": "Age Proof (Birth Certificate / Voter ID / Medical Age Certificate)",
    "description": "Document strictly confirming that applicant has attained 60 years of age or older.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Social Assistance Programme (NSAP) Directive"
  },
  {
    "id": 603,
    "service_id": 6,
    "document_name": "Bank Passbook (Single Account in Scheduled Bank)",
    "description": "First page of single bank account passbook for automatic monthly DBT pension disbursement.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Social Assistance Programme (NSAP) Directive"
  },
  {
    "id": 604,
    "service_id": 6,
    "document_name": "BPL Ration Card or Indigent Income Certificate",
    "description": "Valid Below Poverty Line (BPL) ration card or revenue income certificate establishing destitute status.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Social Assistance Programme (NSAP) Directive"
  },
  {
    "id": 605,
    "service_id": 6,
    "document_name": "Death Certificate of Husband",
    "description": "Official municipal death certificate of deceased spouse.",
    "mandatory": false,
    "condition_rule": "Mandatory strictly for applicants applying under the Widow / Destitute Women Pension category.",
    "source": "Social Security Pension Rules 2026"
  },
  {
    "id": 606,
    "service_id": 6,
    "document_name": "Affidavit of Destitution / No Earning Adult Son",
    "description": "Notarized self-affidavit declaring lack of regular financial support from adult offspring.",
    "mandatory": false,
    "condition_rule": "Required where state social security pension rules mandate verification of destitution without adult earning sons.",
    "source": "NSAP State Implementation Code"
  },
  {
    "id": 701,
    "service_id": 7,
    "document_name": "Aadhaar Card of Head and All Family Members",
    "description": "Biometric identity cards of all co-inhabiting family members for national de-duplication.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Housing For All Urban & Rural Mission Guidelines 2026"
  },
  {
    "id": 702,
    "service_id": 7,
    "document_name": "Income Proof / EWS Certificate",
    "description": "Income certificate certifying household income is within Economically Weaker Section (EWS < INR 3,00,000) bracket.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Housing For All Urban & Rural Mission Guidelines 2026"
  },
  {
    "id": 703,
    "service_id": 7,
    "document_name": "Bank Account Details with IFSC",
    "description": "Passbook copy with IFSC code linked to PFMS for direct installment subsidies.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Housing For All Urban & Rural Mission Guidelines 2026"
  },
  {
    "id": 704,
    "service_id": 7,
    "document_name": "Photograph of Existing Kutcha / Unsettled Living Structure",
    "description": "Photograph depicting applicant living in temporary, kutcha, thatched, or damaged dwelling.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Housing For All Urban & Rural Mission Guidelines 2026"
  },
  {
    "id": 705,
    "service_id": 7,
    "document_name": "Land Patta / Ownership Title Deed",
    "description": "Registered legal deed or government land patta showing undisputed ownership of proposed construction plot.",
    "mandatory": false,
    "condition_rule": "Mandatory when applying under the Beneficiary-Led Construction (BLC) component to construct a pucca house on owned land.",
    "source": "Housing For All Urban & Rural Mission Guidelines 2026"
  },
  {
    "id": 706,
    "service_id": 7,
    "document_name": "Non-Encumbrance Certificate (EC)",
    "description": "Certificate from Sub-Registrar confirming property has no legal mortgages or court liens.",
    "mandatory": false,
    "condition_rule": "Required when financial institutional home loans or municipal building plan approvals are integrated into the subsidy.",
    "source": "Housing For All Urban & Rural Mission Guidelines 2026"
  },
  {
    "id": 801,
    "service_id": 8,
    "document_name": "Aadhaar Card of Student & Co-borrower Parent",
    "description": "Biometric proof of identity for student borrower and parent guarantor.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Sector Interest Subsidy Scheme (CSIS) Portal"
  },
  {
    "id": 802,
    "service_id": 8,
    "document_name": "Entrance Examination Scorecard / Merit Admission Letter",
    "description": "Scorecard of national/state exam (JEE, NEET, GATE, CAT, CET) or merit allotment letter from central counseling.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Sector Interest Subsidy Scheme (CSIS) Portal"
  },
  {
    "id": 803,
    "service_id": 8,
    "document_name": "Official Fee Structure on College Letterhead",
    "description": "Certified fee statement signed by registrar/dean detailing tuition, exam, lab, and university charges.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Sector Interest Subsidy Scheme (CSIS) Portal"
  },
  {
    "id": 804,
    "service_id": 8,
    "document_name": "Annual Family Income Certificate (< INR 4.5 Lakhs)",
    "description": "Valid current-year income certificate issued by Tahsildar or designated competent revenue officer.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Sector Interest Subsidy Scheme (CSIS) Portal"
  },
  {
    "id": 805,
    "service_id": 8,
    "document_name": "Existing Education Loan Sanction Letter & Account Statement",
    "description": "Formal loan sanction letter issued by a scheduled commercial bank outlining principal and disbursed tranche.",
    "mandatory": false,
    "condition_rule": "Required if claiming interest subsidy against an already sanctioned or active educational loan account.",
    "source": "Central Sector Interest Subsidy Scheme (CSIS) Portal"
  },
  {
    "id": 901,
    "service_id": 9,
    "document_name": "Aadhaar Card of Applicant",
    "description": "12-digit biometrically linked unique identity card validating demographic details.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Portal of India - Citizen Services"
  },
  {
    "id": 902,
    "service_id": 9,
    "document_name": "Proof of Birth (Birth Certificate or SSLC/10th Marksheet)",
    "description": "Statutory certificate verifying place of birth within the state or school education in the state.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Registration of Births and Deaths Act / State Education Board"
  },
  {
    "id": 903,
    "service_id": 9,
    "document_name": "Proof of Continuous Residence (Ration Card / Voter ID / Land Tax)",
    "description": "Documentary evidence showing continuous long-term family habitation within the state.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Revenue Department Citizen Charter"
  },
  {
    "id": 904,
    "service_id": 9,
    "document_name": "Recent Passport Size Photograph",
    "description": "Clear frontal colour photograph taken within the last 6 months.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Citizen Portal Guidelines"
  },
  {
    "id": 905,
    "service_id": 9,
    "document_name": "Parents Nativity Certificate or School Transfer Certificate",
    "description": "Official nativity certificate or educational record of mother/father establishing ancestral state lineage.",
    "mandatory": false,
    "condition_rule": "Required if applicant was born outside the state or is claiming native status through parental lineage.",
    "source": "Revenue Department Manual Section 6"
  },
  {
    "id": 906,
    "service_id": 9,
    "document_name": "Registered Property Title Deed / Ancestral Land Document",
    "description": "Sub-registrar registered title deed or ancestral revenue patta evidencing permanent roots in the state.",
    "mandatory": false,
    "condition_rule": "Required when establishing permanent native domicile based on ancestral family landholding.",
    "source": "State Revenue Standing Orders"
  },
  {
    "id": 1001,
    "service_id": 10,
    "document_name": "Hospital Death Report / Form-2 Death Intimation",
    "description": "Medical death report (Form-4 / 4A) issued by the attending doctor or hospital at time of demise.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Civil Registration System (CRS) - Office of the Registrar General of India"
  },
  {
    "id": 1002,
    "service_id": 10,
    "document_name": "Aadhaar Card of the Deceased Person",
    "description": "Original or copy of Aadhaar card of the deceased for statutory identity cancellation and national record.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Civil Registration System (CRS) India"
  },
  {
    "id": 1003,
    "service_id": 10,
    "document_name": "Aadhaar Card / Photo ID of Informant / Next of Kin",
    "description": "Government photo identity card of the family member or person reporting the death.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Civil Registration System (CRS) Manual"
  },
  {
    "id": 1004,
    "service_id": 10,
    "document_name": "Crematorium / Burial Ground Acknowledgement Receipt",
    "description": "Official receipt issued by the municipal or village cremation/burial ground supervisor.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Municipal Corporation Public Health Regulations"
  },
  {
    "id": 1005,
    "service_id": 10,
    "document_name": "Police FIR & Post-Mortem Examination Report",
    "description": "Certified copy of police First Information Report and medical autopsy report.",
    "mandatory": false,
    "condition_rule": "Mandatory in cases of accidental demise, unnatural death, suicide, homicide, or medico-legal inquest.",
    "source": "Code of Criminal Procedure / CRS Guidelines"
  },
  {
    "id": 1006,
    "service_id": 10,
    "document_name": "Executive Magistrate Sanction Order for Delayed Death Registration",
    "description": "Sanction order issued by Sub-Divisional Magistrate or Revenue Divisional Officer (RDO).",
    "mandatory": false,
    "condition_rule": "Mandatory if death registration is delayed beyond 30 days up to 1 year or more under Section 13(3) of RBD Act.",
    "source": "Registration of Births and Deaths Act 1969"
  },
  {
    "id": 1101,
    "service_id": 11,
    "document_name": "Original Death Certificate of the Deceased Person",
    "description": "Statutory death certificate issued by the Municipal Corporation or Village Panchayat registrar.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Civil Registration System (CRS)"
  },
  {
    "id": 1102,
    "service_id": 11,
    "document_name": "Aadhaar Cards of All Surviving Legal Heirs",
    "description": "Biometric identity cards of all lawful direct successors (spouse, sons, daughters, mother).",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Revenue Department & e-District Guidelines"
  },
  {
    "id": 1103,
    "service_id": 11,
    "document_name": "Family Ration Card / Smart Card",
    "description": "Civil supplies ration card establishing family composition and genealogical relation to the deceased.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Food & Civil Supplies"
  },
  {
    "id": 1104,
    "service_id": 11,
    "document_name": "Notarized Legal Heir Self-Declaration Affidavit",
    "description": "Sworn affidavit signed before a Notary Public detailing complete list of surviving lawful heirs and declaring no other heirs exist.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Revenue Administration Manual"
  },
  {
    "id": 1105,
    "service_id": 11,
    "document_name": "Marriage Certificate or Service Register Record",
    "description": "Document validating marriage with deceased if spouse name is not updated on civil identity credentials.",
    "mandatory": false,
    "condition_rule": "Required if surviving spouse name is not recorded in the family ration card or identity proof of deceased.",
    "source": "Indian Succession Act / Revenue Standing Orders"
  },
  {
    "id": 1106,
    "service_id": 11,
    "document_name": "No-Objection Certificate (NOC) from Other Legal Heirs",
    "description": "Signed consent and NOC affidavits executed by co-heirs on non-judicial stamp paper.",
    "mandatory": false,
    "condition_rule": "Required when one heir is applying on behalf of others to claim family pension, gratuity, or compassionate appointment.",
    "source": "State Revenue Department Rules"
  },
  {
    "id": 1201,
    "service_id": 12,
    "document_name": "Proof of Age of Bride and Groom (10th Marksheet / Birth Certificate)",
    "description": "Document confirming Bride has attained 18 years and Groom has attained 21 years of age.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Inspector General of Registration Guidelines"
  },
  {
    "id": 1202,
    "service_id": 12,
    "document_name": "Aadhaar Cards of Both Husband and Wife",
    "description": "Personal identity cards with up-to-date demographic records.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Law and Justice"
  },
  {
    "id": 1203,
    "service_id": 12,
    "document_name": "Wedding Invitation Card / Religious Solemnization Receipt",
    "description": "Printed marriage invitation card or solemnization certificate issued by Temple, Church, or Qazi (Nikahnama).",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Registration Manual"
  },
  {
    "id": 1204,
    "service_id": 12,
    "document_name": "Joint Wedding Photographs & Passport Photos",
    "description": "Original joint wedding photograph showing couple solemnizing marriage rituals plus individual passport photos.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Registration Department"
  },
  {
    "id": 1205,
    "service_id": 12,
    "document_name": "Identity & Address Proofs of Three Adult Witnesses",
    "description": "Aadhaar Cards / Voter IDs / Passports of three adult witnesses who attended the marriage ceremony.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Registration Department"
  },
  {
    "id": 1206,
    "service_id": 12,
    "document_name": "Court Divorce Decree or Death Certificate of Previous Spouse",
    "description": "Certified copy of civil court dissolution order or municipal death certificate of deceased former partner.",
    "mandatory": false,
    "condition_rule": "Mandatory if either party was previously married and is registering a subsequent remarriage.",
    "source": "Hindu Marriage Act 1955 / Special Marriage Act 1954"
  },
  {
    "id": 1207,
    "service_id": 12,
    "document_name": "NOC / Single Status Certificate from Foreign Embassy",
    "description": "No-Objection Certificate and single marital status certification from the respective foreign embassy or consulate.",
    "mandatory": false,
    "condition_rule": "Mandatory if either bride or groom is an overseas citizen, NRI, or foreign national.",
    "source": "Special Marriage Act 1954"
  },
  {
    "id": 1301,
    "service_id": 13,
    "document_name": "Proof of Identity (PoI) Document",
    "description": "Officially valid photo identity document (Passport, PAN Card, Voter ID, Driving Licence, or Ration Card with photo).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Unique Identification Authority of India (UIDAI) (uidai.gov.in)"
  },
  {
    "id": 1302,
    "service_id": 13,
    "document_name": "Proof of Address (PoA) Document",
    "description": "Valid address proof (Electricity/Water Bill < 3 months, Bank Statement/Passbook, Passport, or Registered Rent Agreement).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Unique Identification Authority of India (UIDAI) (uidai.gov.in)"
  },
  {
    "id": 1303,
    "service_id": 13,
    "document_name": "Proof of Date of Birth (DoB)",
    "description": "Recognized birth proof (Birth Certificate issued by Registrar of Births, SSLC Marksheet, or Indian Passport).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Unique Identification Authority of India (UIDAI) (uidai.gov.in)"
  },
  {
    "id": 1304,
    "service_id": 13,
    "document_name": "Head of Family (HoF) Self-Declaration & HoF Aadhaar",
    "description": "Standard HoF declaration form signed by family head along with relationship document and HoF Aadhaar OTP verification.",
    "mandatory": false,
    "condition_rule": "Applicable when resident does not possess independent Proof of Address and updates address through Head of Family.",
    "source": "UIDAI HoF Enrolment Regulations"
  },
  {
    "id": 1305,
    "service_id": 13,
    "document_name": "Gazette Notification for Legal Name Change",
    "description": "Official Central or State Gazette publication notification evidencing legal change of name.",
    "mandatory": false,
    "condition_rule": "Mandatory if applicant is requesting a major name change or 2nd instance name update beyond minor spelling error.",
    "source": "UIDAI Update Policy Circular"
  },
  {
    "id": 1306,
    "service_id": 13,
    "document_name": "Medical Exception Certificate for Biometric Exemption",
    "description": "Medical certificate issued by government civil surgeon documenting missing fingers, amputation, or corneal blindness.",
    "mandatory": false,
    "condition_rule": "Required for citizens with physical disabilities or severe hand anomalies unable to provide standard fingerprint biometrics.",
    "source": "UIDAI Biometric Enrolment Manual"
  },
  {
    "id": 1401,
    "service_id": 14,
    "document_name": "Proof of Identity (Aadhaar / Voter ID / Passport)",
    "description": "Government photo identification document establishing applicant legal identity and name.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Income Tax Rules 1962 Form 49A Guidelines"
  },
  {
    "id": 1402,
    "service_id": 14,
    "document_name": "Proof of Address (Aadhaar / Utility Bill / Bank Statement)",
    "description": "Address verification document with applicant name (utility bills must not be older than 3 months).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Income Tax Rules 1962 Form 49A Guidelines"
  },
  {
    "id": 1403,
    "service_id": 14,
    "document_name": "Proof of Date of Birth (Birth Certificate / Matriculation / Aadhaar)",
    "description": "Recognized document certifying date of birth in DD/MM/YYYY format matching identity records.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Income Tax Rules 1962 Form 49A Guidelines"
  },
  {
    "id": 1404,
    "service_id": 14,
    "document_name": "Recent Passport Size Colour Photographs (2 Copies)",
    "description": "Two identical 3.5 cm x 2.5 cm colour photographs with white background and clear facial contrast.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Protean NSDL / UTIITSL PAN Portal"
  },
  {
    "id": 1405,
    "service_id": 14,
    "document_name": "Representative Assessee ID & Address Proof",
    "description": "Aadhaar Card and address proof of the parent or legal guardian acting on behalf of the minor.",
    "mandatory": false,
    "condition_rule": "Mandatory if applicant is a minor under 18 years or a person of unsound mind represented by guardian under Sec 160.",
    "source": "Section 160 Income Tax Act 1961"
  },
  {
    "id": 1406,
    "service_id": 14,
    "document_name": "Marriage Certificate or Gazette for Surname Change",
    "description": "Marriage certificate or official gazetted surname change publication.",
    "mandatory": false,
    "condition_rule": "Required for married women updating maiden surname or applicants correcting names following legal change.",
    "source": "NSDL PAN Correction Guidelines"
  },
  {
    "id": 1501,
    "service_id": 15,
    "document_name": "Proof of Date of Birth (Birth Certificate / SSLC Marksheet / Aadhaar)",
    "description": "Document verifying exact date of birth issued by municipal registrar, school board, or UIDAI.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of External Affairs - Passport Seva (passportindia.gov.in)"
  },
  {
    "id": 1502,
    "service_id": 15,
    "document_name": "Proof of Current Residential Address",
    "description": "Aadhaar Card, active bank passbook of scheduled bank with photo, electricity bill, or voter ID showing continuous stay at present address.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of External Affairs - Passport Seva (passportindia.gov.in)"
  },
  {
    "id": 1503,
    "service_id": 15,
    "document_name": "Non-ECR Eligible Educational Certificate (10th Standard / Degree)",
    "description": "10th standard matriculation pass certificate or higher educational degree qualifying applicant for Emigration Check Not Required.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Emigration Act 1983 / MEA Passport Rules"
  },
  {
    "id": 1504,
    "service_id": 15,
    "document_name": "Annexure E Self-Declaration & Tatkaal Supporting Proofs",
    "description": "Standard Annexure E affidavit affirming citizenship and absence of criminal proceedings, along with 3 authorized verification IDs.",
    "mandatory": false,
    "condition_rule": "Mandatory when applying under the Tatkaal urgent passport issuance scheme for fast-track processing.",
    "source": "MEA Tatkaal Guidelines"
  },
  {
    "id": 1505,
    "service_id": 15,
    "document_name": "Annexure C or D Parental Consent Declaration",
    "description": "Prescribed sworn affidavit signed by parents or single parent having legal custody of minor applicant.",
    "mandatory": false,
    "condition_rule": "Mandatory for minor child passport applications where both parents are not jointly signing Form-1.",
    "source": "MEA Minor Passport Guidelines"
  },
  {
    "id": 1506,
    "service_id": 15,
    "document_name": "Original Old / Expired Passport with Self-Attested Photocopies",
    "description": "Physical booklet of previous passport with self-attested copies of first two, last two, and ECR/Non-ECR pages.",
    "mandatory": false,
    "condition_rule": "Mandatory in case of passport renewal, re-issue upon 10-year validity expiry, booklet exhaustion, or change of address.",
    "source": "Passport Seva Application Manual"
  },
  {
    "id": 1601,
    "service_id": 16,
    "document_name": "Proof of Age (Aadhaar / Birth Certificate / PAN / 10th Marksheet)",
    "description": "Government certificate validating applicant has reached 18 years of age on qualifying cutoff date.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Election Commission of India - Voter Services Portal (voters.eci.gov.in)"
  },
  {
    "id": 1602,
    "service_id": 16,
    "document_name": "Proof of Ordinary Residence (Aadhaar / Utility Bill / Bank Passbook)",
    "description": "Document establishing ordinary residence within the territorial assembly constituency (electricity/water bill, bank book, rent agreement).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Election Commission of India (voters.eci.gov.in)"
  },
  {
    "id": 1603,
    "service_id": 16,
    "document_name": "Recent Passport Size Colour Photograph (4.5 x 3.5 cm)",
    "description": "Clear frontal photograph with plain background, neutral expression, and visible facial features.",
    "mandatory": true,
    "condition_rule": null,
    "source": "ECI Form 6 Guidelines"
  },
  {
    "id": 1604,
    "service_id": 16,
    "document_name": "Existing EPIC Voter Card Copy / Number",
    "description": "Copy of existing Voter ID card displaying 10-character alphanumeric EPIC number.",
    "mandatory": false,
    "condition_rule": "Mandatory when filing Form 8 for shifting of residence to a new constituency or correction of demographic particulars.",
    "source": "ECI Form 8 Instructions"
  },
  {
    "id": 1605,
    "service_id": 16,
    "document_name": "Landlord Rent Declaration / Hostel Warden Bonafide",
    "description": "Signed certificate from house owner or hostel superintendent certifying applicant ordinary student/tenant stay.",
    "mandatory": false,
    "condition_rule": "Required for students, migrant workers, or tenants residing without direct utility bills in their own name.",
    "source": "ECI Guidelines on Ordinary Residence"
  },
  {
    "id": 1701,
    "service_id": 17,
    "document_name": "Proof of Age (Birth Certificate / School TC / 10th Certificate / Aadhaar)",
    "description": "Statutory certificate confirming minimum age (18 for LMV, 16 for gearless 50cc, 20 for transport).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Motor Vehicles Rules 1989 Rule 4"
  },
  {
    "id": 1702,
    "service_id": 17,
    "document_name": "Proof of Address (Aadhaar Card / Voter ID / Passport / Utility Bill)",
    "description": "Valid address proof within the territorial jurisdiction of the Regional Transport Office.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Road Transport and Highways (parivahan.gov.in)"
  },
  {
    "id": 1703,
    "service_id": 17,
    "document_name": "Form 1 Self-Declaration of Physical Fitness",
    "description": "Completed Form 1 declaration regarding visual acuity, epilepsy, and physical capabilities.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Motor Vehicles Rules 1989 Form 1"
  },
  {
    "id": 1704,
    "service_id": 17,
    "document_name": "Valid Learner Licence (LL) Number & Certificate",
    "description": "Active Learner Licence issued by RTO indicating successful completion of computerized road regulations test.",
    "mandatory": false,
    "condition_rule": "Mandatory when applying for Permanent Driving Licence after completing the mandatory 30-day learning period.",
    "source": "Motor Vehicles Act Section 9"
  },
  {
    "id": 1705,
    "service_id": 17,
    "document_name": "Form 1A Medical Certificate signed by Registered Medical Practitioner",
    "description": "Certified medical fitness report with doctor signature, seal, and registration number.",
    "mandatory": false,
    "condition_rule": "Mandatory for applicants aged over 40 years or applying for transport, heavy goods, or passenger commercial driving licences.",
    "source": "CMVR 1989 Form 1A"
  },
  {
    "id": 1706,
    "service_id": 17,
    "document_name": "Form 5 / Form 5A Driving School Training Certificate",
    "description": "Certificate of driving competence issued by a government-accredited motor driving training school.",
    "mandatory": false,
    "condition_rule": "Mandatory for commercial transport vehicle licence endorsement or hazardous goods carrier permit.",
    "source": "Central Motor Vehicles Rules 1989"
  },
  {
    "id": 1801,
    "service_id": 18,
    "document_name": "Form 20 (Application for Registration of a Motor Vehicle)",
    "description": "Duly completed application form containing vehicle chassis, engine number, and owner details.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Road Transport and Highways - Vahan (vahan.parivahan.gov.in)"
  },
  {
    "id": 1802,
    "service_id": 18,
    "document_name": "Form 21 (Sale Certificate issued by Dealer)",
    "description": "Statutory sale certificate signed by authorized automobile dealer detailing purchase transaction.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Motor Vehicles Rules 1989"
  },
  {
    "id": 1803,
    "service_id": 18,
    "document_name": "Form 22 / Form 22A (Roadworthiness Certificate)",
    "description": "Manufacturer compliance certificate validating safety, emission standards, and roadworthiness.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Motor Vehicles Rules 1989"
  },
  {
    "id": 1804,
    "service_id": 18,
    "document_name": "Valid Motor Vehicle Insurance Certificate",
    "description": "Active insurance policy certificate providing third-party liability and comprehensive cover.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Motor Vehicles Act 1988 Section 146"
  },
  {
    "id": 1805,
    "service_id": 18,
    "document_name": "Proof of Address of Vehicle Owner (Aadhaar / Voter ID)",
    "description": "Government address verification document within registering authority jurisdiction.",
    "mandatory": true,
    "condition_rule": null,
    "source": "MoRTH Vahan Portal"
  },
  {
    "id": 1806,
    "service_id": 18,
    "document_name": "Form 34 Hypothecation Agreement & Loan Sanction Copy",
    "description": "Endorsement form signed jointly by vehicle owner and bank/financier with official stamp.",
    "mandatory": false,
    "condition_rule": "Mandatory if vehicle was acquired under bank auto loan or financier hire-purchase lease agreement.",
    "source": "CMVR 1989 Form 34"
  },
  {
    "id": 1807,
    "service_id": 18,
    "document_name": "Form 28 No Objection Certificate (NOC)",
    "description": "Official clearance certificate issued by previous registering authority confirming no tax arrears or theft reports.",
    "mandatory": false,
    "condition_rule": "Mandatory in case of inter-state vehicle re-registration or transfer of ownership from another state.",
    "source": "Motor Vehicles Act Section 48"
  },
  {
    "id": 1901,
    "service_id": 19,
    "document_name": "Aadhaar Cards of All Family Members",
    "description": "Biometric unique identity cards of all co-residing family members for national de-duplication.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Food Security Portal (NFSA) (nfsa.gov.in)"
  },
  {
    "id": 1902,
    "service_id": 19,
    "document_name": "Proof of Residential Address (Electricity Bill / Water Bill / Tax Slip)",
    "description": "Recent utility bill or property tax receipt establishing family domicile.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Food, Civil Supplies & Consumer Protection"
  },
  {
    "id": 1903,
    "service_id": 19,
    "document_name": "Family Income Certificate / BPL Certificate",
    "description": "Income certificate issued by Tahsildar validating annual family income bracket for card category (PHH/AAY/NPHH).",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Civil Supplies Department"
  },
  {
    "id": 1904,
    "service_id": 19,
    "document_name": "Passport Size Photograph of Female Head of Household",
    "description": "Frontal photograph of eldest adult woman (aged 18+) designated as family head under NFSA Section 13.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Food Security Act 2013 Section 13"
  },
  {
    "id": 1905,
    "service_id": 19,
    "document_name": "Bank Passbook of Female Head of Household",
    "description": "First page of bank passbook with IFSC code seeded with Aadhaar for direct food grain cash subsidies.",
    "mandatory": true,
    "condition_rule": null,
    "source": "NFSA DBT Direct Subsidy Guidelines"
  },
  {
    "id": 1906,
    "service_id": 19,
    "document_name": "Surrender Certificate / Deletion Slip from Previous Ration Card",
    "description": "Official deletion certificate issued by previous Taluk Supply Office removing names from earlier ration card.",
    "mandatory": false,
    "condition_rule": "Mandatory if applicant or spouse was previously enrolled in another family ration card or moved from another district.",
    "source": "State Civil Supplies Citizen Charter"
  },
  {
    "id": 1907,
    "service_id": 19,
    "document_name": "LPG Gas Consumer Connection Passbook / Subscription Voucher",
    "description": "Oil Marketing Company (IOCL/BPCL/HPCL) gas connection consumer card showing cylinder count.",
    "mandatory": false,
    "condition_rule": "Required to correctly record domestic LPG cylinder entitlement and determine subsidized kerosene allocation.",
    "source": "Ministry of Petroleum and Natural Gas"
  },
  {
    "id": 2001,
    "service_id": 20,
    "document_name": "Aadhaar Card of Farmer with Active e-KYC",
    "description": "12-digit Aadhaar card linked with active mobile number and biometric authentication on PM-KISAN portal.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Agriculture and Farmers Welfare - PM-KISAN (pmkisan.gov.in)"
  },
  {
    "id": 2002,
    "service_id": 20,
    "document_name": "Land Record of Rights (RoR / Jamabandi / Khatauni / Khasra)",
    "description": "Certified digital land record extract proving farmer ownership of cultivable agricultural land.",
    "mandatory": true,
    "condition_rule": null,
    "source": "PM-KISAN Operational Modalities"
  },
  {
    "id": 2003,
    "service_id": 20,
    "document_name": "Bank Account Passbook (Aadhaar & NPCI DBT Enabled)",
    "description": "Bank passbook copy showing account number, IFSC code, and confirmation of NPCI mapping for DBT.",
    "mandatory": true,
    "condition_rule": null,
    "source": "PM-KISAN Scheme Guidelines"
  },
  {
    "id": 2004,
    "service_id": 20,
    "document_name": "Mobile Number Linked to Aadhaar for OTP Verification",
    "description": "Active mobile number for receiving statutory e-KYC authentication and installment disbursement SMS notifications.",
    "mandatory": true,
    "condition_rule": null,
    "source": "UIDAI / PM-KISAN e-KYC"
  },
  {
    "id": 2005,
    "service_id": 20,
    "document_name": "Mutation / Vamshavruksha Land Succession Certificate",
    "description": "Revenue mutation record or genealogical tree certificate evidencing lawful succession of inherited agricultural land.",
    "mandatory": false,
    "condition_rule": "Required if land was recently acquired through inheritance or family partition and mutation entry is under progress.",
    "source": "PM-KISAN Standard Operating Procedure"
  },
  {
    "id": 2006,
    "service_id": 20,
    "document_name": "Self-Declaration of Non-Exclusion Category",
    "description": "Sworn declaration affirming farmer does not pay income tax, hold constitutional posts, or draw pension > INR 10,000/month.",
    "mandatory": true,
    "condition_rule": null,
    "source": "PM-KISAN Exclusion Criteria Guidelines"
  },
  {
    "id": 2101,
    "service_id": 21,
    "document_name": "Aadhaar Card of Applicant & Family Members",
    "description": "Personal identity card with biometric authentication used for instant digital e-KYC.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Health Authority - Ayushman Bharat (beneficiary.nha.gov.in)"
  },
  {
    "id": 2102,
    "service_id": 21,
    "document_name": "Active Ration Card (NFSA / BPL / SECC Database Match)",
    "description": "Ration card copy confirming family inclusion in national socio-economic or state food security register.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Health Authority Beneficiary Guidelines"
  },
  {
    "id": 2103,
    "service_id": 21,
    "document_name": "Active Mobile Number for OTP Authentication",
    "description": "Mobile handset available during verification to complete Aadhaar OTP e-KYC validation.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Health Authority e-KYC Manual"
  },
  {
    "id": 2104,
    "service_id": 21,
    "document_name": "PM-JAY Family ID / Ayushman Card Letter (HHID)",
    "description": "Official central letter or SMS displaying 24-character Socio-Economic Caste Census Family ID number.",
    "mandatory": false,
    "condition_rule": "Required when verifying eligibility against pre-existing SECC 2011 central family database records.",
    "source": "NHA Operational Guidelines"
  },
  {
    "id": 2105,
    "service_id": 21,
    "document_name": "Disability Certificate (UDID) or Senior Citizen Identity",
    "description": "Unique Disability ID or senior citizen proof for fast-track card issuance and specialized treatment package approvals.",
    "mandatory": false,
    "condition_rule": "Required for priority processing and special medical package coverage for PwD and senior citizens.",
    "source": "NHA Hospital Empanelment Manual"
  },
  {
    "id": 2201,
    "service_id": 22,
    "document_name": "Unique Disability ID (UDID Card) or Medical Board Certificate",
    "description": "Official UDID card or certificate issued by government medical authority certifying min 40% permanent disability.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Empowerment of Persons with Disabilities (disabilityaffairs.gov.in)"
  },
  {
    "id": 2202,
    "service_id": 22,
    "document_name": "Aadhaar Card of Applicant",
    "description": "Biometric identity card validating personal identity and demographic data.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Social Assistance Programme (NSAP) (nsap.nic.in)"
  },
  {
    "id": 2203,
    "service_id": 22,
    "document_name": "BPL Ration Card or Indigent Income Certificate",
    "description": "Document certifying applicant family belongs to Below Poverty Line (BPL) or indigent income category.",
    "mandatory": true,
    "condition_rule": null,
    "source": "NSAP Disability Pension Guidelines"
  },
  {
    "id": 2204,
    "service_id": 22,
    "document_name": "Bank Passbook (Single Account in Scheduled Bank, Aadhaar-seeded)",
    "description": "First page of single bank account passbook with IFSC code mapped to NPCI for direct monthly pension credits.",
    "mandatory": true,
    "condition_rule": null,
    "source": "NSAP Direct Benefit Transfer Directive"
  },
  {
    "id": 2205,
    "service_id": 22,
    "document_name": "Proof of Age (Birth Certificate / School TC / Voter ID)",
    "description": "Recognized age proof confirming applicant meets minimum age threshold for state disability pension.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Social Security Pension Rules"
  },
  {
    "id": 2206,
    "service_id": 22,
    "document_name": "High Support Need / Multi-Disability Assessment Certificate",
    "description": "Medical assessment report indicating severe disability (80% and above) requiring regular personal caregiver support.",
    "mandatory": false,
    "condition_rule": "Required to claim enhanced maintenance allowance if applicant has severe disability of 80% or multiple disabilities.",
    "source": "Rights of Persons with Disabilities Act 2016"
  },
  {
    "id": 2207,
    "service_id": 22,
    "document_name": "Legal Guardianship Certificate",
    "description": "Certificate issued by Local Level Committee under the National Trust Act or civil court appointing legal guardian.",
    "mandatory": false,
    "condition_rule": "Mandatory if applicant has autism, cerebral palsy, intellectual disability, or is a minor represented by guardian.",
    "source": "National Trust Act 1999"
  },
  {
    "id": 2301,
    "service_id": 23,
    "document_name": "State Employment Exchange Registration Card",
    "description": "Live employment exchange identity card showing registration number and continuous live renewal (min 3-5 years).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Directorate of Employment and Training (State Labour Dept)"
  },
  {
    "id": 2302,
    "service_id": 23,
    "document_name": "Educational Certificates (SSLC / HSC / Degree Marksheets & Provisional)",
    "description": "Original certificates and marksheets establishing educational qualifications registered with the exchange.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Unemployment Assistance Scheme Rules"
  },
  {
    "id": 2303,
    "service_id": 23,
    "document_name": "Aadhaar Card & Domicile / Nativity Certificate",
    "description": "Identity and residence proof verifying continuous domicile within the state.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Citizen Welfare Guidelines"
  },
  {
    "id": 2304,
    "service_id": 23,
    "document_name": "Family Annual Income Certificate (Issued by Tahsildar)",
    "description": "Income certificate issued for current financial year confirming family income is within prescribed assistance ceiling.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Social Welfare Department"
  },
  {
    "id": 2305,
    "service_id": 23,
    "document_name": "Bank Passbook with IFSC (Aadhaar Seeded)",
    "description": "Copy of bank passbook for direct quarterly credit of unemployment stipend.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Directorate of Employment"
  },
  {
    "id": 2306,
    "service_id": 23,
    "document_name": "Notarized Self-Affidavit of Non-Employment",
    "description": "Notarized declaration affirming applicant is not engaged in government, private, or formal commercial self-employment.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Employment Scheme Regulations"
  },
  {
    "id": 2307,
    "service_id": 23,
    "document_name": "Caste Certificate / Disability UDID Card",
    "description": "Community certificate or UDID card for upper age relaxation up to 45 years.",
    "mandatory": false,
    "condition_rule": "Required if seeking upper age relaxation up to 40-45 years under SC/ST/OBC or Persons with Benchmark Disabilities categories.",
    "source": "State Employment Exchange Rules"
  },
  {
    "id": 2401,
    "service_id": 24,
    "document_name": "Aadhaar Card of the Worker (Age 16 to 59 Years)",
    "description": "Biometric identity card confirming applicant age is between 16 and 59 years.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Labour and Employment - e-Shram Portal (eshram.gov.in)"
  },
  {
    "id": 2402,
    "service_id": 24,
    "document_name": "Active Mobile Number Linked with Aadhaar",
    "description": "Mobile number registered with UIDAI for real-time OTP authentication during worker onboarding.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Labour and Employment (eshram.gov.in)"
  },
  {
    "id": 2403,
    "service_id": 24,
    "document_name": "Bank Account Passbook (Account Number & IFSC)",
    "description": "Bank passbook or cancelled cheque for direct financial credit of social security benefits and accidental relief.",
    "mandatory": true,
    "condition_rule": null,
    "source": "e-Shram DBT Guidelines"
  },
  {
    "id": 2404,
    "service_id": 24,
    "document_name": "Self-Declaration of Occupation in Unorganized Sector",
    "description": "Self-declaration declaring engagement as domestic worker, street vendor, driver, farm labourer, or artisan, and non-membership in EPFO/ESIC.",
    "mandatory": true,
    "condition_rule": null,
    "source": "e-Shram Terms of Service"
  },
  {
    "id": 2405,
    "service_id": 24,
    "document_name": "Nominee Identity Proof (Aadhaar / Voter ID)",
    "description": "Photo identity card of designated nominee with relationship and date of birth details.",
    "mandatory": false,
    "condition_rule": "Required to nominate legal beneficiary for INR 2,00,000 accidental death/disability insurance cover under PMSBY.",
    "source": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)"
  },
  {
    "id": 2406,
    "service_id": 24,
    "document_name": "Skill / Vocational Training Certificate",
    "description": "Certificate from National Skill Development Corporation (NSDC) or recognized state vocational training center.",
    "mandatory": false,
    "condition_rule": "Optional, required if registering for state skill upgradation stipends and free tool kit subsidies.",
    "source": "Ministry of Skill Development & Labour"
  },
  {
    "id": 2501,
    "service_id": 25,
    "document_name": "90 Days Construction Work Certificate (Form-V)",
    "description": "Certificate issued by registered contractor, trade union, or Assistant Labour Commissioner verifying 90 days construction work.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Building & Other Construction Workers (RECS) Act 1996 Section 12"
  },
  {
    "id": 2502,
    "service_id": 25,
    "document_name": "Aadhaar Card of Construction Worker",
    "description": "Biometric unique identity card confirming worker identity.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State BOCW Welfare Board Regulations"
  },
  {
    "id": 2503,
    "service_id": 25,
    "document_name": "Age Proof (School Certificate / Voter ID / Aadhaar verifying 18-60 Years)",
    "description": "Document establishing worker age between 18 and 60 years.",
    "mandatory": true,
    "condition_rule": null,
    "source": "BOCW Welfare Rules"
  },
  {
    "id": 2504,
    "service_id": 25,
    "document_name": "Family Ration Card / Smart Card",
    "description": "Civil supplies card establishing dependant family members eligible for marriage, medical, and maternity benefits.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State BOCW Board Manual"
  },
  {
    "id": 2505,
    "service_id": 25,
    "document_name": "Bank Passbook with IFSC (Single Account)",
    "description": "Copy of bank passbook for direct credit of welfare grants and educational stipends.",
    "mandatory": true,
    "condition_rule": null,
    "source": "BOCW DBT Disbursement Guidelines"
  },
  {
    "id": 2506,
    "service_id": 25,
    "document_name": "Passport Size Photographs (3 Copies)",
    "description": "Recent colour photographs for identity passbook and labour welfare identity card.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State BOCW Board"
  },
  {
    "id": 2507,
    "service_id": 25,
    "document_name": "Children Educational Bonafide / Enrollment Certificates",
    "description": "Bonafide certificate issued by school/college principal confirming regular full-time study of worker child.",
    "mandatory": false,
    "condition_rule": "Required when applying for BOCW Children Educational Scholarship, free laptops, or higher studies assistance.",
    "source": "BOCW Welfare Fund Scheme Manual"
  },
  {
    "id": 2601,
    "service_id": 26,
    "document_name": "Aadhaar Card of Proprietor / Managing Partner / Director",
    "description": "12-digit Aadhaar card linked with active mobile number for biometric/OTP authorization on Udyam portal.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of MSME Notification S.O. 2119(E) (udyamregistration.gov.in)"
  },
  {
    "id": 2602,
    "service_id": 26,
    "document_name": "PAN Card of the Enterprise / Proprietor",
    "description": "Income Tax PAN card of proprietor (for proprietorship) or business PAN (for partnership/company).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of MSME Gazetted Order on Mandatory PAN"
  },
  {
    "id": 2603,
    "service_id": 26,
    "document_name": "Business Address Proof (Electricity Bill / Rent Agreement / Property Tax)",
    "description": "Utility bill, lease agreement, or municipal property tax receipt establishing commercial or manufacturing premises.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Udyam Registration Portal Verification Manual"
  },
  {
    "id": 2604,
    "service_id": 26,
    "document_name": "Bank Account Details of Enterprise (Passbook / Cancelled Cheque)",
    "description": "Bank statement or cancelled cheque showing business entity name, active account number, and IFSC code.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Udyam Registration Portal"
  },
  {
    "id": 2605,
    "service_id": 26,
    "document_name": "National Industrial Classification (NIC) Activity Code",
    "description": "2-digit, 4-digit, or 5-digit NIC 2008 business activity classification identifying manufacturing/service scope.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Statistics & Programme Implementation (NIC 2008)"
  },
  {
    "id": 2606,
    "service_id": 26,
    "document_name": "Goods and Services Tax Identification Number (GSTIN)",
    "description": "15-digit state GSTIN registration certificate issued under Central Goods and Services Tax Act 2017.",
    "mandatory": false,
    "condition_rule": "Mandatory for enterprises operating in GST-liable categories or whose annual turnover exceeds statutory GST exemption thresholds.",
    "source": "CGST Act 2017 / Ministry of MSME Circular"
  },
  {
    "id": 2607,
    "service_id": 26,
    "document_name": "Partnership Deed / Certificate of Incorporation (RoC)",
    "description": "Sub-registrar registered partnership deed or Ministry of Corporate Affairs (MCA) certificate of incorporation.",
    "mandatory": false,
    "condition_rule": "Mandatory for Partnership Firms, LLPs, Private Limited Companies, or One Person Companies (OPC).",
    "source": "Ministry of MSME Udyam Guidelines"
  },
  {
    "id": 2701,
    "service_id": 27,
    "document_name": "Aadhaar Card of Applicant",
    "description": "12-digit biometrically authenticated identity card verifying applicant name and demographic record.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Portal of India (services.india.gov.in)"
  },
  {
    "id": 2702,
    "service_id": 27,
    "document_name": "Proof of Continuous Residence (5 to 10 Years)",
    "description": "Continuous documentary proof like Land Tax receipts, Voter List extracts, or Electricity Bills for minimum continuous statutory duration.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Domicile Rules Manual"
  },
  {
    "id": 2703,
    "service_id": 27,
    "document_name": "School Transfer Certificate (TC) / Educational Proofs",
    "description": "School/College TC or study certificates confirming continuous schooling in the state from primary to higher secondary level.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Education & Revenue Guidelines"
  },
  {
    "id": 2704,
    "service_id": 27,
    "document_name": "Parents Domicile Certificate or Ancestral Land Deed",
    "description": "Certified domicile certificate of father/mother or registered title deed showing ancestral family roots.",
    "mandatory": false,
    "condition_rule": "Mandatory if applicant claims domicile through parental ancestral origin rather than personal continuous residence.",
    "source": "Revenue Department Standing Orders"
  },
  {
    "id": 2705,
    "service_id": 27,
    "document_name": "Notarized Domicile Self-Affidavit",
    "description": "Sworn affidavit signed before an Executive Magistrate or Notary Public affirming permanent intention to reside in the state.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State e-District Manual"
  },
  {
    "id": 2801,
    "service_id": 28,
    "document_name": "Proof of Identity (Aadhaar / Voter ID / Passport)",
    "description": "Government photo identification document confirming identity without discrepancies.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Police Citizen Services Portal (citizen.police.gov.in)"
  },
  {
    "id": 2802,
    "service_id": 28,
    "document_name": "Proof of Residential Address (Utility Bill / Rent Agreement)",
    "description": "Valid address proof showing continuous residence within the local police station jurisdiction for at least 1 year.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Police Citizen Charter"
  },
  {
    "id": 2803,
    "service_id": 28,
    "document_name": "Passport Size Colour Photographs (3 Copies)",
    "description": "Recent colour photographs with clear facial exposure.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Police Department Guidelines"
  },
  {
    "id": 2804,
    "service_id": 28,
    "document_name": "Letter of Intent / Requisition from Employer or Embassy",
    "description": "Formal letter requesting character verification issued by government recruiter, embassy, or public agency.",
    "mandatory": false,
    "condition_rule": "Required if character verification is specifically demanded for overseas visa, defense, or PSU employment.",
    "source": "Police Verification Guidelines"
  },
  {
    "id": 2805,
    "service_id": 28,
    "document_name": "Character Reference Letters from Two Gazetted Officers",
    "description": "Signed certificates of good moral character from two respectable gazetted officers or ward councilors not related to applicant.",
    "mandatory": false,
    "condition_rule": "Required when applying through Executive Magistrate or District Collectorate channels.",
    "source": "Executive Magistrate Code"
  },
  {
    "id": 2901,
    "service_id": 29,
    "document_name": "Aadhaar Card of Applicant",
    "description": "Personal biometric identity document verifying citizen age and residence.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Revenue & District Administration"
  },
  {
    "id": 2902,
    "service_id": 29,
    "document_name": "Educational Certificates (SSLC / HSC / Degree)",
    "description": "Original educational marksheets and degree certificates establishing highest qualification attained.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Directorate of Employment Guidelines"
  },
  {
    "id": 2903,
    "service_id": 29,
    "document_name": "State Employment Exchange Live Registration Card",
    "description": "Live registration card showing continuous active enrollment on the National Career Service (NCS) or state exchange.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Employment Directorate"
  },
  {
    "id": 2904,
    "service_id": 29,
    "document_name": "Notarized Affidavit of Non-Employment",
    "description": "Sworn affidavit affirmed on non-judicial stamp paper stating applicant does not hold any formal public or private salaried job.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Revenue Manual"
  },
  {
    "id": 2905,
    "service_id": 29,
    "document_name": "Family Smart Ration Card",
    "description": "Civil supplies ration card showing household composition and dependent status.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Food & Civil Supplies"
  },
  {
    "id": 3001,
    "service_id": 30,
    "document_name": "Aadhaar Card of Applicant",
    "description": "Biometric identity card verifying personal demographic data.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Personnel, Public Grievances & Pensions (DoPT)"
  },
  {
    "id": 3002,
    "service_id": 30,
    "document_name": "Father or Mother Community Certificate (OBC)",
    "description": "State-issued community certificate proving parent belongs to an eligible backward class recognized in central/state lists.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Commission for Backward Classes (NCBC)"
  },
  {
    "id": 3003,
    "service_id": 30,
    "document_name": "Parents Income Proof for Last 3 Financial Years (ITR / Form 16 / Salary Slip)",
    "description": "Income Tax Returns, Form 16, or salary statements proving gross non-agricultural parental income is under INR 8 Lakhs/year.",
    "mandatory": true,
    "condition_rule": null,
    "source": "DoPT Creamy Layer Exclusion Guidelines"
  },
  {
    "id": 3004,
    "service_id": 30,
    "document_name": "Agricultural Landholding Certificate from Tahsildar",
    "description": "Revenue certificate verifying agricultural landholding does not exceed the statutory ceiling limit.",
    "mandatory": false,
    "condition_rule": "Required if parents own agricultural land to substantiate exclusion from creamy layer wealth criteria.",
    "source": "Revenue Department Circular"
  },
  {
    "id": 3005,
    "service_id": 30,
    "document_name": "Self-Declaration Affidavit of Non-Creamy Layer Status",
    "description": "Standard Annexure affidavit declaring family does not fall in the creamy layer as defined in DoPT OM No. 36012/22/93.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Social Justice & Empowerment"
  },
  {
    "id": 3006,
    "service_id": 30,
    "document_name": "Family Smart Ration Card",
    "description": "Civil supplies card validating parentage and family living composition.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Revenue Department"
  },
  {
    "id": 3101,
    "service_id": 31,
    "document_name": "Aadhaar Cards of Applicant and All Family Members",
    "description": "Biometric identity cards of all co-inhabiting family members for national verification.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Social Justice and Empowerment (socialjustice.gov.in)"
  },
  {
    "id": 3102,
    "service_id": 31,
    "document_name": "Gross Annual Family Income Certificate (< INR 8 Lakhs)",
    "description": "Revenue income certificate proving total family earnings from all sources is below INR 8 Lakhs for the preceding financial year.",
    "mandatory": true,
    "condition_rule": null,
    "source": "EWS Reservation Office Memorandum 2019"
  },
  {
    "id": 3103,
    "service_id": 31,
    "document_name": "Agricultural Landholding Records / Patta",
    "description": "Land records proving family does not own 5 acres or more of agricultural land anywhere in India.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Revenue Department EWS Guidelines"
  },
  {
    "id": 3104,
    "service_id": 31,
    "document_name": "Residential Flat / Plot Area Certificate",
    "description": "Property documents confirming residential flat is under 1,000 sq ft or residential plot is under 100/200 sq yards.",
    "mandatory": true,
    "condition_rule": null,
    "source": "EWS Verification Manual"
  },
  {
    "id": 3105,
    "service_id": 31,
    "document_name": "Self-Declaration of Non-Coverage under SC/ST/OBC",
    "description": "Sworn affidavit affirming applicant belongs to General Category and is not eligible for SC, ST, or OBC reservation.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Social Justice"
  },
  {
    "id": 3106,
    "service_id": 31,
    "document_name": "Bank Statements of All Earning Family Members (1 Year)",
    "description": "Bank account statements showing financial flows of family members.",
    "mandatory": false,
    "condition_rule": "Required if family members have informal or business income without formal ITR filings.",
    "source": "Revenue Department Circular"
  },
  {
    "id": 3201,
    "service_id": 32,
    "document_name": "Aadhaar Card of Applicant",
    "description": "Government photo identification document establishing applicant legal identity and name.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Commission for Backward Classes (NCBC)"
  },
  {
    "id": 3202,
    "service_id": 32,
    "document_name": "School Transfer Certificate (TC) Recording OBC Community",
    "description": "School or college TC explicitly recording the community and sub-caste recorded at the time of admission.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Backward Classes Welfare Department"
  },
  {
    "id": 3203,
    "service_id": 32,
    "document_name": "Father or Blood Relative OBC Community Certificate",
    "description": "Community certificate of father, real brother, sister, or paternal grandfather issued by revenue authority.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Revenue Manual"
  },
  {
    "id": 3204,
    "service_id": 32,
    "document_name": "Family Smart Ration Card",
    "description": "State civil supplies smart card establishing genealogical relationship to certified relatives.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Food & Civil Supplies"
  },
  {
    "id": 3205,
    "service_id": 32,
    "document_name": "Local VAO / Village Administrative Verification Report",
    "description": "Field enquiry report confirming long-standing local community status.",
    "mandatory": false,
    "condition_rule": "Required if blood relative certificates were issued in another district or state jurisdiction.",
    "source": "State Revenue Department"
  },
  {
    "id": 3301,
    "service_id": 33,
    "document_name": "Aadhaar Card of Applicant",
    "description": "Biometric identity card verifying personal identity and residential location.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Social Justice & Empowerment"
  },
  {
    "id": 3302,
    "service_id": 33,
    "document_name": "School Leaving Certificate / TC with SC Entry",
    "description": "School TC recording the Scheduled Caste community of applicant at initial primary schooling.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Adi Dravidar & Tribal Welfare Department"
  },
  {
    "id": 3303,
    "service_id": 33,
    "document_name": "Father or Real Sibling SC Community Certificate",
    "description": "Permanent community certificate of paternal family members issued by competent Tahsildar.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Revenue Administration Code"
  },
  {
    "id": 3304,
    "service_id": 33,
    "document_name": "Family Smart Ration Card",
    "description": "Ration card confirming applicant family composition and parental lineage.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Food & Civil Supplies"
  },
  {
    "id": 3305,
    "service_id": 33,
    "document_name": "Revenue Inspector Spot Enquiry Report",
    "description": "Formal inquiry report validating hereditary community status in native habitation.",
    "mandatory": false,
    "condition_rule": "Required in absence of direct parental certificates or upon interstate migration.",
    "source": "Social Welfare Department Guidelines"
  },
  {
    "id": 3401,
    "service_id": 34,
    "document_name": "Aadhaar Card of Applicant",
    "description": "Biometric identity document establishing applicant identity and tribal area residence.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Tribal Affairs (tribal.nic.in)"
  },
  {
    "id": 3402,
    "service_id": 34,
    "document_name": "Paternal Blood Relative ST Certificate (RDO Issued)",
    "description": "Statutory ST certificate of father, paternal uncle, or grandfather issued strictly by Sub-Collector / RDO.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Supreme Court Mandate on ST Issuance"
  },
  {
    "id": 3403,
    "service_id": 34,
    "document_name": "Primary School Admission Register Extract",
    "description": "Certified extract of early school admission register recording hereditary tribal classification.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Tribal Welfare Directorate"
  },
  {
    "id": 3404,
    "service_id": 34,
    "document_name": "District Vigilance Committee Anthropological Scrutiny Report",
    "description": "Comprehensive anthropological scrutiny report verifying ethnic customs, dialect, and tribal roots.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Level Scrutiny Committee Guidelines"
  },
  {
    "id": 3405,
    "service_id": 34,
    "document_name": "Family Smart Ration Card",
    "description": "Civil supplies smart card proving family genealogical ties to certified tribal elders.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Civil Supplies"
  },
  {
    "id": 3406,
    "service_id": 34,
    "document_name": "Forest / Tribal Habitation Domicile Certificate",
    "description": "Certificate from Forest Range Officer or Village Headman proving long-standing residence in scheduled tribal settlement.",
    "mandatory": false,
    "condition_rule": "Mandatory if applicant resides within Scheduled Tribal Areas or hill tracts.",
    "source": "Ministry of Tribal Affairs"
  },
  {
    "id": 3501,
    "service_id": 35,
    "document_name": "Aadhaar Card of Person with Disability",
    "description": "Biometric identity card required for digital e-KYC and national de-duplication on Swavlamban Portal.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Empowerment of Persons with Disabilities (swavlambancard.gov.in)"
  },
  {
    "id": 3502,
    "service_id": 35,
    "document_name": "Colour Photograph showing Visible Disability",
    "description": "Full length or frontal colour photograph clearly displaying visible physical disability condition.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Swavlamban Portal Guidelines"
  },
  {
    "id": 3503,
    "service_id": 35,
    "document_name": "Medical Evaluation Report from Government Civil Hospital",
    "description": "Clinical assessment report issued by government district medical specialist detailing disability degree.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Rights of Persons with Disabilities Act 2016"
  },
  {
    "id": 3504,
    "service_id": 35,
    "document_name": "Diagnostic Clinical Test Reports (Audiogram / IQ / MRI)",
    "description": "Specialized medical tests: Audiogram for hearing loss, IQ assessment for intellectual disability, or ophthalmic report for blindness.",
    "mandatory": false,
    "condition_rule": "Mandatory for sensory, cognitive, intellectual, or non-visible neurological disabilities.",
    "source": "Medical Board Assessment Guidelines"
  },
  {
    "id": 3505,
    "service_id": 35,
    "document_name": "Proof of Residential Address (Voter ID / Ration Card / Electricity Bill)",
    "description": "Address verification document establishing residence in the medical district jurisdiction.",
    "mandatory": true,
    "condition_rule": null,
    "source": "DEPwD Guidelines"
  },
  {
    "id": 3601,
    "service_id": 36,
    "document_name": "Aadhaar Card (Verifying Age 60+)",
    "description": "Biometric identity card confirming applicant has attained 60 years of age.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Social Welfare Citizen Charter"
  },
  {
    "id": 3602,
    "service_id": 36,
    "document_name": "Proof of Date of Birth (Birth Certificate / Passport / Voter ID)",
    "description": "Statutory age verification document establishing date of birth matching identity records.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Senior Citizen Rules"
  },
  {
    "id": 3603,
    "service_id": 36,
    "document_name": "Proof of Residence in the State (Ration Card / Utility Bill)",
    "description": "Document certifying continuous residence within the state.",
    "mandatory": true,
    "condition_rule": null,
    "source": "District Social Welfare Office"
  },
  {
    "id": 3604,
    "service_id": 36,
    "document_name": "Blood Group Test Certificate",
    "description": "Medical laboratory report certifying blood group for emergency medical care recording.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Senior Citizen Welfare Scheme"
  },
  {
    "id": 3605,
    "service_id": 36,
    "document_name": "Passport Size Colour Photographs (2 Copies)",
    "description": "Recent colour photographs for laminated identity pass issuance.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Social Welfare Department"
  },
  {
    "id": 3701,
    "service_id": 37,
    "document_name": "Aadhaar Card & PAN Card of Applicant",
    "description": "Personal identity and income tax credentials of the applicant or firm partners.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Revenue & Land Administration"
  },
  {
    "id": 3702,
    "service_id": 37,
    "document_name": "Registered Sale Deeds / Title Deeds of Immovable Properties",
    "description": "Original registered deeds establishing absolute, undisputed ownership of properties offered for solvency evaluation.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Revenue Standing Orders"
  },
  {
    "id": 3703,
    "service_id": 37,
    "document_name": "Latest Encumbrance Certificate (EC) for 13 to 30 Years",
    "description": "Non-encumbrance certificate issued by Sub-Registrar verifying properties are free from mortgages or liens.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Registration and Stamps Department"
  },
  {
    "id": 3704,
    "service_id": 37,
    "document_name": "Govt Approved Valuer / PWD Property Valuation Report",
    "description": "Certified property valuation report signed by government-registered valuer or PWD Executive Engineer.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Public Works & Revenue Guidelines"
  },
  {
    "id": 3705,
    "service_id": 37,
    "document_name": "Latest Property Tax / Land Revenue Tax Receipts",
    "description": "Recent tax receipts confirming no municipal or land tax arrears exist on the evaluated properties.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Municipal Administration / Revenue Records"
  },
  {
    "id": 3706,
    "service_id": 37,
    "document_name": "Notarized Affidavit of Free Title and Non-Pledge",
    "description": "Sworn affidavit affirming properties are unencumbered, free from court attachments, and not pledged for other solvency guarantees.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Revenue Department Code"
  },
  {
    "id": 3801,
    "service_id": 38,
    "document_name": "Registered Sale Deed / Title Document Copy",
    "description": "Copy of previous registered sale deed, settlement deed, or partition deed establishing property identity.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Inspector General of Registration (igreg.gov.in)"
  },
  {
    "id": 3802,
    "service_id": 38,
    "document_name": "Accurate Property Schedule & Boundaries (North, South, East, West)",
    "description": "Complete four-sided boundary details, survey number, sub-division, plot number, and village name.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Registration Manual"
  },
  {
    "id": 3803,
    "service_id": 38,
    "document_name": "Aadhaar Card / Photo ID of Applicant",
    "description": "Government photo identification document of person seeking search records.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Registration and Stamps Department"
  },
  {
    "id": 3804,
    "service_id": 38,
    "document_name": "Latest Property Tax Receipt / Municipal Assessment Number",
    "description": "Municipal assessment receipt connecting property to physical local body records.",
    "mandatory": false,
    "condition_rule": "Recommended to verify house/door number linkages within urban local body limits.",
    "source": "Urban Local Body Guidelines"
  },
  {
    "id": 3901,
    "service_id": 39,
    "document_name": "Registered Sale Deed / Settlement Deed in Applicant Name",
    "description": "Certified copy of registered conveyance deed registered at the Sub-Registrar Office transferring ownership.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Revenue & Survey and Settlement"
  },
  {
    "id": 3902,
    "service_id": 39,
    "document_name": "Previous Owner Patta Copy / Chitta Ledger Extract",
    "description": "Existing digital patta copy or village ledger record registered in vendor/ancestor name.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Land Records Directorate"
  },
  {
    "id": 3903,
    "service_id": 39,
    "document_name": "Encumbrance Certificate (EC) from Date of Purchase",
    "description": "Sub-Registrar EC verifying transaction registration and non-existence of third-party encumbrances.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Inspector General of Registration"
  },
  {
    "id": 3904,
    "service_id": 39,
    "document_name": "FMB (Field Measurement Book) Sketch / Subdivision Map",
    "description": "Village cadastral map sketch depicting land dimensions, survey stones, and proposed subdivision line.",
    "mandatory": false,
    "condition_rule": "Mandatory if patta transfer involves sub-division of a larger survey number.",
    "source": "Survey & Land Records Department"
  },
  {
    "id": 3905,
    "service_id": 39,
    "document_name": "Legal Heir Certificate & Consent NOC of Co-heirs",
    "description": "Statutory legal heir certificate and sworn consent affidavits.",
    "mandatory": false,
    "condition_rule": "Mandatory if patta mutation is claimed by inheritance following demise of original registered owner.",
    "source": "Revenue Department Standing Orders"
  },
  {
    "id": 3906,
    "service_id": 39,
    "document_name": "Aadhaar Card of Applicant",
    "description": "Biometric identity credential for digital landholder linking.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Land Records Modernization Programme (NLRMP)"
  },
  {
    "id": 4001,
    "service_id": 40,
    "document_name": "Survey Number and Sub-Division Number Details",
    "description": "Accurate revenue survey number and sub-division as recorded in village revenue map.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Directorate of Land Administration (eservices.tn.gov.in)"
  },
  {
    "id": 4002,
    "service_id": 40,
    "document_name": "Patta Number or Registered Landowner Name",
    "description": "Patta account number or registered titleholder name as recorded in the district revenue register.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Land Records Portal"
  },
  {
    "id": 4003,
    "service_id": 40,
    "document_name": "Aadhaar Card of Landowner",
    "description": "Identity verification document establishing lawful land ownership interest.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Portal of India"
  },
  {
    "id": 4004,
    "service_id": 40,
    "document_name": "Seasonal Crop Cultivation Declaration",
    "description": "Self-declaration of standing agricultural crops, irrigation source, and harvested yield.",
    "mandatory": false,
    "condition_rule": "Required for Adangal crop entries when claiming agricultural insurance or crop disaster relief.",
    "source": "Department of Agriculture & Revenue"
  },
  {
    "id": 4101,
    "service_id": 41,
    "document_name": "Property Assessment Number / Old Tax Receipt",
    "description": "Unique property identification code (PID) or receipt of previous half-year property tax settlement.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Directorate of Municipal Administration"
  },
  {
    "id": 4102,
    "service_id": 41,
    "document_name": "Registered Title Deed / Sale Deed of Property",
    "description": "Registered deed proving legal ownership of the residential or commercial building.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Urban Local Body Building By-Laws"
  },
  {
    "id": 4103,
    "service_id": 41,
    "document_name": "Sanctioned Building Plan Copy or Completion Certificate",
    "description": "Approved planning permit indicating sanctioned plinth area and structural floor details.",
    "mandatory": false,
    "condition_rule": "Mandatory for fresh property tax assessment of newly constructed buildings.",
    "source": "Municipal Planning Authority"
  },
  {
    "id": 4104,
    "service_id": 41,
    "document_name": "Electricity Meter Service Connection Card / Bill",
    "description": "Recent electricity consumption bill showing consumer service connection number.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Electricity Board / Municipal Corporation"
  },
  {
    "id": 4105,
    "service_id": 41,
    "document_name": "Aadhaar Card of Property Owner",
    "description": "Identity proof of titleholder.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Municipal Citizen Charter"
  },
  {
    "id": 4201,
    "service_id": 42,
    "document_name": "Registered Land Ownership Deed & Revenue Patta",
    "description": "Registered title deeds along with computerized revenue patta showing undisputed ownership of plot.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Directorate of Town and Country Planning (DTCP)"
  },
  {
    "id": 4202,
    "service_id": 42,
    "document_name": "Architectural Blueprint Drawings signed by Registered Architect",
    "description": "Detailed floor plans, elevation, sectional views, site plan, and key plan drawn to metric scale.",
    "mandatory": true,
    "condition_rule": null,
    "source": "DTCP Building Scrutiny Manual"
  },
  {
    "id": 4203,
    "service_id": 42,
    "document_name": "Structural Stability Certificate from Licensed Structural Engineer",
    "description": "Certificate affirming structural design compliance with Indian Standard seismic and wind load codes.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Building Code of India (NBC)"
  },
  {
    "id": 4204,
    "service_id": 42,
    "document_name": "Encumbrance Certificate (EC) for Past 13 Years",
    "description": "Sub-Registrar EC proving plot is free from court attachments and mortgages.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Registration and Stamps Department"
  },
  {
    "id": 4205,
    "service_id": 42,
    "document_name": "Fire and Rescue Services Department NOC",
    "description": "No Objection Certificate from state fire authority affirming compliance with emergency egress and hydrants.",
    "mandatory": false,
    "condition_rule": "Mandatory for multi-storey buildings exceeding 15 meters in height, public assembly buildings, or commercial complexes.",
    "source": "State Fire Safety Directorate"
  },
  {
    "id": 4206,
    "service_id": 42,
    "document_name": "Pollution Control Board Consent to Establish (CTE)",
    "description": "Environmental clearance or CTE certificate from State Pollution Control Board.",
    "mandatory": false,
    "condition_rule": "Mandatory for industrial developments or commercial projects generating significant effluent/sewage.",
    "source": "State Pollution Control Board"
  },
  {
    "id": 4301,
    "service_id": 43,
    "document_name": "Aadhaar Card & PAN Card of Proprietor / Partners",
    "description": "Personal identity and taxation documents of business owners.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Municipal Corporation Public Health Department"
  },
  {
    "id": 4302,
    "service_id": 43,
    "document_name": "Commercial Premises Property Tax Receipt or Rent Agreement",
    "description": "Municipal property tax receipt of owned commercial shop or notarized tenancy lease agreement.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Municipal Corporation Health By-Laws"
  },
  {
    "id": 4303,
    "service_id": 43,
    "document_name": "Sanctioned Building Plan / Commercial Assessment Order",
    "description": "Document verifying the premises is legally sanctioned for commercial trade operations.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Urban Local Body Regulations"
  },
  {
    "id": 4304,
    "service_id": 43,
    "document_name": "Owner No-Objection Certificate (NOC) for Trade",
    "description": "Consent letter from building owner permitting specific trade activity on rented premises.",
    "mandatory": false,
    "condition_rule": "Required if operating from rented or leased commercial accommodation.",
    "source": "Municipal Trade Charter"
  },
  {
    "id": 4305,
    "service_id": 43,
    "document_name": "Fire Safety NOC from Fire Department",
    "description": "Statutory fire safety certification verifying fire extinguishers and emergency exits.",
    "mandatory": false,
    "condition_rule": "Mandatory for high-occupancy trades, hotels, restaurants, banquet halls, fireworks, and chemical trades.",
    "source": "State Fire and Rescue Services"
  },
  {
    "id": 4401,
    "service_id": 44,
    "document_name": "PAN Card & Aadhaar Card of Employer / Proprietor",
    "description": "Taxation and identity proof of the employer or managing director.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Labour Department (labour.gov.in)"
  },
  {
    "id": 4402,
    "service_id": 44,
    "document_name": "Commercial Address Proof (Electricity Bill / Rent Agreement)",
    "description": "Electricity bill of establishment premises not older than 3 months, along with registered lease deed.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Shops and Establishments Act"
  },
  {
    "id": 4403,
    "service_id": 44,
    "document_name": "Certificate of Incorporation / Partnership Deed",
    "description": "RoC certificate of incorporation or registered partnership deed establishing legal business entity.",
    "mandatory": false,
    "condition_rule": "Mandatory for Companies, LLPs, and Registered Partnership Firms.",
    "source": "Ministry of Corporate Affairs"
  },
  {
    "id": 4404,
    "service_id": 44,
    "document_name": "List of Employees with Designation and Wages",
    "description": "Register detailing names, age, dates of appointment, and monthly wages of all employed staff.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Labour Welfare Commissionerate"
  },
  {
    "id": 4405,
    "service_id": 44,
    "document_name": "Photograph of Establishment Displaying Bilingual Name Board",
    "description": "Frontal photograph of establishment entrance clearly displaying commercial name board in local state language and English.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Shops and Establishments Rules"
  },
  {
    "id": 4501,
    "service_id": 45,
    "document_name": "PAN Card of Enterprise / Professional",
    "description": "Income Tax PAN card of practicing professional or business organization.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Commercial Taxes Department / Urban Local Body"
  },
  {
    "id": 4502,
    "service_id": 45,
    "document_name": "Professional Qualification / Certificate of Practice",
    "description": "Registration certificate from Bar Council (Lawyers), Medical Council (Doctors), ICAI (CA), or Council of Architecture.",
    "mandatory": false,
    "condition_rule": "Mandatory for self-employed professionals practicing licensed vocations.",
    "source": "Professional Tax Statutory Rules"
  },
  {
    "id": 4503,
    "service_id": 45,
    "document_name": "Proof of Place of Work / Business Premises Address",
    "description": "Utility bill, property tax receipt, or lease agreement of office chamber or consulting room.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Professional Tax Directorate"
  },
  {
    "id": 4504,
    "service_id": 45,
    "document_name": "Bank Account Statement / Cancelled Cheque",
    "description": "Bank passbook or cancelled cheque displaying business/professional account title and IFSC code.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Commercial Taxes Department"
  },
  {
    "id": 4505,
    "service_id": 45,
    "document_name": "Shop & Establishment Certificate or GSTIN",
    "description": "Statutory trade registration certificate.",
    "mandatory": false,
    "condition_rule": "Required if applicant runs an incorporated commercial or consultancy office.",
    "source": "State Tax Regulations"
  },
  {
    "id": 4601,
    "service_id": 46,
    "document_name": "Form 1 (Application for Factory Approval) & Form 2 (Grant of Licence)",
    "description": "Completed statutory application forms containing manufacturing process details and occupier data.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Directorate of Industrial Safety and Health (DISH) (dish.gov.in)"
  },
  {
    "id": 4602,
    "service_id": 46,
    "document_name": "Factory Plant Layout Blueprint drawn to Scale",
    "description": "Detailed architectural drawings showing machine positioning, clear gangways, fire escapes, and natural ventilation.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Factories Act 1948 Section 6"
  },
  {
    "id": 4603,
    "service_id": 46,
    "document_name": "Land Title Deed / Industrial Estate Allotment Order",
    "description": "Registered title deed or State Small Industries Development Corporation allotment order for factory plot.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Directorate of Industrial Safety"
  },
  {
    "id": 4604,
    "service_id": 46,
    "document_name": "List of Plant and Machinery with Horsepower (HP) Rating",
    "description": "Certified schedule detailing each production machine, individual motor capacity in HP, and total connected load in KVA.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Factories Act 1948"
  },
  {
    "id": 4605,
    "service_id": 46,
    "document_name": "State Pollution Control Board Consent to Establish (CTE)",
    "description": "Statutory environmental consent order issued under Air and Water Pollution Control Acts.",
    "mandatory": true,
    "condition_rule": null,
    "source": "State Pollution Control Board"
  },
  {
    "id": 4606,
    "service_id": 46,
    "document_name": "Emergency Preparedness & On-Site Disaster Management Plan",
    "description": "Documented disaster response plan and hazardous chemical storage protocols.",
    "mandatory": false,
    "condition_rule": "Mandatory for chemical, pharmaceutical, metallurgical, or hazardous process factory operations.",
    "source": "DISH Safety Code"
  },
  {
    "id": 4701,
    "service_id": 47,
    "document_name": "Photo ID of Food Business Operator (Aadhaar / Passport / Voter ID)",
    "description": "Identity credential of the proprietor, partner, or authorized food safety director.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Food Safety and Standards Authority of India - FoSCoS (foscos.fssai.gov.in)"
  },
  {
    "id": 4702,
    "service_id": 47,
    "document_name": "Business Premises Address Proof (Rent Agreement / Electricity Bill)",
    "description": "Document establishing physical address where food preparation, processing, or storage occurs.",
    "mandatory": true,
    "condition_rule": null,
    "source": "FSSAI Licensing Regulations"
  },
  {
    "id": 4703,
    "service_id": 47,
    "document_name": "Food Safety Management System (FSMS) Plan or Affidavit",
    "description": "Declaration or certified FSMS plan outlining hygienic handling, pest control, and food safety protocols.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Food Safety and Standards Act 2006"
  },
  {
    "id": 4704,
    "service_id": 47,
    "document_name": "List of Food Product Categories & Manufacturing Flowchart",
    "description": "Complete list of food items manufactured, repacked, or sold with production flow steps.",
    "mandatory": true,
    "condition_rule": null,
    "source": "FoSCoS Portal Guidelines"
  },
  {
    "id": 4705,
    "service_id": 47,
    "document_name": "Water Testing Analysis Report from NABL-Accredited Lab",
    "description": "Chemical and microbiological potability report of water used in food preparation.",
    "mandatory": false,
    "condition_rule": "Mandatory for food manufacturers, beverage bottlers, restaurants, and catering establishments.",
    "source": "FSSAI Quality Regulations"
  },
  {
    "id": 4706,
    "service_id": 47,
    "document_name": "Medical Fitness Certificates of Food Handlers",
    "description": "Medical examination reports certifying workers are free from communicable diseases and vaccinated against typhoid.",
    "mandatory": false,
    "condition_rule": "Mandatory for commercial kitchens, catering units, and packaged food manufacturing plants.",
    "source": "FSSAI Hygiene Code"
  },
  {
    "id": 4801,
    "service_id": 48,
    "document_name": "PAN Card of Business Entity / Proprietor",
    "description": "Permanent Account Number of proprietor (for proprietorship) or company/firm PAN (for legal entities).",
    "mandatory": true,
    "condition_rule": null,
    "source": "Goods and Services Tax Network (GSTN) (gst.gov.in)"
  },
  {
    "id": 4802,
    "service_id": 48,
    "document_name": "Aadhaar Card of Authorized Signatory (with Mobile OTP)",
    "description": "Biometric unique identity card of authorized signatory required for mandatory biometric/OTP e-KYC.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Central Goods and Services Tax Act 2017"
  },
  {
    "id": 4803,
    "service_id": 48,
    "document_name": "Proof of Principal Place of Business (Electricity Bill / Property Tax)",
    "description": "Electricity bill, property tax receipt, or registered rent agreement with owner consent NOC.",
    "mandatory": true,
    "condition_rule": null,
    "source": "GST Registration Manual"
  },
  {
    "id": 4804,
    "service_id": 48,
    "document_name": "Bank Account Proof (Cancelled Cheque / Bank Statement)",
    "description": "Cancelled cheque or bank statement showing business name, account number, and IFSC code.",
    "mandatory": true,
    "condition_rule": null,
    "source": "GSTN Portal Guidelines"
  },
  {
    "id": 4805,
    "service_id": 48,
    "document_name": "Partnership Deed / RoC Certificate of Incorporation",
    "description": "Legal charter document establishing partnership firm, LLP, or private limited company.",
    "mandatory": false,
    "condition_rule": "Mandatory for all business constitutions other than sole proprietorship.",
    "source": "Ministry of Corporate Affairs"
  },
  {
    "id": 4806,
    "service_id": 48,
    "document_name": "Board Resolution / Letter of Authorization for Signatory",
    "description": "Formal resolution or authorization letter appointing the authorized tax signatory.",
    "mandatory": false,
    "condition_rule": "Mandatory for Companies, LLPs, and Society/Trust registrations.",
    "source": "CBIC Guidelines"
  },
  {
    "id": 4901,
    "service_id": 49,
    "document_name": "12-Digit Universal Account Number (UAN)",
    "description": "Permanent UAN assigned by EPFO linked to member mobile number.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Employees Provident Fund Organisation (epfindia.gov.in)"
  },
  {
    "id": 4902,
    "service_id": 49,
    "document_name": "Aadhaar Card (Linked with UAN & Active Mobile for OTP)",
    "description": "Aadhaar card seeded with UAN enabling paperless OTP authentication for claims.",
    "mandatory": true,
    "condition_rule": null,
    "source": "EPFO Unified Member Portal"
  },
  {
    "id": 4903,
    "service_id": 49,
    "document_name": "PAN Card of Member",
    "description": "PAN card uploaded and verified in member profile to prevent high TDS deduction on PF withdrawals.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Income Tax Act Section 192A / EPFO Directive"
  },
  {
    "id": 4904,
    "service_id": 49,
    "document_name": "Bank Passbook / Cancelled Cheque with Printed Name & IFSC",
    "description": "Original bank cheque displaying member printed name, active savings account number, and IFSC code.",
    "mandatory": true,
    "condition_rule": null,
    "source": "EPFO Claim Settlement Guidelines"
  },
  {
    "id": 4905,
    "service_id": 49,
    "document_name": "Joint Declaration Form signed by Employer and Employee",
    "description": "Prescribed joint declaration form supported by school marksheets and appointment records.",
    "mandatory": false,
    "condition_rule": "Mandatory for correcting demographic errors in member name, father name, or date of joining/exit.",
    "source": "EPFO Standard Operating Procedure"
  },
  {
    "id": 4906,
    "service_id": 49,
    "document_name": "Aadhaar Card & Photo of Nominee",
    "description": "Identity proof of designated family nominee for statutory e-Nomination under EDLI life insurance and EPS pension.",
    "mandatory": false,
    "condition_rule": "Required to complete statutory e-Nomination for survivor pension and life insurance cover.",
    "source": "EPFO E-Nomination Manual"
  },
  {
    "id": 5001,
    "service_id": 50,
    "document_name": "PAN Card of Employer / Factory Enterprise",
    "description": "Taxation identity proof of the business establishment registering under ESIC Act.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Employees State Insurance Corporation (esic.gov.in)"
  },
  {
    "id": 5002,
    "service_id": 50,
    "document_name": "Establishment Commercial Address Proof",
    "description": "Electricity bill, registered tenancy agreement, or factory licence showing operating address.",
    "mandatory": true,
    "condition_rule": null,
    "source": "ESIC Registration Manual"
  },
  {
    "id": 5003,
    "service_id": 50,
    "document_name": "Bank Account Passbook / Cancelled Cheque with IFSC",
    "description": "Bank account verification details of employer entity.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Shram Suvidha Portal"
  },
  {
    "id": 5004,
    "service_id": 50,
    "document_name": "Employee Roster with Aadhaar & Wage Records (<= ₹21,000/mo)",
    "description": "Register of workers detailing names, Aadhaar numbers, date of appointment, and gross wages under threshold.",
    "mandatory": true,
    "condition_rule": null,
    "source": "ESIC Act 1948"
  },
  {
    "id": 5005,
    "service_id": 50,
    "document_name": "Family Photographs of Insured Person (IP)",
    "description": "Passport size photographs of employee and dependants (spouse, children, dependent parents) for e-Pehchan card.",
    "mandatory": false,
    "condition_rule": "Required to generate family e-Pehchan smart card for cashless treatment at ESI Dispensaries and Hospitals.",
    "source": "ESIC Medical Benefits Manual"
  },
  {
    "id": 5101,
    "service_id": 51,
    "document_name": "One Time Registration (OTR) Number & Aadhaar Card of Student",
    "description": "Valid 14-digit OTR generated on NSP along with biometric Aadhaar card.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Scholarship Portal (NSP) (scholarships.gov.in)"
  },
  {
    "id": 5102,
    "service_id": 51,
    "document_name": "Bonafide Student Certificate signed by College Principal / Dean",
    "description": "Institutional bonafide certificate on college letterhead verifying full-time regular enrollment and AISHE code.",
    "mandatory": true,
    "condition_rule": null,
    "source": "NSP Central Sector Scheme Guidelines"
  },
  {
    "id": 5103,
    "service_id": 51,
    "document_name": "Previous Qualifying Examination Marksheet (> 80th Percentile)",
    "description": "Official marksheet of Class 12 board examination or previous degree confirming merit eligibility.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Department of Higher Education Guidelines"
  },
  {
    "id": 5104,
    "service_id": 51,
    "document_name": "Current Financial Year Parental Income Certificate (< INR 4.5 Lakhs)",
    "description": "Official income certificate issued by competent revenue authority (Tahsildar) confirming parental income ceiling.",
    "mandatory": true,
    "condition_rule": null,
    "source": "Ministry of Education Directive"
  },
  {
    "id": 5105,
    "service_id": 51,
    "document_name": "Aadhaar-Seeded Bank Passbook (NPCI DBT Active)",
    "description": "Copy of bank passbook showing student name, single account number, and active NPCI DBT mapping.",
    "mandatory": true,
    "condition_rule": null,
    "source": "National Scholarship Portal Direct Benefit Transfer Rules"
  },
  {
    "id": 5106,
    "service_id": 51,
    "document_name": "Caste Certificate / Minority Community Affidavit",
    "description": "Community certificate recognizing SC, ST, OBC, or Central Minority category.",
    "mandatory": false,
    "condition_rule": "Required when applying under Central Sector Minority, Tribal, or Social Justice scholarship schemes.",
    "source": "Ministry of Minority Affairs / Social Justice"
  },
  {
    "id": 5107,
    "service_id": 51,
    "document_name": "Unique Disability ID (UDID Card)",
    "description": "Government disability identity card confirming 40%+ permanent benchmark disability.",
    "mandatory": false,
    "condition_rule": "Mandatory if student is applying under the Central Sector Scholarship for Students with Disabilities.",
    "source": "Department of Empowerment of Persons with Disabilities"
  }
];
