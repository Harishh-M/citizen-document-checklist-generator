import fs from 'fs';
import path from 'path';

// Existing 1 to 26 services are preserved from previous step
import { ALL_SERVICES as EXISTING_SERVICES, ALL_DOCUMENTS as EXISTING_DOCUMENTS } from '../config/serviceData.js';

const NEW_SERVICES = [
  // 27. Domicile Certificate (Permanent Resident Certificate) (State)
  {
    id: 27,
    service_name: 'Domicile Certificate (Permanent Resident Certificate)',
    department: 'Department of Revenue & District Administration (State)',
    description: 'Official statutory certification proving permanent resident status in the state by birth, ancestral heritage, or continuous 5-10 year domicile for state quota educational admissions and government recruitment.',
    eligibility: 'Citizen having permanent domicile in the state or continuous verifiable residence for the statutory period (typically 5 to 7 years) with ancestral ties.',
    procedure_steps: '1. Online application via State e-District / e-Seva portal. 2. Field inquiry by Village Administrative Officer (VAO) and Revenue Inspector. 3. Final digital approval by Tahsildar.',
    source: 'National Portal of India - Domicile / PRC Services (services.india.gov.in)',
    last_updated: '2026-08-20',
    jurisdiction: 'State'
  },
  // 28. Character Certificate (State)
  {
    id: 28,
    service_name: 'Character Certificate',
    department: 'State Police Department / Executive Magistrate (State)',
    description: 'Statutory verification certificate issued after background police record and criminal antecedent check, essential for government employment, university admissions, and international visa clearances.',
    eligibility: 'Any resident citizen with clean criminal record and verifiable identity credentials within the police jurisdiction.',
    procedure_steps: '1. Apply online on State Police Citizen Portal. 2. Station House Officer (SHO) physical field inquiry and criminal database verification. 3. Digitally signed clearance issued by Superintendent of Police or Tahsildar.',
    source: 'State Police Citizen Services Portal (citizen.police.gov.in)',
    last_updated: '2026-08-15',
    jurisdiction: 'State'
  },
  // 29. Unemployment Certificate (State)
  {
    id: 29,
    service_name: 'Unemployment Certificate',
    department: 'Department of Revenue & District Administration (State)',
    description: 'Official certificate issued by the competent revenue authority certifying that the applicant is presently unemployed, required to claim government welfare allowances, exam fee waivers, and subsidized training loans.',
    eligibility: 'Educated youth or citizen who is currently not gainfully employed in government, public sector, or formal private employment.',
    procedure_steps: '1. Submit application with education credentials and non-employment affidavit. 2. VAO field inquiry and employment exchange cross-verification. 3. Certificate approval by Tahsildar.',
    source: 'State Revenue Department & Citizen Services Directorate',
    last_updated: '2026-07-28',
    jurisdiction: 'State'
  },
  // 30. Non-Creamy Layer Certificate (State)
  {
    id: 30,
    service_name: 'Non-Creamy Layer Certificate (OBC-NCL)',
    department: 'Department of Backward Classes Welfare & Revenue Administration (State)',
    description: 'Official statutory certificate certifying that an OBC applicant family annual income from non-agricultural sources does not exceed the creamy layer cap (INR 8 Lakhs per annum), granting eligibility for 27% Central/State OBC reservations.',
    eligibility: 'Applicant belonging to a recognized OBC community whose parental gross annual income is below INR 8,00,000 for the last 3 consecutive financial years, excluding agricultural income.',
    procedure_steps: '1. Submit Form along with 3-year parental income proof and community certificate. 2. Verification of parental employment category (Class I/II service status). 3. Issuance of NCL certificate by Tahsildar.',
    source: 'Ministry of Personnel, Public Grievances & Pensions (DoPT) / NCBC Guidelines (ncbc.nic.in)',
    last_updated: '2026-08-30',
    jurisdiction: 'State'
  },
  // 31. EWS Certificate (State)
  {
    id: 31,
    service_name: 'EWS Certificate (Economically Weaker Section)',
    department: 'Department of Revenue & Social Welfare (State)',
    description: 'Income and Asset Certificate granting 10% reservation in civil posts and educational admissions for Economically Weaker Sections among General Category citizens under the 103rd Constitutional Amendment.',
    eligibility: 'Citizen belonging to General Category (not covered under SC, ST, or OBC), gross family annual income below INR 8,00,000, and family not owning 5+ acres agricultural land or 1000+ sq ft residential flat.',
    procedure_steps: '1. Application submission with family asset and income details. 2. Revenue field inspection of residential premises and agricultural land. 3. Certificate issuance by Tahsildar or Sub-Divisional Magistrate.',
    source: 'Ministry of Social Justice and Empowerment - EWS Directive (socialjustice.gov.in)',
    last_updated: '2026-08-10',
    jurisdiction: 'State'
  },
  // 32. OBC Certificate (State)
  {
    id: 32,
    service_name: 'OBC Certificate',
    department: 'Department of Backward Classes & Most Backward Classes Welfare (State)',
    description: 'Statutory certificate confirming that an applicant belongs to an Other Backward Class (OBC) recognized in the State or Central OBC gazette list for affirmative action.',
    eligibility: 'Must belong to an eligible backward caste/community officially gazetted in the State/Central list.',
    procedure_steps: '1. Application submission with parental community documents. 2. Spot enquiry and caste ledger verification by VAO. 3. Issuance by Tahsildar.',
    source: 'National Commission for Backward Classes (NCBC) (ncbc.nic.in)',
    last_updated: '2026-08-01',
    jurisdiction: 'State'
  },
  // 33. SC Certificate (State)
  {
    id: 33,
    service_name: 'SC Certificate (Scheduled Caste)',
    department: 'Adi Dravidar and Tribal Welfare Department / Revenue Administration (State)',
    description: 'Constitutional certificate certifying membership in a Scheduled Caste community under the Constitution (Scheduled Castes) Order, essential for educational and employment reservations.',
    eligibility: 'Must belong to a recognized Scheduled Caste community as gazetted for the respective state.',
    procedure_steps: '1. Online submission with blood-relative SC certificate. 2. Field enquiry by Revenue Inspector and local village inspection. 3. Certificate approval by Tahsildar / Zonal Deputy Tahsildar.',
    source: 'Ministry of Social Justice & Empowerment (socialjustice.gov.in)',
    last_updated: '2026-08-05',
    jurisdiction: 'State'
  },
  // 34. ST Certificate (State)
  {
    id: 34,
    service_name: 'ST Certificate (Scheduled Tribe)',
    department: 'Tribal Welfare Department / Revenue Divisional Administration (State)',
    description: 'Statutory tribal identity certificate issued after stringent genealogical and anthropological verification, mandated by the Supreme Court of India.',
    eligibility: 'Citizen belonging to a notified Scheduled Tribe community residing in notified tribal or scheduled areas.',
    procedure_steps: '1. Application submission with ancestral revenue and school records. 2. Anthropological enquiry and District Vigilance Committee scrutiny. 3. Final issuance strictly by Revenue Divisional Officer (RDO) / Sub-Collector.',
    source: 'Ministry of Tribal Affairs - Guidelines for ST Verification (tribal.nic.in)',
    last_updated: '2026-08-12',
    jurisdiction: 'State'
  },
  // 35. Disability Certificate / UDID Card (Central)
  {
    id: 35,
    service_name: 'Disability Certificate / UDID Card',
    department: 'Department of Empowerment of Persons with Disabilities, Ministry of Social Justice (Central)',
    description: 'National biometric-enabled Unique Disability ID (UDID) Card creating a single verifiable digital document for persons with disabilities across all states and central welfare ministries.',
    eligibility: 'Any citizen having 40% or more permanent benchmark disability certified by a government district hospital medical board.',
    procedure_steps: '1. Register online on Swavlamban Portal (swavlambancard.gov.in). 2. Attend medical board clinical evaluation at assigned District Civil Hospital. 3. Assessment, percentage certification, and postal dispatch of plastic UDID Card.',
    source: 'Swavlamban Portal - DEPwD, Government of India (swavlambancard.gov.in)',
    last_updated: '2026-08-25',
    jurisdiction: 'Central'
  },
  // 36. Senior Citizen Certificate (State)
  {
    id: 36,
    service_name: 'Senior Citizen Certificate',
    department: 'Department of Social Welfare & District Collectorate (State)',
    description: 'Official identity card issued to elderly citizens aged 60 years or above, enabling priority queueing, transport fare concessions, healthcare packages, and state welfare allowances.',
    eligibility: 'Resident citizen who has completed 60 years of age on or before the date of application.',
    procedure_steps: '1. Submit application with proof of age and residential proof. 2. Verification of civil age credentials. 3. Issuance of laminated Senior Citizen ID Card.',
    source: 'Ministry of Social Justice & State Senior Citizen Welfare Code',
    last_updated: '2026-07-15',
    jurisdiction: 'State'
  },
  // 37. Solvency Certificate (State)
  {
    id: 37,
    service_name: 'Solvency Certificate',
    department: 'Department of Revenue & Land Administration (State)',
    description: 'Official certificate assessing and certifying the net financial worth and property solvency of an individual or firm, essential for executing government public works contracts, tenders, and court bails.',
    eligibility: 'Citizen or business owning undisputed, unencumbered immovable properties evaluated by authorized revenue/engineering valuers.',
    procedure_steps: '1. Submit property registered deeds, EC, and valuation report. 2. Revenue Inspector site inspection and encumbrance check. 3. Solvency sanction by Tahsildar or District Collector.',
    source: 'State Revenue Standing Orders - Solvency Rules',
    last_updated: '2026-08-04',
    jurisdiction: 'State'
  },
  // 38. Encumbrance Certificate (Property EC) (State)
  {
    id: 38,
    service_name: 'Encumbrance Certificate (Property EC)',
    department: 'Department of Registration & Stamps / Inspector General of Registration (State)',
    description: 'Official record issued in Form 15 or 16 documenting all registered legal transactions, sales, mortgages, leases, or court attachments on a specified parcel of property over a defined time period (up to 30+ years).',
    eligibility: 'Any property owner, prospective buyer, legal heir, or financial institution seeking property transaction history.',
    procedure_steps: '1. Search property via Survey Number, Sub-division, and Sub-Registrar Office (SRO) on State Registration portal. 2. Online search fee payment. 3. Digitally signed Form 15 EC download.',
    source: 'Inspector General of Registration & Stamps Portal (igreg.gov.in)',
    last_updated: '2026-08-22',
    jurisdiction: 'State'
  },
  // 39. Land Patta / Patta Transfer (State)
  {
    id: 39,
    service_name: 'Land Patta / Patta Transfer',
    department: 'Department of Revenue & Survey and Settlement (State)',
    description: 'Official land title deed record issued by the Revenue Department recording the legal owner of an agricultural or residential land plot, including transfer/mutation of patta following purchase or inheritance.',
    eligibility: 'Legal purchaser, gift recipient, or lawful heir of a registered land parcel with valid registered title deeds.',
    procedure_steps: '1. Submit Patta Transfer application on State Land Records / e-Services portal. 2. Field survey and subdivision verification by Village Surveyor. 3. Tahsildar approval and generation of updated digital Patta.',
    source: 'Directorate of Survey and Land Records (eservices.tn.gov.in / state land portal)',
    last_updated: '2026-08-18',
    jurisdiction: 'State'
  },
  // 40. Land Ownership / Chitta / Adangal (State)
  {
    id: 40,
    service_name: 'Land Ownership / Chitta / Adangal',
    department: 'Department of Revenue & Land Administration (State)',
    description: 'Certified extract of Village Revenue Register specifying land classification (Wet/Dry), survey number, extent in hectares, revenue tax assessment (Chitta), and seasonal crop cultivation details (Adangal).',
    eligibility: 'Landholding farmer, property owner, or agricultural loan applicant.',
    procedure_steps: '1. Select District, Taluk, Village, and Survey Number on State Land Records Portal. 2. Instant verification against digitised revenue database. 3. Instant download of digitally certified Chitta/Adangal extract.',
    source: 'AnyROR / Tamil Nilam / MeeBhoomi / Bhulekh State Land Portals',
    last_updated: '2026-08-14',
    jurisdiction: 'State'
  },
  // 41. Property Tax Payment (Local/State)
  {
    id: 41,
    service_name: 'Property Tax Payment & Assessment',
    department: 'Directorate of Municipal Administration / Urban Local Bodies (Local/State)',
    description: 'Annual municipal property tax assessment and statutory tax receipt payment for residential, commercial, or industrial buildings within Municipal Corporation, Municipality, or Town Panchayat limits.',
    eligibility: 'Owner or lawful occupant of any building or vacant land within the urban local body jurisdiction.',
    procedure_steps: '1. Enter Property Assessment Number or Door Number on Urban Local Body portal. 2. Verify annual rental value, plinth area, and tax dues. 3. Pay online via payment gateway and generate receipt.',
    source: 'Directorate of Municipal Administration Citizen Services Portal',
    last_updated: '2026-07-30',
    jurisdiction: 'State'
  },
  // 42. Building Plan Approval (Local/State)
  {
    id: 42,
    service_name: 'Building Plan Approval',
    department: 'Town & Country Planning Directorate / Municipal Planning Authority (Local/State)',
    description: 'Statutory planning permission and building permit required prior to undertaking any residential, commercial, or industrial construction under the Town and Country Planning Act and Municipal Building By-Laws.',
    eligibility: 'Landowner or authorized builder with clear legal title, patta, and proposed architectural drawings compliant with Floor Space Index (FSI) regulations.',
    procedure_steps: '1. Online application via Single Window Building Approval Portal. 2. Automated scrutiny of AutoCAD drawings by scrutiny engine. 3. Site inspection by Town Planning Officer and permit issuance.',
    source: 'Directorate of Town and Country Planning (DTCP) Single Window Portal',
    last_updated: '2026-08-08',
    jurisdiction: 'State'
  },
  // 43. Trade Licence (Local Body)
  {
    id: 43,
    service_name: 'Trade Licence',
    department: 'Municipal Corporation / Town Panchayat Health Department (Local Body)',
    description: 'Mandatory municipal operational licence certifying that a commercial business, retail shop, food outlet, or trade establishment complies with public health, safety, and fire norms within local body limits.',
    eligibility: 'Any business operator, retailer, hotelier, or trader establishing commercial activity within municipal boundaries.',
    procedure_steps: '1. Apply online via Urban Local Body Trade Portal. 2. Sanitary Inspector / Health Officer site inspection. 3. Payment of trade fee and digital issuance of Trade Licence certificate.',
    source: 'Municipal Corporation Public Health & Trade Licence Regulations',
    last_updated: '2026-07-22',
    jurisdiction: 'State'
  },
  // 44. Shop & Establishment Registration (State)
  {
    id: 44,
    service_name: 'Shop & Establishment Registration',
    department: 'Department of Labour & Employment (State)',
    description: 'Statutory registration of shops, commercial establishments, software/IT companies, and restaurants regulating employment conditions, work hours, wage payments, and worker safety under the State Shops and Establishments Act.',
    eligibility: 'Any employer or enterprise opening a commercial premises or engaging employees in commercial operations.',
    procedure_steps: '1. File Form-A online on State Labour Single Window Portal. 2. Upload employer identity, establishment photos, and employee roster. 3. Instant auto-generation of Form-C Registration Certificate.',
    source: 'State Labour Department Single Window Portal (labour.gov.in)',
    last_updated: '2026-08-16',
    jurisdiction: 'State'
  },
  // 45. Professional Tax Registration (State)
  {
    id: 45,
    service_name: 'Professional Tax Registration',
    department: 'Commercial Taxes Department / Municipal Corporation (State)',
    description: 'Statutory tax registration required for employers, self-employed professionals (doctors, lawyers, chartered accountants, architects), and traders paying half-yearly professional tax under State Municipal Acts.',
    eligibility: 'Any professional carrying on business, trade, or profession, and every employer employing salaried staff within the state.',
    procedure_steps: '1. Online enrolment via Commercial Taxes / Municipal Corporation Portal. 2. Entry of turnover or employee salary tiers. 3. Generation of Professional Tax Assessment Certificate.',
    source: 'State Commercial Taxes & Municipal Professional Tax Directorate',
    last_updated: '2026-07-10',
    jurisdiction: 'State'
  },
  // 46. Factory Licence (State)
  {
    id: 46,
    service_name: 'Factory Licence',
    department: 'Directorate of Industrial Safety and Health (DISH) / Chief Inspector of Factories (State)',
    description: 'Statutory manufacturing licence issued under the Factories Act 1948 ensuring occupational health, safety, machinery safeguards, and welfare facilities for manufacturing units employing 10+ workers with power (or 20+ without power).',
    eligibility: 'Manufacturing enterprise meeting statutory employee threshold and power consumption criteria.',
    procedure_steps: '1. Submit plant layout drawings and Form-1 for site clearance on Single Window Portal. 2. Industrial safety inspection by Joint Director of Industrial Safety. 3. Grant of Form-4 Factory Licence.',
    source: 'Directorate of Industrial Safety and Health (DISH) (dish.gov.in)',
    last_updated: '2026-07-29',
    jurisdiction: 'State'
  },
  // 47. FSSAI Food Business Licence (Central/State)
  {
    id: 47,
    service_name: 'FSSAI Food Business Licence',
    department: 'Food Safety and Standards Authority of India (FSSAI), MoHFW (Central/State)',
    description: 'Mandatory 14-digit food licence/registration issued under the Food Safety and Standards Act 2006 regulating the manufacture, storage, distribution, sale, and import of food items to ensure food safety.',
    eligibility: 'Any Food Business Operator (FBO), petty hawker, restaurant, cloud kitchen, food manufacturer, or dairy processing unit.',
    procedure_steps: '1. Online submission on Food Safety Compliance System (FoSCoS - foscos.fssai.gov.in). 2. Food Safety Officer (FSO) physical inspection of kitchen/plant. 3. Issuance of 14-digit FSSAI Licence with QR code.',
    source: 'Food Safety and Standards Authority of India - FoSCoS (foscos.fssai.gov.in)',
    last_updated: '2026-09-03',
    jurisdiction: 'State/Central'
  },
  // 48. GST Registration (Central)
  {
    id: 48,
    service_name: 'GST Registration (GSTIN)',
    department: 'Goods and Services Tax Network (GSTN) / CBIC, Ministry of Finance (Central)',
    description: 'Mandatory 15-digit alphanumeric Goods and Services Tax Identification Number (GSTIN) issued to businesses engaged in intra-state or inter-state supply of goods and services exceeding turnover thresholds.',
    eligibility: 'Businesses with aggregate turnover exceeding INR 40 Lakhs (goods) or INR 20 Lakhs (services), e-commerce sellers, or inter-state taxable suppliers.',
    procedure_steps: '1. Submit Part A & B of Form GST REG-01 on GST Common Portal (gst.gov.in). 2. Complete Aadhaar biometric/OTP authentication. 3. System approval and generation of Form GST REG-06 Registration Certificate.',
    source: 'Goods and Services Tax Network (GSTN) (gst.gov.in)',
    last_updated: '2026-09-01',
    jurisdiction: 'Central'
  },
  // 49. EPFO / PF Account Services (Central)
  {
    id: 49,
    service_name: 'EPFO / PF Account Services',
    department: 'Employees Provident Fund Organisation (EPFO), Ministry of Labour (Central)',
    description: 'Central social security services managing retirement savings, employee pension scheme (EPS), provident fund withdrawals, advance advances, and e-Nomination for formal sector workers.',
    eligibility: 'Salaried employees working in establishments with 20 or more persons earning up to INR 15,000/month (or voluntary coverage).',
    procedure_steps: '1. Log into EPFO Member Unified Portal with UAN and password. 2. Verify KYC (Aadhaar, PAN, Bank IFSC). 3. Submit online PF transfer, advance, or settlement claim with Aadhaar OTP authentication.',
    source: 'Employees Provident Fund Organisation - Member Unified Portal (epfindia.gov.in)',
    last_updated: '2026-08-26',
    jurisdiction: 'Central'
  },
  // 50. ESIC Registration / Services (Central)
  {
    id: 50,
    service_name: 'ESIC Registration / Services',
    department: 'Employees State Insurance Corporation (ESIC), Ministry of Labour (Central)',
    description: 'Statutory social security and health insurance scheme providing comprehensive medical care, sickness benefits, maternity benefits, and disablement benefits to insured employees and their dependants.',
    eligibility: 'Employees in factories and commercial establishments with 10 or more workers earning gross wages up to INR 21,000 per month (INR 25,000 for PwD).',
    procedure_steps: '1. Employer registers unit online on Shram Suvidha / ESIC portal. 2. Enrol employees with Aadhaar and family details. 3. Generation of biometric e-Pehchan Card for cashless hospital treatment.',
    source: 'Employees State Insurance Corporation Portal (esic.gov.in)',
    last_updated: '2026-08-19',
    jurisdiction: 'Central'
  },
  // 51. National Scholarship Application (Central)
  {
    id: 51,
    service_name: 'National Scholarship Application (Central Sector / NSP)',
    department: 'Ministry of Electronics & Information Technology / Department of Higher Education (Central)',
    description: 'Central sector and centrally sponsored scholarships implemented on the National Scholarship Portal (NSP) providing full fee reimbursement and monthly stipends for college and university students.',
    eligibility: 'Meritorious students scoring above 80th percentile in Class 12 board examinations enrolled in recognized higher educational institutions, parental income below INR 4.5 Lakhs.',
    procedure_steps: '1. Student One-Time Registration (OTR) via NSP portal. 2. Application submission and online document upload. 3. Dual-level institutional nodal officer and state officer e-verification, followed by DBT disbursement.',
    source: 'National Scholarship Portal (NSP) - Ministry of Electronics & IT (scholarships.gov.in)',
    last_updated: '2026-08-11',
    jurisdiction: 'Central'
  }
];

const NEW_DOCUMENTS = [
  // Service 27: Domicile Certificate (PRC)
  { id: 2701, service_id: 27, document_name: 'Aadhaar Card of Applicant', description: '12-digit biometrically authenticated identity card verifying applicant name and demographic record.', mandatory: true, condition_rule: null, source: 'National Portal of India (services.india.gov.in)' },
  { id: 2702, service_id: 27, document_name: 'Proof of Continuous Residence (5 to 10 Years)', description: 'Continuous documentary proof like Land Tax receipts, Voter List extracts, or Electricity Bills for minimum continuous statutory duration.', mandatory: true, condition_rule: null, source: 'State Domicile Rules Manual' },
  { id: 2703, service_id: 27, document_name: 'School Transfer Certificate (TC) / Educational Proofs', description: 'School/College TC or study certificates confirming continuous schooling in the state from primary to higher secondary level.', mandatory: true, condition_rule: null, source: 'State Education & Revenue Guidelines' },
  { id: 2704, service_id: 27, document_name: 'Parents Domicile Certificate or Ancestral Land Deed', description: 'Certified domicile certificate of father/mother or registered title deed showing ancestral family roots.', mandatory: false, condition_rule: 'Mandatory if applicant claims domicile through parental ancestral origin rather than personal continuous residence.', source: 'Revenue Department Standing Orders' },
  { id: 2705, service_id: 27, document_name: 'Notarized Domicile Self-Affidavit', description: 'Sworn affidavit signed before an Executive Magistrate or Notary Public affirming permanent intention to reside in the state.', mandatory: true, condition_rule: null, source: 'State e-District Manual' },

  // Service 28: Character Certificate
  { id: 2801, service_id: 28, document_name: 'Proof of Identity (Aadhaar / Voter ID / Passport)', description: 'Government photo identification document confirming identity without discrepancies.', mandatory: true, condition_rule: null, source: 'State Police Citizen Services Portal (citizen.police.gov.in)' },
  { id: 2802, service_id: 28, document_name: 'Proof of Residential Address (Utility Bill / Rent Agreement)', description: 'Valid address proof showing continuous residence within the local police station jurisdiction for at least 1 year.', mandatory: true, condition_rule: null, source: 'State Police Citizen Charter' },
  { id: 2803, service_id: 28, document_name: 'Passport Size Colour Photographs (3 Copies)', description: 'Recent colour photographs with clear facial exposure.', mandatory: true, condition_rule: null, source: 'State Police Department Guidelines' },
  { id: 2804, service_id: 28, document_name: 'Letter of Intent / Requisition from Employer or Embassy', description: 'Formal letter requesting character verification issued by government recruiter, embassy, or public agency.', mandatory: false, condition_rule: 'Required if character verification is specifically demanded for overseas visa, defense, or PSU employment.', source: 'Police Verification Guidelines' },
  { id: 2805, service_id: 28, document_name: 'Character Reference Letters from Two Gazetted Officers', description: 'Signed certificates of good moral character from two respectable gazetted officers or ward councilors not related to applicant.', mandatory: false, condition_rule: 'Required when applying through Executive Magistrate or District Collectorate channels.', source: 'Executive Magistrate Code' },

  // Service 29: Unemployment Certificate
  { id: 2901, service_id: 29, document_name: 'Aadhaar Card of Applicant', description: 'Personal biometric identity document verifying citizen age and residence.', mandatory: true, condition_rule: null, source: 'Department of Revenue & District Administration' },
  { id: 2902, service_id: 29, document_name: 'Educational Certificates (SSLC / HSC / Degree)', description: 'Original educational marksheets and degree certificates establishing highest qualification attained.', mandatory: true, condition_rule: null, source: 'Directorate of Employment Guidelines' },
  { id: 2903, service_id: 29, document_name: 'State Employment Exchange Live Registration Card', description: 'Live registration card showing continuous active enrollment on the National Career Service (NCS) or state exchange.', mandatory: true, condition_rule: null, source: 'State Employment Directorate' },
  { id: 2904, service_id: 29, document_name: 'Notarized Affidavit of Non-Employment', description: 'Sworn affidavit affirmed on non-judicial stamp paper stating applicant does not hold any formal public or private salaried job.', mandatory: true, condition_rule: null, source: 'State Revenue Manual' },
  { id: 2905, service_id: 29, document_name: 'Family Smart Ration Card', description: 'Civil supplies ration card showing household composition and dependent status.', mandatory: true, condition_rule: null, source: 'Department of Food & Civil Supplies' },

  // Service 30: Non-Creamy Layer Certificate (OBC-NCL)
  { id: 3001, service_id: 30, document_name: 'Aadhaar Card of Applicant', description: 'Biometric identity card verifying personal demographic data.', mandatory: true, condition_rule: null, source: 'Ministry of Personnel, Public Grievances & Pensions (DoPT)' },
  { id: 3002, service_id: 30, document_name: 'Father or Mother Community Certificate (OBC)', description: 'State-issued community certificate proving parent belongs to an eligible backward class recognized in central/state lists.', mandatory: true, condition_rule: null, source: 'National Commission for Backward Classes (NCBC)' },
  { id: 3003, service_id: 30, document_name: 'Parents Income Proof for Last 3 Financial Years (ITR / Form 16 / Salary Slip)', description: 'Income Tax Returns, Form 16, or salary statements proving gross non-agricultural parental income is under INR 8 Lakhs/year.', mandatory: true, condition_rule: null, source: 'DoPT Creamy Layer Exclusion Guidelines' },
  { id: 3004, service_id: 30, document_name: 'Agricultural Landholding Certificate from Tahsildar', description: 'Revenue certificate verifying agricultural landholding does not exceed the statutory ceiling limit.', mandatory: false, condition_rule: 'Required if parents own agricultural land to substantiate exclusion from creamy layer wealth criteria.', source: 'Revenue Department Circular' },
  { id: 3005, service_id: 30, document_name: 'Self-Declaration Affidavit of Non-Creamy Layer Status', description: 'Standard Annexure affidavit declaring family does not fall in the creamy layer as defined in DoPT OM No. 36012/22/93.', mandatory: true, condition_rule: null, source: 'Ministry of Social Justice & Empowerment' },
  { id: 3006, service_id: 30, document_name: 'Family Smart Ration Card', description: 'Civil supplies card validating parentage and family living composition.', mandatory: true, condition_rule: null, source: 'State Revenue Department' },

  // Service 31: EWS Certificate
  { id: 3101, service_id: 31, document_name: 'Aadhaar Cards of Applicant and All Family Members', description: 'Biometric identity cards of all co-inhabiting family members for national verification.', mandatory: true, condition_rule: null, source: 'Ministry of Social Justice and Empowerment (socialjustice.gov.in)' },
  { id: 3102, service_id: 31, document_name: 'Gross Annual Family Income Certificate (< INR 8 Lakhs)', description: 'Revenue income certificate proving total family earnings from all sources is below INR 8 Lakhs for the preceding financial year.', mandatory: true, condition_rule: null, source: 'EWS Reservation Office Memorandum 2019' },
  { id: 3103, service_id: 31, document_name: 'Agricultural Landholding Records / Patta', description: 'Land records proving family does not own 5 acres or more of agricultural land anywhere in India.', mandatory: true, condition_rule: null, source: 'Revenue Department EWS Guidelines' },
  { id: 3104, service_id: 31, document_name: 'Residential Flat / Plot Area Certificate', description: 'Property documents confirming residential flat is under 1,000 sq ft or residential plot is under 100/200 sq yards.', mandatory: true, condition_rule: null, source: 'EWS Verification Manual' },
  { id: 3105, service_id: 31, document_name: 'Self-Declaration of Non-Coverage under SC/ST/OBC', description: 'Sworn affidavit affirming applicant belongs to General Category and is not eligible for SC, ST, or OBC reservation.', mandatory: true, condition_rule: null, source: 'Ministry of Social Justice' },
  { id: 3106, service_id: 31, document_name: 'Bank Statements of All Earning Family Members (1 Year)', description: 'Bank account statements showing financial flows of family members.', mandatory: false, condition_rule: 'Required if family members have informal or business income without formal ITR filings.', source: 'Revenue Department Circular' },

  // Service 32: OBC Certificate
  { id: 3201, service_id: 32, document_name: 'Aadhaar Card of Applicant', description: 'Government photo identification document establishing applicant legal identity and name.', mandatory: true, condition_rule: null, source: 'National Commission for Backward Classes (NCBC)' },
  { id: 3202, service_id: 32, document_name: 'School Transfer Certificate (TC) Recording OBC Community', description: 'School or college TC explicitly recording the community and sub-caste recorded at the time of admission.', mandatory: true, condition_rule: null, source: 'State Backward Classes Welfare Department' },
  { id: 3203, service_id: 32, document_name: 'Father or Blood Relative OBC Community Certificate', description: 'Community certificate of father, real brother, sister, or paternal grandfather issued by revenue authority.', mandatory: true, condition_rule: null, source: 'State Revenue Manual' },
  { id: 3204, service_id: 32, document_name: 'Family Smart Ration Card', description: 'State civil supplies smart card establishing genealogical relationship to certified relatives.', mandatory: true, condition_rule: null, source: 'Department of Food & Civil Supplies' },
  { id: 3205, service_id: 32, document_name: 'Local VAO / Village Administrative Verification Report', description: 'Field enquiry report confirming long-standing local community status.', mandatory: false, condition_rule: 'Required if blood relative certificates were issued in another district or state jurisdiction.', source: 'State Revenue Department' },

  // Service 33: SC Certificate
  { id: 3301, service_id: 33, document_name: 'Aadhaar Card of Applicant', description: 'Biometric identity card verifying personal identity and residential location.', mandatory: true, condition_rule: null, source: 'Ministry of Social Justice & Empowerment' },
  { id: 3302, service_id: 33, document_name: 'School Leaving Certificate / TC with SC Entry', description: 'School TC recording the Scheduled Caste community of applicant at initial primary schooling.', mandatory: true, condition_rule: null, source: 'Adi Dravidar & Tribal Welfare Department' },
  { id: 3303, service_id: 33, document_name: 'Father or Real Sibling SC Community Certificate', description: 'Permanent community certificate of paternal family members issued by competent Tahsildar.', mandatory: true, condition_rule: null, source: 'State Revenue Administration Code' },
  { id: 3304, service_id: 33, document_name: 'Family Smart Ration Card', description: 'Ration card confirming applicant family composition and parental lineage.', mandatory: true, condition_rule: null, source: 'Department of Food & Civil Supplies' },
  { id: 3305, service_id: 33, document_name: 'Revenue Inspector Spot Enquiry Report', description: 'Formal inquiry report validating hereditary community status in native habitation.', mandatory: false, condition_rule: 'Required in absence of direct parental certificates or upon interstate migration.', source: 'Social Welfare Department Guidelines' },

  // Service 34: ST Certificate
  { id: 3401, service_id: 34, document_name: 'Aadhaar Card of Applicant', description: 'Biometric identity document establishing applicant identity and tribal area residence.', mandatory: true, condition_rule: null, source: 'Ministry of Tribal Affairs (tribal.nic.in)' },
  { id: 3402, service_id: 34, document_name: 'Paternal Blood Relative ST Certificate (RDO Issued)', description: 'Statutory ST certificate of father, paternal uncle, or grandfather issued strictly by Sub-Collector / RDO.', mandatory: true, condition_rule: null, source: 'Supreme Court Mandate on ST Issuance' },
  { id: 3403, service_id: 34, document_name: 'Primary School Admission Register Extract', description: 'Certified extract of early school admission register recording hereditary tribal classification.', mandatory: true, condition_rule: null, source: 'State Tribal Welfare Directorate' },
  { id: 3404, service_id: 34, document_name: 'District Vigilance Committee Anthropological Scrutiny Report', description: 'Comprehensive anthropological scrutiny report verifying ethnic customs, dialect, and tribal roots.', mandatory: true, condition_rule: null, source: 'State Level Scrutiny Committee Guidelines' },
  { id: 3405, service_id: 34, document_name: 'Family Smart Ration Card', description: 'Civil supplies smart card proving family genealogical ties to certified tribal elders.', mandatory: true, condition_rule: null, source: 'Department of Civil Supplies' },
  { id: 3406, service_id: 34, document_name: 'Forest / Tribal Habitation Domicile Certificate', description: 'Certificate from Forest Range Officer or Village Headman proving long-standing residence in scheduled tribal settlement.', mandatory: false, condition_rule: 'Mandatory if applicant resides within Scheduled Tribal Areas or hill tracts.', source: 'Ministry of Tribal Affairs' },

  // Service 35: Disability Certificate / UDID Card
  { id: 3501, service_id: 35, document_name: 'Aadhaar Card of Person with Disability', description: 'Biometric identity card required for digital e-KYC and national de-duplication on Swavlamban Portal.', mandatory: true, condition_rule: null, source: 'Department of Empowerment of Persons with Disabilities (swavlambancard.gov.in)' },
  { id: 3502, service_id: 35, document_name: 'Colour Photograph showing Visible Disability', description: 'Full length or frontal colour photograph clearly displaying visible physical disability condition.', mandatory: true, condition_rule: null, source: 'Swavlamban Portal Guidelines' },
  { id: 3503, service_id: 35, document_name: 'Medical Evaluation Report from Government Civil Hospital', description: 'Clinical assessment report issued by government district medical specialist detailing disability degree.', mandatory: true, condition_rule: null, source: 'Rights of Persons with Disabilities Act 2016' },
  { id: 3504, service_id: 35, document_name: 'Diagnostic Clinical Test Reports (Audiogram / IQ / MRI)', description: 'Specialized medical tests: Audiogram for hearing loss, IQ assessment for intellectual disability, or ophthalmic report for blindness.', mandatory: false, condition_rule: 'Mandatory for sensory, cognitive, intellectual, or non-visible neurological disabilities.', source: 'Medical Board Assessment Guidelines' },
  { id: 3505, service_id: 35, document_name: 'Proof of Residential Address (Voter ID / Ration Card / Electricity Bill)', description: 'Address verification document establishing residence in the medical district jurisdiction.', mandatory: true, condition_rule: null, source: 'DEPwD Guidelines' },

  // Service 36: Senior Citizen Certificate
  { id: 3601, service_id: 36, document_name: 'Aadhaar Card (Verifying Age 60+)', description: 'Biometric identity card confirming applicant has attained 60 years of age.', mandatory: true, condition_rule: null, source: 'Department of Social Welfare Citizen Charter' },
  { id: 3602, service_id: 36, document_name: 'Proof of Date of Birth (Birth Certificate / Passport / Voter ID)', description: 'Statutory age verification document establishing date of birth matching identity records.', mandatory: true, condition_rule: null, source: 'State Senior Citizen Rules' },
  { id: 3603, service_id: 36, document_name: 'Proof of Residence in the State (Ration Card / Utility Bill)', description: 'Document certifying continuous residence within the state.', mandatory: true, condition_rule: null, source: 'District Social Welfare Office' },
  { id: 3604, service_id: 36, document_name: 'Blood Group Test Certificate', description: 'Medical laboratory report certifying blood group for emergency medical care recording.', mandatory: true, condition_rule: null, source: 'State Senior Citizen Welfare Scheme' },
  { id: 3605, service_id: 36, document_name: 'Passport Size Colour Photographs (2 Copies)', description: 'Recent colour photographs for laminated identity pass issuance.', mandatory: true, condition_rule: null, source: 'Social Welfare Department' },

  // Service 37: Solvency Certificate
  { id: 3701, service_id: 37, document_name: 'Aadhaar Card & PAN Card of Applicant', description: 'Personal identity and income tax credentials of the applicant or firm partners.', mandatory: true, condition_rule: null, source: 'Department of Revenue & Land Administration' },
  { id: 3702, service_id: 37, document_name: 'Registered Sale Deeds / Title Deeds of Immovable Properties', description: 'Original registered deeds establishing absolute, undisputed ownership of properties offered for solvency evaluation.', mandatory: true, condition_rule: null, source: 'State Revenue Standing Orders' },
  { id: 3703, service_id: 37, document_name: 'Latest Encumbrance Certificate (EC) for 13 to 30 Years', description: 'Non-encumbrance certificate issued by Sub-Registrar verifying properties are free from mortgages or liens.', mandatory: true, condition_rule: null, source: 'Registration and Stamps Department' },
  { id: 3704, service_id: 37, document_name: 'Govt Approved Valuer / PWD Property Valuation Report', description: 'Certified property valuation report signed by government-registered valuer or PWD Executive Engineer.', mandatory: true, condition_rule: null, source: 'State Public Works & Revenue Guidelines' },
  { id: 3705, service_id: 37, document_name: 'Latest Property Tax / Land Revenue Tax Receipts', description: 'Recent tax receipts confirming no municipal or land tax arrears exist on the evaluated properties.', mandatory: true, condition_rule: null, source: 'Municipal Administration / Revenue Records' },
  { id: 3706, service_id: 37, document_name: 'Notarized Affidavit of Free Title and Non-Pledge', description: 'Sworn affidavit affirming properties are unencumbered, free from court attachments, and not pledged for other solvency guarantees.', mandatory: true, condition_rule: null, source: 'Revenue Department Code' },

  // Service 38: Encumbrance Certificate (Property EC)
  { id: 3801, service_id: 38, document_name: 'Registered Sale Deed / Title Document Copy', description: 'Copy of previous registered sale deed, settlement deed, or partition deed establishing property identity.', mandatory: true, condition_rule: null, source: 'Inspector General of Registration (igreg.gov.in)' },
  { id: 3802, service_id: 38, document_name: 'Accurate Property Schedule & Boundaries (North, South, East, West)', description: 'Complete four-sided boundary details, survey number, sub-division, plot number, and village name.', mandatory: true, condition_rule: null, source: 'State Registration Manual' },
  { id: 3803, service_id: 38, document_name: 'Aadhaar Card / Photo ID of Applicant', description: 'Government photo identification document of person seeking search records.', mandatory: true, condition_rule: null, source: 'Registration and Stamps Department' },
  { id: 3804, service_id: 38, document_name: 'Latest Property Tax Receipt / Municipal Assessment Number', description: 'Municipal assessment receipt connecting property to physical local body records.', mandatory: false, condition_rule: 'Recommended to verify house/door number linkages within urban local body limits.', source: 'Urban Local Body Guidelines' },

  // Service 39: Land Patta / Patta Transfer
  { id: 3901, service_id: 39, document_name: 'Registered Sale Deed / Settlement Deed in Applicant Name', description: 'Certified copy of registered conveyance deed registered at the Sub-Registrar Office transferring ownership.', mandatory: true, condition_rule: null, source: 'Department of Revenue & Survey and Settlement' },
  { id: 3902, service_id: 39, document_name: 'Previous Owner Patta Copy / Chitta Ledger Extract', description: 'Existing digital patta copy or village ledger record registered in vendor/ancestor name.', mandatory: true, condition_rule: null, source: 'State Land Records Directorate' },
  { id: 3903, service_id: 39, document_name: 'Encumbrance Certificate (EC) from Date of Purchase', description: 'Sub-Registrar EC verifying transaction registration and non-existence of third-party encumbrances.', mandatory: true, condition_rule: null, source: 'Inspector General of Registration' },
  { id: 3904, service_id: 39, document_name: 'FMB (Field Measurement Book) Sketch / Subdivision Map', description: 'Village cadastral map sketch depicting land dimensions, survey stones, and proposed subdivision line.', mandatory: false, condition_rule: 'Mandatory if patta transfer involves sub-division of a larger survey number.', source: 'Survey & Land Records Department' },
  { id: 3905, service_id: 39, document_name: 'Legal Heir Certificate & Consent NOC of Co-heirs', description: 'Statutory legal heir certificate and sworn consent affidavits.', mandatory: false, condition_rule: 'Mandatory if patta mutation is claimed by inheritance following demise of original registered owner.', source: 'Revenue Department Standing Orders' },
  { id: 3906, service_id: 39, document_name: 'Aadhaar Card of Applicant', description: 'Biometric identity credential for digital landholder linking.', mandatory: true, condition_rule: null, source: 'National Land Records Modernization Programme (NLRMP)' },

  // Service 40: Land Ownership / Chitta / Adangal
  { id: 4001, service_id: 40, document_name: 'Survey Number and Sub-Division Number Details', description: 'Accurate revenue survey number and sub-division as recorded in village revenue map.', mandatory: true, condition_rule: null, source: 'Directorate of Land Administration (eservices.tn.gov.in)' },
  { id: 4002, service_id: 40, document_name: 'Patta Number or Registered Landowner Name', description: 'Patta account number or registered titleholder name as recorded in the district revenue register.', mandatory: true, condition_rule: null, source: 'State Land Records Portal' },
  { id: 4003, service_id: 40, document_name: 'Aadhaar Card of Landowner', description: 'Identity verification document establishing lawful land ownership interest.', mandatory: true, condition_rule: null, source: 'National Portal of India' },
  { id: 4004, service_id: 40, document_name: 'Seasonal Crop Cultivation Declaration', description: 'Self-declaration of standing agricultural crops, irrigation source, and harvested yield.', mandatory: false, condition_rule: 'Required for Adangal crop entries when claiming agricultural insurance or crop disaster relief.', source: 'Department of Agriculture & Revenue' },

  // Service 41: Property Tax Payment & Assessment
  { id: 4101, service_id: 41, document_name: 'Property Assessment Number / Old Tax Receipt', description: 'Unique property identification code (PID) or receipt of previous half-year property tax settlement.', mandatory: true, condition_rule: null, source: 'Directorate of Municipal Administration' },
  { id: 4102, service_id: 41, document_name: 'Registered Title Deed / Sale Deed of Property', description: 'Registered deed proving legal ownership of the residential or commercial building.', mandatory: true, condition_rule: null, source: 'Urban Local Body Building By-Laws' },
  { id: 4103, service_id: 41, document_name: 'Sanctioned Building Plan Copy or Completion Certificate', description: 'Approved planning permit indicating sanctioned plinth area and structural floor details.', mandatory: false, condition_rule: 'Mandatory for fresh property tax assessment of newly constructed buildings.', source: 'Municipal Planning Authority' },
  { id: 4104, service_id: 41, document_name: 'Electricity Meter Service Connection Card / Bill', description: 'Recent electricity consumption bill showing consumer service connection number.', mandatory: true, condition_rule: null, source: 'State Electricity Board / Municipal Corporation' },
  { id: 4105, service_id: 41, document_name: 'Aadhaar Card of Property Owner', description: 'Identity proof of titleholder.', mandatory: true, condition_rule: null, source: 'Municipal Citizen Charter' },

  // Service 42: Building Plan Approval
  { id: 4201, service_id: 42, document_name: 'Registered Land Ownership Deed & Revenue Patta', description: 'Registered title deeds along with computerized revenue patta showing undisputed ownership of plot.', mandatory: true, condition_rule: null, source: 'Directorate of Town and Country Planning (DTCP)' },
  { id: 4202, service_id: 42, document_name: 'Architectural Blueprint Drawings signed by Registered Architect', description: 'Detailed floor plans, elevation, sectional views, site plan, and key plan drawn to metric scale.', mandatory: true, condition_rule: null, source: 'DTCP Building Scrutiny Manual' },
  { id: 4203, service_id: 42, document_name: 'Structural Stability Certificate from Licensed Structural Engineer', description: 'Certificate affirming structural design compliance with Indian Standard seismic and wind load codes.', mandatory: true, condition_rule: null, source: 'National Building Code of India (NBC)' },
  { id: 4204, service_id: 42, document_name: 'Encumbrance Certificate (EC) for Past 13 Years', description: 'Sub-Registrar EC proving plot is free from court attachments and mortgages.', mandatory: true, condition_rule: null, source: 'Registration and Stamps Department' },
  { id: 4205, service_id: 42, document_name: 'Fire and Rescue Services Department NOC', description: 'No Objection Certificate from state fire authority affirming compliance with emergency egress and hydrants.', mandatory: false, condition_rule: 'Mandatory for multi-storey buildings exceeding 15 meters in height, public assembly buildings, or commercial complexes.', source: 'State Fire Safety Directorate' },
  { id: 4206, service_id: 42, document_name: 'Pollution Control Board Consent to Establish (CTE)', description: 'Environmental clearance or CTE certificate from State Pollution Control Board.', mandatory: false, condition_rule: 'Mandatory for industrial developments or commercial projects generating significant effluent/sewage.', source: 'State Pollution Control Board' },

  // Service 43: Trade Licence
  { id: 4301, service_id: 43, document_name: 'Aadhaar Card & PAN Card of Proprietor / Partners', description: 'Personal identity and taxation documents of business owners.', mandatory: true, condition_rule: null, source: 'Municipal Corporation Public Health Department' },
  { id: 4302, service_id: 43, document_name: 'Commercial Premises Property Tax Receipt or Rent Agreement', description: 'Municipal property tax receipt of owned commercial shop or notarized tenancy lease agreement.', mandatory: true, condition_rule: null, source: 'Municipal Corporation Health By-Laws' },
  { id: 4303, service_id: 43, document_name: 'Sanctioned Building Plan / Commercial Assessment Order', description: 'Document verifying the premises is legally sanctioned for commercial trade operations.', mandatory: true, condition_rule: null, source: 'Urban Local Body Regulations' },
  { id: 4304, service_id: 43, document_name: 'Owner No-Objection Certificate (NOC) for Trade', description: 'Consent letter from building owner permitting specific trade activity on rented premises.', mandatory: false, condition_rule: 'Required if operating from rented or leased commercial accommodation.', source: 'Municipal Trade Charter' },
  { id: 4305, service_id: 43, document_name: 'Fire Safety NOC from Fire Department', description: 'Statutory fire safety certification verifying fire extinguishers and emergency exits.', mandatory: false, condition_rule: 'Mandatory for high-occupancy trades, hotels, restaurants, banquet halls, fireworks, and chemical trades.', source: 'State Fire and Rescue Services' },

  // Service 44: Shop & Establishment Registration
  { id: 4401, service_id: 44, document_name: 'PAN Card & Aadhaar Card of Employer / Proprietor', description: 'Taxation and identity proof of the employer or managing director.', mandatory: true, condition_rule: null, source: 'State Labour Department (labour.gov.in)' },
  { id: 4402, service_id: 44, document_name: 'Commercial Address Proof (Electricity Bill / Rent Agreement)', description: 'Electricity bill of establishment premises not older than 3 months, along with registered lease deed.', mandatory: true, condition_rule: null, source: 'State Shops and Establishments Act' },
  { id: 4403, service_id: 44, document_name: 'Certificate of Incorporation / Partnership Deed', description: 'RoC certificate of incorporation or registered partnership deed establishing legal business entity.', mandatory: false, condition_rule: 'Mandatory for Companies, LLPs, and Registered Partnership Firms.', source: 'Ministry of Corporate Affairs' },
  { id: 4404, service_id: 44, document_name: 'List of Employees with Designation and Wages', description: 'Register detailing names, age, dates of appointment, and monthly wages of all employed staff.', mandatory: true, condition_rule: null, source: 'Labour Welfare Commissionerate' },
  { id: 4405, service_id: 44, document_name: 'Photograph of Establishment Displaying Bilingual Name Board', description: 'Frontal photograph of establishment entrance clearly displaying commercial name board in local state language and English.', mandatory: true, condition_rule: null, source: 'State Shops and Establishments Rules' },

  // Service 45: Professional Tax Registration
  { id: 4501, service_id: 45, document_name: 'PAN Card of Enterprise / Professional', description: 'Income Tax PAN card of practicing professional or business organization.', mandatory: true, condition_rule: null, source: 'Commercial Taxes Department / Urban Local Body' },
  { id: 4502, service_id: 45, document_name: 'Professional Qualification / Certificate of Practice', description: 'Registration certificate from Bar Council (Lawyers), Medical Council (Doctors), ICAI (CA), or Council of Architecture.', mandatory: false, condition_rule: 'Mandatory for self-employed professionals practicing licensed vocations.', source: 'Professional Tax Statutory Rules' },
  { id: 4503, service_id: 45, document_name: 'Proof of Place of Work / Business Premises Address', description: 'Utility bill, property tax receipt, or lease agreement of office chamber or consulting room.', mandatory: true, condition_rule: null, source: 'State Professional Tax Directorate' },
  { id: 4504, service_id: 45, document_name: 'Bank Account Statement / Cancelled Cheque', description: 'Bank passbook or cancelled cheque displaying business/professional account title and IFSC code.', mandatory: true, condition_rule: null, source: 'Commercial Taxes Department' },
  { id: 4505, service_id: 45, document_name: 'Shop & Establishment Certificate or GSTIN', description: 'Statutory trade registration certificate.', mandatory: false, condition_rule: 'Required if applicant runs an incorporated commercial or consultancy office.', source: 'State Tax Regulations' },

  // Service 46: Factory Licence
  { id: 4601, service_id: 46, document_name: 'Form 1 (Application for Factory Approval) & Form 2 (Grant of Licence)', description: 'Completed statutory application forms containing manufacturing process details and occupier data.', mandatory: true, condition_rule: null, source: 'Directorate of Industrial Safety and Health (DISH) (dish.gov.in)' },
  { id: 4602, service_id: 46, document_name: 'Factory Plant Layout Blueprint drawn to Scale', description: 'Detailed architectural drawings showing machine positioning, clear gangways, fire escapes, and natural ventilation.', mandatory: true, condition_rule: null, source: 'Factories Act 1948 Section 6' },
  { id: 4603, service_id: 46, document_name: 'Land Title Deed / Industrial Estate Allotment Order', description: 'Registered title deed or State Small Industries Development Corporation allotment order for factory plot.', mandatory: true, condition_rule: null, source: 'State Directorate of Industrial Safety' },
  { id: 4604, service_id: 46, document_name: 'List of Plant and Machinery with Horsepower (HP) Rating', description: 'Certified schedule detailing each production machine, individual motor capacity in HP, and total connected load in KVA.', mandatory: true, condition_rule: null, source: 'Factories Act 1948' },
  { id: 4605, service_id: 46, document_name: 'State Pollution Control Board Consent to Establish (CTE)', description: 'Statutory environmental consent order issued under Air and Water Pollution Control Acts.', mandatory: true, condition_rule: null, source: 'State Pollution Control Board' },
  { id: 4606, service_id: 46, document_name: 'Emergency Preparedness & On-Site Disaster Management Plan', description: 'Documented disaster response plan and hazardous chemical storage protocols.', mandatory: false, condition_rule: 'Mandatory for chemical, pharmaceutical, metallurgical, or hazardous process factory operations.', source: 'DISH Safety Code' },

  // Service 47: FSSAI Food Business Licence
  { id: 4701, service_id: 47, document_name: 'Photo ID of Food Business Operator (Aadhaar / Passport / Voter ID)', description: 'Identity credential of the proprietor, partner, or authorized food safety director.', mandatory: true, condition_rule: null, source: 'Food Safety and Standards Authority of India - FoSCoS (foscos.fssai.gov.in)' },
  { id: 4702, service_id: 47, document_name: 'Business Premises Address Proof (Rent Agreement / Electricity Bill)', description: 'Document establishing physical address where food preparation, processing, or storage occurs.', mandatory: true, condition_rule: null, source: 'FSSAI Licensing Regulations' },
  { id: 4703, service_id: 47, document_name: 'Food Safety Management System (FSMS) Plan or Affidavit', description: 'Declaration or certified FSMS plan outlining hygienic handling, pest control, and food safety protocols.', mandatory: true, condition_rule: null, source: 'Food Safety and Standards Act 2006' },
  { id: 4704, service_id: 47, document_name: 'List of Food Product Categories & Manufacturing Flowchart', description: 'Complete list of food items manufactured, repacked, or sold with production flow steps.', mandatory: true, condition_rule: null, source: 'FoSCoS Portal Guidelines' },
  { id: 4705, service_id: 47, document_name: 'Water Testing Analysis Report from NABL-Accredited Lab', description: 'Chemical and microbiological potability report of water used in food preparation.', mandatory: false, condition_rule: 'Mandatory for food manufacturers, beverage bottlers, restaurants, and catering establishments.', source: 'FSSAI Quality Regulations' },
  { id: 4706, service_id: 47, document_name: 'Medical Fitness Certificates of Food Handlers', description: 'Medical examination reports certifying workers are free from communicable diseases and vaccinated against typhoid.', mandatory: false, condition_rule: 'Mandatory for commercial kitchens, catering units, and packaged food manufacturing plants.', source: 'FSSAI Hygiene Code' },

  // Service 48: GST Registration (GSTIN)
  { id: 4801, service_id: 48, document_name: 'PAN Card of Business Entity / Proprietor', description: 'Permanent Account Number of proprietor (for proprietorship) or company/firm PAN (for legal entities).', mandatory: true, condition_rule: null, source: 'Goods and Services Tax Network (GSTN) (gst.gov.in)' },
  { id: 4802, service_id: 48, document_name: 'Aadhaar Card of Authorized Signatory (with Mobile OTP)', description: 'Biometric unique identity card of authorized signatory required for mandatory biometric/OTP e-KYC.', mandatory: true, condition_rule: null, source: 'Central Goods and Services Tax Act 2017' },
  { id: 4803, service_id: 48, document_name: 'Proof of Principal Place of Business (Electricity Bill / Property Tax)', description: 'Electricity bill, property tax receipt, or registered rent agreement with owner consent NOC.', mandatory: true, condition_rule: null, source: 'GST Registration Manual' },
  { id: 4804, service_id: 48, document_name: 'Bank Account Proof (Cancelled Cheque / Bank Statement)', description: 'Cancelled cheque or bank statement showing business name, account number, and IFSC code.', mandatory: true, condition_rule: null, source: 'GSTN Portal Guidelines' },
  { id: 4805, service_id: 48, document_name: 'Partnership Deed / RoC Certificate of Incorporation', description: 'Legal charter document establishing partnership firm, LLP, or private limited company.', mandatory: false, condition_rule: 'Mandatory for all business constitutions other than sole proprietorship.', source: 'Ministry of Corporate Affairs' },
  { id: 4806, service_id: 48, document_name: 'Board Resolution / Letter of Authorization for Signatory', description: 'Formal resolution or authorization letter appointing the authorized tax signatory.', mandatory: false, condition_rule: 'Mandatory for Companies, LLPs, and Society/Trust registrations.', source: 'CBIC Guidelines' },

  // Service 49: EPFO / PF Account Services
  { id: 4901, service_id: 49, document_name: '12-Digit Universal Account Number (UAN)', description: 'Permanent UAN assigned by EPFO linked to member mobile number.', mandatory: true, condition_rule: null, source: 'Employees Provident Fund Organisation (epfindia.gov.in)' },
  { id: 4902, service_id: 49, document_name: 'Aadhaar Card (Linked with UAN & Active Mobile for OTP)', description: 'Aadhaar card seeded with UAN enabling paperless OTP authentication for claims.', mandatory: true, condition_rule: null, source: 'EPFO Unified Member Portal' },
  { id: 4903, service_id: 49, document_name: 'PAN Card of Member', description: 'PAN card uploaded and verified in member profile to prevent high TDS deduction on PF withdrawals.', mandatory: true, condition_rule: null, source: 'Income Tax Act Section 192A / EPFO Directive' },
  { id: 4904, service_id: 49, document_name: 'Bank Passbook / Cancelled Cheque with Printed Name & IFSC', description: 'Original bank cheque displaying member printed name, active savings account number, and IFSC code.', mandatory: true, condition_rule: null, source: 'EPFO Claim Settlement Guidelines' },
  { id: 4905, service_id: 49, document_name: 'Joint Declaration Form signed by Employer and Employee', description: 'Prescribed joint declaration form supported by school marksheets and appointment records.', mandatory: false, condition_rule: 'Mandatory for correcting demographic errors in member name, father name, or date of joining/exit.', source: 'EPFO Standard Operating Procedure' },
  { id: 4906, service_id: 49, document_name: 'Aadhaar Card & Photo of Nominee', description: 'Identity proof of designated family nominee for statutory e-Nomination under EDLI life insurance and EPS pension.', mandatory: false, condition_rule: 'Required to complete statutory e-Nomination for survivor pension and life insurance cover.', source: 'EPFO E-Nomination Manual' },

  // Service 50: ESIC Registration / Services
  { id: 5001, service_id: 50, document_name: 'PAN Card of Employer / Factory Enterprise', description: 'Taxation identity proof of the business establishment registering under ESIC Act.', mandatory: true, condition_rule: null, source: 'Employees State Insurance Corporation (esic.gov.in)' },
  { id: 5002, service_id: 50, document_name: 'Establishment Commercial Address Proof', description: 'Electricity bill, registered tenancy agreement, or factory licence showing operating address.', mandatory: true, condition_rule: null, source: 'ESIC Registration Manual' },
  { id: 5003, service_id: 50, document_name: 'Bank Account Passbook / Cancelled Cheque with IFSC', description: 'Bank account verification details of employer entity.', mandatory: true, condition_rule: null, source: 'Shram Suvidha Portal' },
  { id: 5004, service_id: 50, document_name: 'Employee Roster with Aadhaar & Wage Records (<= ₹21,000/mo)', description: 'Register of workers detailing names, Aadhaar numbers, date of appointment, and gross wages under threshold.', mandatory: true, condition_rule: null, source: 'ESIC Act 1948' },
  { id: 5005, service_id: 50, document_name: 'Family Photographs of Insured Person (IP)', description: 'Passport size photographs of employee and dependants (spouse, children, dependent parents) for e-Pehchan card.', mandatory: false, condition_rule: 'Required to generate family e-Pehchan smart card for cashless treatment at ESI Dispensaries and Hospitals.', source: 'ESIC Medical Benefits Manual' },

  // Service 51: National Scholarship Application
  { id: 5101, service_id: 51, document_name: 'One Time Registration (OTR) Number & Aadhaar Card of Student', description: 'Valid 14-digit OTR generated on NSP along with biometric Aadhaar card.', mandatory: true, condition_rule: null, source: 'National Scholarship Portal (NSP) (scholarships.gov.in)' },
  { id: 5102, service_id: 51, document_name: 'Bonafide Student Certificate signed by College Principal / Dean', description: 'Institutional bonafide certificate on college letterhead verifying full-time regular enrollment and AISHE code.', mandatory: true, condition_rule: null, source: 'NSP Central Sector Scheme Guidelines' },
  { id: 5103, service_id: 51, document_name: 'Previous Qualifying Examination Marksheet (> 80th Percentile)', description: 'Official marksheet of Class 12 board examination or previous degree confirming merit eligibility.', mandatory: true, condition_rule: null, source: 'Department of Higher Education Guidelines' },
  { id: 5104, service_id: 51, document_name: 'Current Financial Year Parental Income Certificate (< INR 4.5 Lakhs)', description: 'Official income certificate issued by competent revenue authority (Tahsildar) confirming parental income ceiling.', mandatory: true, condition_rule: null, source: 'Ministry of Education Directive' },
  { id: 5105, service_id: 51, document_name: 'Aadhaar-Seeded Bank Passbook (NPCI DBT Active)', description: 'Copy of bank passbook showing student name, single account number, and active NPCI DBT mapping.', mandatory: true, condition_rule: null, source: 'National Scholarship Portal Direct Benefit Transfer Rules' },
  { id: 5106, service_id: 51, document_name: 'Caste Certificate / Minority Community Affidavit', description: 'Community certificate recognizing SC, ST, OBC, or Central Minority category.', mandatory: false, condition_rule: 'Required when applying under Central Sector Minority, Tribal, or Social Justice scholarship schemes.', source: 'Ministry of Minority Affairs / Social Justice' },
  { id: 5107, service_id: 51, document_name: 'Unique Disability ID (UDID Card)', description: 'Government disability identity card confirming 40%+ permanent benchmark disability.', mandatory: false, condition_rule: 'Mandatory if student is applying under the Central Sector Scholarship for Students with Disabilities.', source: 'Department of Empowerment of Persons with Disabilities' }
];

// Combine all services and documents
const COMBINED_SERVICES = [...EXISTING_SERVICES, ...NEW_SERVICES];
const COMBINED_DOCUMENTS = [...EXISTING_DOCUMENTS, ...NEW_DOCUMENTS];

const targetPath = path.join(process.cwd(), 'backend', 'config', 'serviceData.ts');
const fileContent = `import { ServiceRecord, DocumentRecord } from './db.js';

export const ALL_SERVICES: ServiceRecord[] = ${JSON.stringify(COMBINED_SERVICES, null, 2)};

export const ALL_DOCUMENTS: DocumentRecord[] = ${JSON.stringify(COMBINED_DOCUMENTS, null, 2)};
`;

fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`Generated serviceData.ts with ${COMBINED_SERVICES.length} services and ${COMBINED_DOCUMENTS.length} document rules!`);
