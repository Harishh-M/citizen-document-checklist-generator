-- =======================================================
-- Database: citizen_document_assistant
-- Sample Seed Data for Demonstration (GOV-23)
-- Clearly labelled as demonstration dataset grounded in public service manuals
-- =======================================================

USE citizen_document_assistant;

-- Clear previous rows
DELETE FROM ai_results;
DELETE FROM citizen_requests;
DELETE FROM documents;
DELETE FROM services;

-- Insert Services
INSERT INTO services (id, service_name, department, description, eligibility, procedure_steps, source, last_updated) VALUES
(1, 'Income Certificate', 'Department of Revenue & Disaster Management', 
 'Official document certifying the annual household income of an individual or family for welfare schemes, school/college fee concessions, and government quotas.', 
 'Resident of the state with verifiable legal income sources. Household income limits vary by scheme.',
 '1. Submit application with ID and proof of residence. 2. Field verification by Village Administrative Officer (VAO) or Revenue Inspector. 3. Final issuance by Tahsildar.',
 'National e-Governance Division (NeGD) Citizen Services Portal', '2026-08-15'),

(2, 'Residence / Domicile Certificate', 'Department of Revenue & District Administration',
 'Official legal proof validating an applicant continuous residency within a specific state, district, or taluk for education or employment reservations.',
 'Applicant must have continuously resided in the state/district for a minimum continuous duration (typically 5 to 7 years) or have ancestral domicile.',
 '1. Fill citizen details. 2. Attach address and residence continuous proofs. 3. Revenue inspection and Tahsildar digital signature.',
 'State Citizen Portal Public Manual (Rev-Dept 2026)', '2026-08-20'),

(3, 'Scholarship Application (Post-Matric / Merit-cum-Means)', 'Department of Higher Education & Social Welfare',
 'Financial assistance and tuition fee reimbursement for meritorious students from economically weaker sections and reserved social communities.',
 'Enrolled in recognized higher education institution (UG/PG/Diploma). Parent annual income within scheme caps (e.g., under INR 2,50,000 for full waiver).',
 '1. Online student registration. 2. Verification of marksheets and institutional bonafide by college nodal officer. 3. Direct Benefit Transfer (DBT) sanction.',
 'National Scholarship Portal (NSP) Operational Guidelines', '2026-07-10'),

(4, 'Community / Caste Certificate', 'Department of Social Welfare & Backward Classes',
 'Government statutory certificate confirming the social community, caste, or tribe of the citizen to claim constitutional affirmative action benefits.',
 'Must belong to Scheduled Caste (SC), Scheduled Tribe (ST), Other Backward Class (OBC), or Most Backward Class (MBC) as recognized in the state gazette.',
 '1. Application submission with parental blood-relative records. 2. Spot enquiry and community register check. 3. Issuance by competent Sub-Divisional Magistrate or Tahsildar.',
 'Ministry of Social Justice & Empowerment e-Services Manual', '2026-08-01'),

(5, 'Birth Certificate Registration', 'Department of Public Health & Municipal Administration',
 'Primary legal record of a person birth, including date, location, and parentage details vital for all civil rights and identity credentials.',
 'Any birth occurring within the jurisdiction of the municipal corporation, municipality, or village panchayat.',
 '1. Hospital Form-1 birth intimation within 21 days of delivery. 2. Medical officer verification. 3. Issuance by Registrar of Births and Deaths.',
 'Civil Registration System (CRS) - Office of the Registrar General', '2026-09-01'),

(6, 'Old Age / Social Security Pension', 'Department of Social Security & Disability Welfare',
 'Monthly financial pension grant provided to senior citizens living in economic distress or without sufficient family financial support.',
 'Citizen aged 60 years or older. Family income below official Below Poverty Line (BPL) threshold. No adult earning member providing sustained support.',
 '1. Application submission with proof of age and BPL card. 2. Verification of physical living condition and bank account. 3. Monthly DBT pension authorization.',
 'National Social Assistance Programme (NSAP) Directive', '2026-06-25'),

(7, 'Affordable Housing Scheme (PMAY / State Housing)', 'Housing & Urban Development Department',
 'Central and state government subsidized housing initiative providing pucca homes or construction assistance to homeless and kutcha-house dwellers.',
 'Citizen/family must not own a pucca house anywhere in India. Income category: Economically Weaker Section (EWS) or Low Income Group (LIG).',
 '1. Household registration and geo-tagged home survey. 2. Land title verification. 3. Direct milestone fund transfer into beneficiary bank account.',
 'Housing For All Urban & Rural Mission Guidelines 2026', '2026-05-30'),

(8, 'Student Education Loan Interest Subsidy (CSIS)', 'Ministry of Education - Higher Education Financing Authority',
 'Scheme offering full interest subsidy during the moratorium period (course period plus one year) on educational loans taken for professional/technical courses.',
 'Admitted to recognized technical/professional degree. Total parental/family income from all sources not exceeding INR 4,50,000 per annum.',
 '1. Avail education loan from scheduled commercial bank. 2. Submit income certificate and bonafide to lending branch. 3. Ministry subsidy credit.',
 'Central Sector Interest Subsidy Scheme (CSIS) Portal', '2026-07-18');

-- Insert Official Document Requirements (Ground truth)
-- Service 1: Income Certificate
INSERT INTO documents (service_id, document_name, description, mandatory, condition_rule, source) VALUES
(1, 'Aadhaar Card', 'Government-issued 12-digit biometrically linked unique identity card of the applicant.', TRUE, NULL, 'National e-Governance Division (NeGD)'),
(1, 'Address Proof (Ration Card or Voter ID)', 'Document verifying that the applicant resides in the territorial jurisdiction of the issuing authority.', TRUE, NULL, 'National e-Governance Division (NeGD)'),
(1, 'Income Proof (Salary Slip / Form 16 / IT Return)', 'Documentary proof of earnings such as recent 3-month payslip for salaried persons or Income Tax Return assessment.', TRUE, NULL, 'Department of Revenue & Disaster Management Manual'),
(1, 'Bank Passbook Statement (6 Months)', 'Bank account statement showing transaction flow and average monthly credits.', FALSE, 'Required when applicant is self-employed, daily wage earner, agricultural worker, or when annual income exceeds threshold limits without formal salary slips.', 'Revenue Department Circular 2026-Rev/B'),
(1, 'Affidavit of Non-Salaried Income', 'Self-declaration notarized on non-judicial stamp paper stating annual household income from informal sources.', FALSE, 'Required only if the applicant does not have salary slips or IT returns to substantiate unorganized sector income.', 'State Revenue Manual Section 4(c)'),
(1, 'Caste Certificate', 'Community certificate proving social category.', FALSE, 'Required only when seeking fee waiver or concessional processing under SC/ST/OBC category provisions.', 'Revenue Department Guidelines');

-- Service 2: Residence / Domicile Certificate
INSERT INTO documents (service_id, document_name, description, mandatory, condition_rule, source) VALUES
(2, 'Aadhaar Card', 'Primary biometric identity credential verifying name, date of birth, and biometric record.', TRUE, NULL, 'State Citizen Portal Public Manual'),
(2, 'Utility Bill (Electricity Bill or Water Connection Bill)', 'Recent utility bill (under 3 months old) showing current residential address and metered service connection.', TRUE, NULL, 'State Citizen Portal Public Manual'),
(2, 'Proof of Continuous Residence (5+ Years)', 'Historical documentary evidence like Land Tax receipt, voter list extract, or school record proving continuous stay.', TRUE, NULL, 'State Citizen Portal Public Manual'),
(2, 'Registered Rental / Lease Agreement', 'Notarized or sub-registrar stamped tenancy contract between tenant and landlord.', FALSE, 'Required if the applicant is residing in rented accommodation rather than owned/ancestral property.', 'State Citizen Portal Public Manual (Rev-Dept 2026)'),
(2, 'School Transfer Certificate (TC) or Leaving Certificate', 'Institutional educational certificate stating applicant school location and dates of study.', FALSE, 'Required if applicant claims native domicile by virtue of completed basic primary and secondary education in the state.', 'State Citizen Portal Public Manual (Rev-Dept 2026)');

-- Service 3: Scholarship Application
INSERT INTO documents (service_id, document_name, description, mandatory, condition_rule, source) VALUES
(3, 'Aadhaar Card', 'Mandatory identity card linked to citizen mobile number and seeded with NPCI for Direct Benefit Transfer.', TRUE, NULL, 'National Scholarship Portal (NSP) Operational Guidelines'),
(3, 'Previous Academic Year Marksheet / Degree Certificate', 'Official transcript or grade sheet verifying minimum qualifying academic performance criteria.', TRUE, NULL, 'National Scholarship Portal (NSP) Operational Guidelines'),
(3, 'Bonafide Student Certificate / College ID Card', 'Formal certification issued by the principal or head of institution verifying regular full-time enrollment.', TRUE, NULL, 'National Scholarship Portal (NSP) Operational Guidelines'),
(3, 'Bank Account Passbook (Aadhaar-Seeded)', 'Front page of bank passbook displaying applicant name, active account number, and IFSC code.', TRUE, NULL, 'National Scholarship Portal (NSP) Operational Guidelines'),
(3, 'Parental Income Certificate', 'Valid official income certificate issued by the competent revenue authority (Tahsildar) for the current financial year.', TRUE, NULL, 'National Scholarship Portal (NSP) Operational Guidelines'),
(3, 'Community / Caste Certificate', 'Official state certificate recognizing SC, ST, OBC, or Minority community status.', FALSE, 'Required when applying under category-specific scholarships such as Post-Matric SC/ST or OBC Welfare schemes.', 'National Scholarship Portal (NSP) Operational Guidelines'),
(3, 'Disability Certificate (UDID Card)', 'Unique Disability Identity Card issued by the competent government district medical board.', FALSE, 'Required only if the student is applying under the Persons with Benchmark Disabilities (PwD) scholarship quota.', 'Ministry of Social Justice & Empowerment Guidelines');

-- Service 4: Community / Caste Certificate
INSERT INTO documents (service_id, document_name, description, mandatory, condition_rule, source) VALUES
(4, 'Aadhaar Card', 'Personal identity verification document of the applicant.', TRUE, NULL, 'Ministry of Social Justice & Empowerment e-Services Manual'),
(4, 'School Transfer Certificate (TC) showing Caste/Tribe', 'School or college TC explicitly recording the community and sub-caste recorded at the time of admission.', TRUE, NULL, 'Ministry of Social Justice & Empowerment e-Services Manual'),
(4, 'Father or Blood Relative Community Certificate', 'Community certificate of father, paternal grandfather, or real sibling issued by revenue authority.', TRUE, NULL, 'Ministry of Social Justice & Empowerment e-Services Manual'),
(4, 'Ration Card / Family Smart Card', 'State civil supplies smart card establishing genealogical family composition and parental relationship.', TRUE, NULL, 'Ministry of Social Justice & Empowerment e-Services Manual'),
(4, 'Local Ward / Village Administrative Verification Report', 'Field inquiry report confirming long-standing local community status.', FALSE, 'Required if blood relative certificates are unavailable, lost, or originally issued in a different district/state.', 'Ministry of Social Justice & Empowerment e-Services Manual');

-- Service 5: Birth Certificate Registration
INSERT INTO documents (service_id, document_name, description, mandatory, condition_rule, source) VALUES
(5, 'Hospital Discharge Summary / Form-1 Birth Report', 'Medical birth intimation slip issued by the attending hospital or nursing home at time of delivery.', TRUE, NULL, 'Civil Registration System (CRS) Manual'),
(5, 'Aadhaar Cards of Both Parents', 'Identity proofs of the mother and father to record biological parentage and identity numbers.', TRUE, NULL, 'Civil Registration System (CRS) Manual'),
(5, 'Parents Marriage Certificate / Joint Residence Proof', 'Document validating parents marital record and legal matrimonial residence address.', FALSE, 'Required if registration is delayed beyond 21 days or parents address differs from hospital admission ledger.', 'Civil Registration System (CRS) Manual'),
(5, 'Magistrate Order or Notarized Affidavit for Delayed Birth', 'Court or Executive Magistrate sanction order authorizing registration of delayed birth.', FALSE, 'Mandatory if birth event is being registered after 30 days up to 1 year or more following date of birth.', 'Civil Registration Act Section 13(3)');

-- Service 6: Old Age / Social Security Pension
INSERT INTO documents (service_id, document_name, description, mandatory, condition_rule, source) VALUES
(6, 'Aadhaar Card', 'Proof of identity and demographic record.', TRUE, NULL, 'National Social Assistance Programme (NSAP) Directive'),
(6, 'Age Proof (Birth Certificate / Voter ID / Medical Age Certificate)', 'Document strictly confirming that applicant has attained 60 years of age or older.', TRUE, NULL, 'National Social Assistance Programme (NSAP) Directive'),
(6, 'Bank Passbook (Single Account in Scheduled Bank)', 'First page of single bank account passbook for automatic monthly DBT pension disbursement.', TRUE, NULL, 'National Social Assistance Programme (NSAP) Directive'),
(6, 'BPL Ration Card or Indigent Income Certificate', 'Valid Below Poverty Line (BPL) ration card or revenue income certificate establishing destitute status.', TRUE, NULL, 'National Social Assistance Programme (NSAP) Directive'),
(6, 'Death Certificate of Husband', 'Official municipal death certificate of deceased spouse.', FALSE, 'Mandatory strictly for applicants applying under the Widow / Destitute Women Pension category.', 'Social Security Pension Rules 2026'),
(6, 'Affidavit of Destitution / No Earning Adult Son', 'Notarized self-affidavit declaring lack of regular financial support from adult offspring.', FALSE, 'Required where state social security pension rules mandate verification of destitution without adult earning sons.', 'NSAP State Implementation Code');

-- Service 7: Affordable Housing Scheme
INSERT INTO documents (service_id, document_name, description, mandatory, condition_rule, source) VALUES
(7, 'Aadhaar Card of Head and All Family Members', 'Biometric identity cards of all co-inhabiting family members for national de-duplication.', TRUE, NULL, 'Housing For All Urban & Rural Mission Guidelines 2026'),
(7, 'Income Proof / EWS Certificate', 'Income certificate certifying household income is within Economically Weaker Section (EWS < INR 3,00,000) bracket.', TRUE, NULL, 'Housing For All Urban & Rural Mission Guidelines 2026'),
(7, 'Bank Account Details with IFSC', 'Passbook copy with IFSC code linked to PFMS for direct installment subsidies.', TRUE, NULL, 'Housing For All Urban & Rural Mission Guidelines 2026'),
(7, 'Photograph of Existing Kutcha / Unsettled Living Structure', 'Photograph depicting applicant living in temporary, kutcha, thatched, or damaged dwelling.', TRUE, NULL, 'Housing For All Urban & Rural Mission Guidelines 2026'),
(7, 'Land Patta / Ownership Title Deed', 'Registered legal deed or government land patta showing undisputed ownership of proposed construction plot.', FALSE, 'Mandatory when applying under the Beneficiary-Led Construction (BLC) component to construct a pucca house on owned land.', 'Housing For All Urban & Rural Mission Guidelines 2026'),
(7, 'Non-Encumbrance Certificate (EC)', 'Certificate from Sub-Registrar confirming property has no legal mortgages or court liens.', FALSE, 'Required when financial institutional home loans or municipal building plan approvals are integrated into the subsidy.', 'Housing For All Urban & Rural Mission Guidelines 2026');

-- Service 8: Student Education Loan Interest Subsidy
INSERT INTO documents (service_id, document_name, description, mandatory, condition_rule, source) VALUES
(8, 'Aadhaar Card of Student & Co-borrower Parent', 'Biometric proof of identity for student borrower and parent guarantor.', TRUE, NULL, 'Central Sector Interest Subsidy Scheme (CSIS) Portal'),
(8, 'Entrance Examination Scorecard / Merit Admission Letter', 'Scorecard of national/state exam (JEE, NEET, GATE, CAT, CET) or merit allotment letter from central counseling.', TRUE, NULL, 'Central Sector Interest Subsidy Scheme (CSIS) Portal'),
(8, 'Official Fee Structure on College Letterhead', 'Certified fee statement signed by registrar/dean detailing tuition, exam, lab, and university charges.', TRUE, NULL, 'Central Sector Interest Subsidy Scheme (CSIS) Portal'),
(8, 'Annual Family Income Certificate (< INR 4.5 Lakhs)', 'Valid current-year income certificate issued by Tahsildar or designated competent revenue officer.', TRUE, NULL, 'Central Sector Interest Subsidy Scheme (CSIS) Portal'),
(8, 'Existing Education Loan Sanction Letter & Account Statement', 'Formal loan sanction letter issued by a scheduled commercial bank outlining principal and disbursed tranche.', FALSE, 'Required if claiming interest subsidy against an already sanctioned or active educational loan account.', 'Central Sector Interest Subsidy Scheme (CSIS) Portal');
