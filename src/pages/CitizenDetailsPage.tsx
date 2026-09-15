import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { Service, CitizenFormData } from '../types.js';

interface CitizenDetailsPageProps {
  service: Service;
  onBack: () => void;
  onSubmit: (formData: CitizenFormData) => void;
  isSubmitting: boolean;
}

export const CitizenDetailsPage: React.FC<CitizenDetailsPageProps> = ({
  service,
  onBack,
  onSubmit,
  isSubmitting
}) => {
  const [formData, setFormData] = useState<CitizenFormData>({
    name: '',
    age: '',
    state: 'Tamil Nadu',
    district: '',
    occupation: '',
    annualIncome: '',
    category: 'General',
    purpose: '',
    yearsOfResidence: '',
    accommodationType: 'Owned / Ancestral',
    courseName: '',
    institution: '',
    marksPercentage: '',
    disabilityStatus: 'No',
    hasBplCard: 'No',
    hasPuccaHouse: 'No',
    ownsLandPlot: 'No',
    delayedDays: 'Under 21 Days',
    relativeCasteCertAvailable: 'Yes',
    pensionCategory: 'Old Age Pension (Destitute Senior Citizen)',
    existingLoanStatus: 'New Loan Application'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const toggleTooltip = (field: string) => {
    setActiveTooltip(activeTooltip === field ? null : field);
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    
    const newErrors: Record<string, string> = {};

    // 1. Full Legal Name Validation
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Please enter the applicant full legal name.';
    }

    // 2. Age Validation
    if (formData.age === '' || formData.age === undefined || isNaN(Number(formData.age))) {
      newErrors.age = 'Please enter applicant age in years.';
    } else if (Number(formData.age) < 0 || Number(formData.age) > 125) {
      newErrors.age = 'Please enter a valid age between 0 and 125.';
    }

    // 3. District Validation
    if (!formData.district || !formData.district.trim()) {
      newErrors.district = 'Please enter your district (e.g., Chennai, Coimbatore, Salem, Erode).';
    }

    // 4. Service-specific required fields
    if (service.id === 1) { // Income Certificate
      if (formData.annualIncome === '' || formData.annualIncome === undefined || isNaN(Number(formData.annualIncome))) {
        newErrors.annualIncome = 'Please enter your gross annual household income.';
      }
    }

    if (service.id === 2 || service.id === 27) { // Residence / Domicile
      if (formData.yearsOfResidence === '' || formData.yearsOfResidence === undefined) {
        newErrors.yearsOfResidence = 'Please enter the number of years residing in the state/district.';
      }
    }

    if (service.id === 3 || service.id === 51) { // Scholarship
      if (!formData.courseName || !formData.courseName.trim()) {
        newErrors.courseName = 'Please enter your enrolled course / degree name.';
      }
    }

    // If validation fails, display error messages and scroll to top
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setErrors({});

    // Construct sanitized complete data
    const sanitizedData: CitizenFormData = {
      ...formData,
      name: formData.name.trim(),
      age: Number(formData.age),
      state: formData.state || 'Tamil Nadu',
      district: formData.district.trim(),
      occupation: formData.occupation || (service.id === 3 ? 'Student / Dependent' : 'Salaried Employee (Private/Govt)'),
      annualIncome: formData.annualIncome !== '' && formData.annualIncome !== undefined && !isNaN(Number(formData.annualIncome))
        ? Number(formData.annualIncome)
        : (service.id === 7 ? 95000 : 150000),
      courseName: formData.courseName && formData.courseName.trim() ? formData.courseName.trim() : 'Higher Education Degree / Technical Course',
      category: formData.category || 'General',
      purpose: formData.purpose && formData.purpose.trim() ? formData.purpose.trim() : `Application for ${service.service_name}`
    };

    onSubmit(sanitizedData);
  };

  // Quick fill sample profiles
  const fillSampleData = (profileType: 'standard' | 'conditional') => {
    if (service.id === 1) { // Income
      if (profileType === 'standard') {
        setFormData({
          name: 'Karthik Subramanian',
          age: 22,
          state: 'Tamil Nadu',
          district: 'Erode',
          occupation: 'Student / Dependent',
          annualIncome: 150000,
          category: 'General',
          purpose: 'College Tuition Concession & Hostel Fee Assistance'
        });
      } else {
        setFormData({
          name: 'Muthusamy K',
          age: 42,
          state: 'Tamil Nadu',
          district: 'Erode',
          occupation: 'Self-Employed / Business',
          annualIncome: 240000,
          category: 'OBC',
          purpose: 'Government Subsidy Welfare Scheme Application'
        });
      }
    } else if (service.id === 2) { // Residence
      setFormData({
        name: 'Arun Kumar',
        age: 28,
        state: 'Tamil Nadu',
        district: 'Chennai',
        yearsOfResidence: profileType === 'standard' ? 8 : 4,
        accommodationType: profileType === 'standard' ? 'Owned / Ancestral' : 'Rented / Leased',
        purpose: 'State Government Quota Employment Verification'
      });
    } else if (service.id === 3) { // Scholarship
      setFormData({
        name: 'Priya Dharshini',
        age: 20,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        occupation: 'Student / Dependent',
        courseName: 'B.Tech Computer Science',
        institution: 'Government College of Technology',
        annualIncome: 180000,
        category: profileType === 'standard' ? 'General' : 'SC',
        marksPercentage: 84,
        disabilityStatus: 'No',
        purpose: 'Post-Matric Scholarship Scheme'
      });
    } else if (service.id === 4) { // Caste Certificate
      setFormData({
        name: 'S. Divya',
        age: 19,
        state: 'Tamil Nadu',
        district: 'Madurai',
        category: 'OBC',
        relativeCasteCertAvailable: profileType === 'standard' ? 'Yes' : 'No',
        purpose: 'Engineering College Admission Quota'
      });
    } else if (service.id === 5) { // Birth Certificate
      setFormData({
        name: 'Baby of Anitha (Mother: Anitha, Father: Rajesh)',
        age: 1,
        state: 'Tamil Nadu',
        district: 'Salem',
        delayedDays: profileType === 'standard' ? 'Under 21 Days' : 'Over 30 Days (Delayed Registration)',
        purpose: 'Official Birth Registration & Passport Verification'
      });
    } else if (service.id === 6) { // Pension
      setFormData({
        name: 'Meenakshi Ammal',
        age: 67,
        state: 'Tamil Nadu',
        district: 'Tiruchirappalli',
        pensionCategory: profileType === 'standard' ? 'Old Age Pension (Destitute Senior Citizen)' : 'Widow / Destitute Pension',
        hasBplCard: 'Yes',
        annualIncome: 24000,
        purpose: 'Monthly Social Security Pension Scheme'
      });
    } else if (service.id === 7) { // Housing
      setFormData({
        name: 'Murugan Selvam',
        age: 44,
        state: 'Tamil Nadu',
        district: 'Salem',
        occupation: 'Daily Wage Laborer',
        annualIncome: 95000,
        category: 'MBC',
        hasPuccaHouse: 'No',
        ownsLandPlot: profileType === 'standard' ? 'No' : 'Yes',
        purpose: 'Beneficiary-Led Individual House Construction (PMAY)'
      });
    } else if (service.id === 8) { // Education Loan
      setFormData({
        name: 'Vignesh R',
        age: 21,
        state: 'Tamil Nadu',
        district: 'Vellore',
        courseName: 'MBBS - Medical Sciences',
        annualIncome: 320000,
        existingLoanStatus: profileType === 'standard' ? 'Applying New Bank Loan' : 'Active Loan Account Sanctioned',
        purpose: 'Central Sector Interest Subsidy on Education Loan'
      });
    } else if (service.id === 9) { // Nativity Certificate
      setFormData({
        name: 'S. Ramalingam',
        age: 26,
        state: 'Tamil Nadu',
        district: 'Madurai',
        bornOutsideState: profileType === 'standard' ? 'No' : 'Yes',
        ancestralPropertyClaim: profileType === 'standard' ? 'No' : 'Yes',
        purpose: 'State Civil Service Application & Quota Verification'
      });
    } else if (service.id === 10) { // Death Certificate
      setFormData({
        name: 'Late K. Venkataraman (Informant: V. Sundaram)',
        age: 72,
        state: 'Tamil Nadu',
        district: 'Chennai',
        delayedDays: profileType === 'standard' ? 'Under 21 Days' : 'Over 30 Days (Delayed Registration)',
        causeOfDeath: profileType === 'standard' ? 'Natural Medical Cause' : 'Accidental / Unnatural Demise',
        purpose: 'Legal Estate Settlement & Bank Account Closure'
      });
    } else if (service.id === 11) { // Legal Heir Certificate
      setFormData({
        name: 'Revathi V (Wife of Late K. Venkataraman)',
        age: 48,
        state: 'Tamil Nadu',
        district: 'Salem',
        claimingNoc: profileType === 'standard' ? 'No' : 'Yes',
        deceasedMaritalRecord: 'Updated on Ration Card',
        purpose: 'Compassionate Family Pension Transfer'
      });
    } else if (service.id === 12) { // Marriage Certificate
      setFormData({
        name: 'K. Vijay Anand & S. Priyadharshini',
        age: 27,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        remarriageStatus: profileType === 'standard' ? 'No' : 'Yes',
        foreignSpouseStatus: 'No',
        purpose: 'Dependent Family Visa Endorsement & Joint Bank Account'
      });
    } else if (service.id === 13) { // Aadhaar Card / Update
      setFormData({
        name: 'R. Ananthapadmanabhan',
        age: 34,
        state: 'Tamil Nadu',
        district: 'Tirunelveli',
        hasOwnAddressProof: profileType === 'standard' ? 'Yes' : 'No',
        isLegalNameChange: profileType === 'standard' ? 'No' : 'Yes',
        purpose: 'Demographic Address & Biometric Update'
      });
    } else if (service.id === 14) { // PAN Card
      setFormData({
        name: profileType === 'standard' ? 'Deepak Chandran' : 'Master Anirudh (Minor by Father Deepak Chandran)',
        age: profileType === 'standard' ? 24 : 14,
        state: 'Tamil Nadu',
        district: 'Chennai',
        panCitizenType: profileType === 'standard' ? 'Individual (Adult)' : 'Minor Child (via Representative Assessee)',
        purpose: 'New PAN Allotment for Bank Account & Investment'
      });
    } else if (service.id === 15) { // Passport
      setFormData({
        name: 'Harish R',
        age: 25,
        state: 'Tamil Nadu',
        district: 'Chennai',
        passportScheme: profileType === 'standard' ? 'Normal Scheme' : 'Tatkaal Scheme',
        passportApplicationType: profileType === 'standard' ? 'Fresh Passport' : 'Renewal / Re-issue',
        purpose: 'International Employment & Travel'
      });
    } else if (service.id === 16) { // Voter ID
      setFormData({
        name: 'Kavitha M',
        age: 19,
        state: 'Tamil Nadu',
        district: 'Tiruchirappalli',
        voterApplicationType: profileType === 'standard' ? 'New Voter Registration (Form 6)' : 'Shifting / Correction (Form 8)',
        purpose: 'General Elections Electoral Roll Inclusion'
      });
    } else if (service.id === 17) { // Driving Licence
      setFormData({
        name: 'G. Vignesh',
        age: profileType === 'standard' ? 21 : 44,
        state: 'Tamil Nadu',
        district: 'Erode',
        dlApplicationType: profileType === 'standard' ? "Learner's Licence (LL)" : 'Permanent DL (Already have LL)',
        dlCategory: profileType === 'standard' ? 'Motorcycle / LMV (Private)' : 'Transport / Commercial',
        purpose: 'Driving Licence Grant for LMV'
      });
    } else if (service.id === 18) { // Vehicle Registration
      setFormData({
        name: 'P. Aravind',
        age: 31,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        vehicleFinanceStatus: profileType === 'standard' ? 'Self-Financed' : 'Hypothecated (Financed/Loan)',
        vehicleTransferType: profileType === 'standard' ? 'New Vehicle Registration' : 'Inter-State Transfer',
        purpose: 'Permanent Motor Vehicle Registration & RC Book'
      });
    } else if (service.id === 19) { // Ration Card
      setFormData({
        name: 'Sarada Lakshmi',
        age: 38,
        state: 'Tamil Nadu',
        district: 'Thanjavur',
        annualIncome: 65000,
        rationCardType: profileType === 'standard' ? 'New Family Card' : 'Splitting / Relocation',
        hasLpgConnection: profileType === 'standard' ? 'No' : 'Yes',
        purpose: 'NFSA Priority Household Smart Ration Card'
      });
    } else if (service.id === 20) { // PM-KISAN
      setFormData({
        name: 'R. Periyasamy',
        age: 52,
        state: 'Tamil Nadu',
        district: 'Dharmapuri',
        occupation: 'Agricultural Farmer',
        landSuccessionType: profileType === 'standard' ? 'Self-Owned Land Record' : 'Inherited / Mutation in Progress',
        annualIncome: 90000,
        purpose: 'Pradhan Mantri Kisan Samman Nidhi DBT Enrollment'
      });
    } else if (service.id === 21) { // Ayushman Bharat
      setFormData({
        name: 'M. Selvi',
        age: 42,
        state: 'Tamil Nadu',
        district: 'Vellore',
        annualIncome: 55000,
        hasBplCard: 'Yes',
        hasSeccLetter: profileType === 'standard' ? 'No' : 'Yes',
        purpose: 'Ayushman Bharat PM-JAY Golden Card Issuance'
      });
    } else if (service.id === 22) { // Disability Pension
      setFormData({
        name: 'C. Manikandan',
        age: 36,
        state: 'Tamil Nadu',
        district: 'Salem',
        disabilityStatus: 'Yes',
        disabilityPercentage: profileType === 'standard' ? 50 : 85,
        annualIncome: 18000,
        hasBplCard: 'Yes',
        purpose: 'Monthly Disability Welfare Pension'
      });
    } else if (service.id === 23) { // Unemployment Assistance
      setFormData({
        name: 'D. Naveen Kumar',
        age: 26,
        state: 'Tamil Nadu',
        district: 'Dindigul',
        occupation: 'Unemployed Graduate (B.Com)',
        annualIncome: 45000,
        category: profileType === 'standard' ? 'General' : 'OBC',
        employmentLiveYears: profileType === 'standard' ? '3+ Years Continuous Registration' : '5+ Years Registration',
        purpose: 'Quarterly Educated Youth Unemployment Stipend'
      });
    } else if (service.id === 24) { // Labour Card / e-Shram
      setFormData({
        name: 'V. Murugesan',
        age: 39,
        state: 'Tamil Nadu',
        district: 'Madurai',
        occupation: 'Unorganized Construction / Street Vendor',
        hasNominee: profileType === 'standard' ? 'No' : 'Yes',
        annualIncome: 75000,
        purpose: 'e-Shram National UAN Registration & Accident Cover'
      });
    } else if (service.id === 25) { // BOCW Welfare Scheme
      setFormData({
        name: 'K. Palanisamy',
        age: 44,
        state: 'Tamil Nadu',
        district: 'Erode',
        occupation: 'Construction Mason',
        annualIncome: 90000,
        bocwClaimType: profileType === 'standard' ? 'General Worker Registration' : 'Children Education Scholarship',
        has90DayWorkCert: 'Yes (Form-V from Registered Builder/Union)',
        purpose: 'BOCW Welfare Board Passbook & Benefits'
      });
    } else if (service.id === 26) { // MSME / Udyam
      setFormData({
        name: 'Raghavan Enterprises (Proprietor: S. Raghavan)',
        age: 38,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        enterpriseType: profileType === 'standard' ? 'Proprietorship' : 'Partnership Firm',
        isGstLiable: profileType === 'standard' ? 'No' : 'Yes',
        annualIncome: profileType === 'standard' ? 1800000 : 6500000,
        purpose: 'Udyam MSME Registration for Priority Bank Credit'
      });
    } else if (service.id === 27) { // Domicile Certificate
      setFormData({
        name: 'Deepak Varma',
        age: 24,
        state: 'Tamil Nadu',
        district: 'Chennai',
        yearsOfResidence: profileType === 'standard' ? 12 : 5,
        domicileBasis: profileType === 'standard' ? 'Continuous 5+ Years Residence in State' : 'Parental Ancestral Origin',
        purpose: 'State Quota NEET PG / UPSC State Reservation'
      });
    } else if (service.id === 28) { // Character Certificate
      setFormData({
        name: 'Senthil Kumar R',
        age: 26,
        state: 'Tamil Nadu',
        district: 'Madurai',
        characterCertPurpose: profileType === 'standard' ? 'State Public Service Commission Employment' : 'Passport / Overseas Visa Clearance',
        purpose: 'Government Gazetted Post Appointment Verification'
      });
    } else if (service.id === 29) { // Unemployment Certificate
      setFormData({
        name: 'Kavitha S',
        age: 25,
        state: 'Tamil Nadu',
        district: 'Tirunelveli',
        occupation: 'Unemployed Graduate',
        unemploymentDuration: profileType === 'standard' ? '2+ Years Post Graduation' : '3+ Years Registered',
        annualIncome: 0,
        purpose: 'State Educated Youth Unemployment Grant & Competitive Exam Fee Waiver'
      });
    } else if (service.id === 30) { // Non-Creamy Layer Certificate
      setFormData({
        name: 'M. Naveen',
        age: 22,
        state: 'Tamil Nadu',
        district: 'Salem',
        category: 'OBC',
        taxPayerStatus: profileType === 'standard' ? 'No' : 'Yes',
        parentGovtCadre: profileType === 'standard' ? 'Group C/D or Private Sector' : 'Private Enterprise Manager',
        annualIncome: profileType === 'standard' ? 420000 : 750000,
        purpose: 'Central Government UPSC / SSC Examination Reservation'
      });
    } else if (service.id === 31) { // EWS Certificate
      setFormData({
        name: 'Ramesh Sundaram',
        age: 23,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        category: 'General',
        annualIncome: profileType === 'standard' ? 320000 : 540000,
        ewsLandArea: 'Under 5 Acres Agricultural Land',
        ewsFlatArea: 'Under 1000 sq ft Residential Flat',
        purpose: 'EWS 10% Quota for Central Higher Educational Institutions'
      });
    } else if (service.id === 32) { // OBC Certificate
      setFormData({
        name: 'Dinesh Balan',
        age: 21,
        state: 'Tamil Nadu',
        district: 'Dindigul',
        category: 'OBC',
        parentCasteCertAvailable: profileType === 'standard' ? 'Yes' : 'No',
        purpose: 'Central Government Employment Reservation (OBC Schedule)'
      });
    } else if (service.id === 33) { // SC Certificate
      setFormData({
        name: 'S. Anand',
        age: 24,
        state: 'Tamil Nadu',
        district: 'Vellore',
        category: 'SC',
        parentCasteCertAvailable: profileType === 'standard' ? 'Yes' : 'No',
        purpose: 'Constitutional SC Quota Verification for Technical Education'
      });
    } else if (service.id === 34) { // ST Certificate
      setFormData({
        name: 'C. Murugesan',
        age: 29,
        state: 'Tamil Nadu',
        district: 'Nilgiris',
        category: 'ST',
        rdoInquiryDone: profileType === 'standard' ? 'Yes (RDO Field Inquiry Completed)' : 'Pending Revenue Inquiry',
        purpose: 'Scheduled Tribe Community Verification Certificate'
      });
    } else if (service.id === 35) { // Disability / UDID Card
      setFormData({
        name: 'P. Vignesh',
        age: 31,
        state: 'Tamil Nadu',
        district: 'Trichy',
        disabilityStatus: 'Yes',
        disabilityType: 'Locomotor Disability (Lower Limb)',
        disabilityPercentage: profileType === 'standard' ? 55 : 85,
        purpose: 'Swavlamban UDID Smart Card & Statutory PwD Concessions'
      });
    } else if (service.id === 36) { // Senior Citizen Certificate
      setFormData({
        name: 'G. Sundaram',
        age: profileType === 'standard' ? 68 : 82,
        state: 'Tamil Nadu',
        district: 'Chennai',
        bloodGroup: 'B+ Positive',
        purpose: 'Senior Citizen Identity Card & Transport Fare Concessions'
      });
    } else if (service.id === 37) { // Solvency Certificate
      setFormData({
        name: 'K. S. Manickam',
        age: 48,
        state: 'Tamil Nadu',
        district: 'Erode',
        solvencyAmount: profileType === 'standard' ? 2500000 : 10000000,
        propertyValuationType: 'Approved Civil Engineer / PWD Registered Valuer Report',
        purpose: 'Government PWD Tender / Judicial Court Surety Solvency'
      });
    } else if (service.id === 38) { // Encumbrance Certificate
      setFormData({
        name: 'Subramanian N',
        age: 42,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        ecSearchYears: profileType === 'standard' ? 15 : 30,
        propertySurveyNumber: 'SF No. 248/1A, Ward 7',
        purpose: 'Bank Housing Loan Title Clearance / Property Sale Verification'
      });
    } else if (service.id === 39) { // Land Patta / Patta Transfer
      setFormData({
        name: 'R. Velusamy',
        age: 46,
        state: 'Tamil Nadu',
        district: 'Tiruppur',
        pattaTransferMode: profileType === 'standard' ? 'Registered Sale Deed Purchase' : 'Inheritance / Legal Succession',
        propertySurveyNumber: 'Survey No. 89/4B',
        purpose: 'Revenue Record Name Mutation & Computerized e-Patta Passbook'
      });
    } else if (service.id === 40) { // Chitta / Adangal
      setFormData({
        name: 'Thangavel P',
        age: 52,
        state: 'Tamil Nadu',
        district: 'Thanjavur',
        landType: 'Nanja (Wet) Agricultural Land',
        villageKhataNo: 'Khata No. 114, Survey No. 42/3',
        purpose: 'Crop Insurance Claim & Primary Agriculture Cooperative Credit'
      });
    } else if (service.id === 41) { // Property Tax Payment
      setFormData({
        name: 'Lakshmi Narayanan',
        age: 45,
        state: 'Tamil Nadu',
        district: 'Chennai',
        propertyAssessmentNo: 'Corp Assessment # 08/114/05921',
        zoneWard: 'Zone 8, Ward 114 (Anna Nagar)',
        purpose: 'Urban Local Body Municipal Property Tax Assessment & No-Due'
      });
    } else if (service.id === 42) { // Building Plan Approval
      setFormData({
        name: 'S. Rajagopalan (Builder/Applicant)',
        age: 43,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        buildingType: profileType === 'standard' ? 'Residential (Individual Villa Under 15m)' : 'Commercial / Multi-Storey Building',
        buildingHeightOver15m: profileType === 'standard' ? 'No' : 'Yes',
        purpose: 'DTCP / LPA Sanctioned Building Construction Permit'
      });
    } else if (service.id === 43) { // Trade Licence
      setFormData({
        name: 'Sri Krishna Enterprises (Proprietor: K. Balaji)',
        age: 39,
        state: 'Tamil Nadu',
        district: 'Madurai',
        tradeCategory: profileType === 'standard' ? 'Retail General Merchandise' : 'Food Processing / Restaurant / Hazardous Trade',
        establishmentSqFt: '850 sq ft',
        purpose: 'Municipal Corporation Annual Dangerous & Offensive (D&O) Trade Licence'
      });
    } else if (service.id === 44) { // Shop & Establishment Registration
      setFormData({
        name: 'Apex Retail Stores (Employer: V. Chandran)',
        age: 37,
        state: 'Tamil Nadu',
        district: 'Chennai',
        employeeCount: profileType === 'standard' ? 5 : 18,
        operatingHours: '09:00 AM to 09:30 PM',
        purpose: 'Labour Department Shop & Commercial Establishment Registration'
      });
    } else if (service.id === 45) { // Professional Tax Registration
      setFormData({
        name: 'Apex Infotech Solutions (Director: N. Karthik)',
        age: 35,
        state: 'Tamil Nadu',
        district: 'Chennai',
        businessEntityType: profileType === 'standard' ? 'Proprietorship / Individual Firm' : 'Private Limited Company',
        numberOfStaff: profileType === 'standard' ? 8 : 45,
        purpose: 'Municipal Corporation Professional Tax Employer Enrollment'
      });
    } else if (service.id === 46) { // Factory Licence
      setFormData({
        name: 'Vanguard Precision Engineering Ltd (Occupier: T. Swaminathan)',
        age: 49,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        factoryPowerHP: profileType === 'standard' ? '40 HP' : '120 HP (Heavy Machinery)',
        workerCount: profileType === 'standard' ? 24 : 85,
        hasBoilerHazards: profileType === 'standard' ? 'No' : 'Yes',
        purpose: 'Directorate of Industrial Safety & Health (DISH) Factory Licence'
      });
    } else if (service.id === 47) { // FSSAI Food Business Licence
      setFormData({
        name: 'Annam Gourmet Foods (Operator: S. Mahadevan)',
        age: 36,
        state: 'Tamil Nadu',
        district: 'Trichy',
        foodBusinessType: profileType === 'standard' ? 'Petty Retailer / Restaurant' : 'Food Manufacturer / Repacker',
        annualIncome: profileType === 'standard' ? 950000 : 4500000,
        purpose: 'FSSAI Food Safety & Standards Authority FoSCoS Licence'
      });
    } else if (service.id === 48) { // GST Registration
      setFormData({
        name: 'Southern Logistics & Trading Co (Authorized: M. Ramesh)',
        age: 41,
        state: 'Tamil Nadu',
        district: 'Chennai',
        gstEntityConstitution: profileType === 'standard' ? 'Proprietorship' : 'Partnership Firm',
        annualIncome: profileType === 'standard' ? 4500000 : 12500000,
        purpose: 'Goods & Services Tax Network (GSTN) Mandatory 15-Digit GSTIN'
      });
    } else if (service.id === 49) { // EPFO / PF Account Services
      setFormData({
        name: 'P. Saravanan',
        age: 33,
        state: 'Tamil Nadu',
        district: 'Salem',
        epfRequestType: profileType === 'standard' ? 'UAN Member Activation & Online KYC' : 'Joint Declaration Demographic Correction',
        uanNumber: '101482910452',
        purpose: 'EPFO Unified Portal PF Transfer / Partial Advance Claim'
      });
    } else if (service.id === 50) { // ESIC Registration / Services
      setFormData({
        name: 'G. Kannan',
        age: 29,
        state: 'Tamil Nadu',
        district: 'Chennai',
        insuredPersonNo: 'IP # 5192847103',
        hasFamilyDependents: profileType === 'standard' ? 'Yes (Spouse & 2 Children)' : 'Self Only',
        annualIncome: 216000,
        purpose: 'ESIC Pehchan Smart Card & ESI Hospital Dispensary Attachment'
      });
    } else if (service.id === 51) { // National Scholarship Application
      setFormData({
        name: 'A. Meena',
        age: 20,
        state: 'Tamil Nadu',
        district: 'Madurai',
        courseName: 'B.Sc Agriculture (Honours)',
        institution: 'Agricultural College & Research Institute',
        studentResidenceType: profileType === 'standard' ? 'Day Scholar' : 'Hosteller (College Hostel Resident)',
        annualIncome: 140000,
        category: 'OBC',
        marksPercentage: 88,
        disabilityStatus: 'No',
        purpose: 'National Scholarship Portal (NSP) Central Sector Scheme'
      });
    } else {
      setFormData({
        name: 'A. Rajesh',
        age: 32,
        state: 'Tamil Nadu',
        district: 'Salem',
        occupation: 'Agricultural Worker / Farmer',
        annualIncome: 80000,
        category: 'MBC',
        hasBplCard: 'Yes',
        purpose: `Application for ${service.service_name}`
      });
    }
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button and service badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Service</span>
        </button>

        <div className="text-xs bg-emerald-50 text-emerald-800 font-medium px-3 py-1 rounded-full border border-emerald-200">
          Selected Service: <strong className="font-bold">{service.service_name}</strong>
        </div>
      </div>

      {/* Main Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Applicant Details
        </h1>
        <p className="text-slate-600 text-sm">
          Please provide the basic details required for <strong className="text-slate-900">{service.service_name}</strong>.
          The AI will analyze these against official regulations to personalize your document checklist.
        </p>
      </div>

      {/* Demo pre-fill assistance */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Quick Demo: Populate sample applicant circumstances:</span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => fillSampleData('standard')}
            className="flex-1 sm:flex-none px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Fill Benchmark Case
          </button>
          <button
            type="button"
            onClick={() => fillSampleData('conditional')}
            className="flex-1 sm:flex-none px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Fill Conditional Case
          </button>
        </div>
      </div>

      {/* Validation Error Alert Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-900 mb-1">Please fill in all required fields:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Core Citizen Identity */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            1. Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Full Legal Name <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => toggleTooltip('name')}
                  className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-0.5"
                  title="Why do we ask this?"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Why ask?</span>
                </button>
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="e.g. Karthik Subramanian"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              {activeTooltip === 'name' && (
                <div className="text-xs bg-slate-800 text-slate-200 p-2 rounded mt-1">
                  Required to verify identity documents match the applicant legal record.
                </div>
              )}
            </div>

            {/* Age */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Age (Years) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => toggleTooltip('age')}
                  className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-0.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Why ask?</span>
                </button>
              </div>
              <input
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={e => handleChange('age', e.target.value)}
                placeholder="e.g. 22"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.age ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
              {activeTooltip === 'age' && (
                <div className="text-xs bg-slate-800 text-slate-200 p-2 rounded mt-1">
                  Age determines whether minor or senior citizen rules apply (e.g. 60+ for pensions).
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State / Union Territory <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.state}
                onChange={e => handleChange('state', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Other State">Other State / UT</option>
              </select>
            </div>

            {/* District */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  District <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => toggleTooltip('district')}
                  className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-0.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Why ask?</span>
                </button>
              </div>
              <input
                type="text"
                value={formData.district}
                onChange={e => handleChange('district', e.target.value)}
                placeholder="e.g. Erode, Coimbatore, Salem, Chennai"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.district ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
              {activeTooltip === 'district' && (
                <div className="text-xs bg-slate-800 text-slate-200 p-2 rounded mt-1">
                  Local jurisdiction determines the competent revenue/issuing office (Tahsildar/VAO).
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Service-Specific Fields */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            2. Service-Specific Parameters ({service.service_name})
          </h3>

          {/* Service 1: Income Certificate */}
          {service.id === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Occupation / Source of Livelihood <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.occupation}
                  onChange={e => handleChange('occupation', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${
                    errors.occupation ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                >
                  <option value="">-- Select Occupation --</option>
                  <option value="Student / Dependent">Student / Dependent</option>
                  <option value="Salaried Employee (Private/Govt)">Salaried Employee (Private/Govt)</option>
                  <option value="Self-Employed / Business">Self-Employed / Business Owner</option>
                  <option value="Agricultural Worker / Farmer">Agricultural Worker / Farmer</option>
                  <option value="Daily Wage Laborer">Daily Wage Laborer</option>
                  <option value="Unemployed / Homemaker">Unemployed / Homemaker</option>
                </select>
                {errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Annual Household Income (₹) <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.annualIncome}
                  onChange={e => handleChange('annualIncome', e.target.value)}
                  placeholder="e.g. 150000"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.annualIncome ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.annualIncome && <p className="text-xs text-red-500 mt-1">{errors.annualIncome}</p>}
              </div>
            </div>
          )}

          {/* Service 2: Residence / Domicile Certificate */}
          {service.id === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Years Residing Continuously at Current Address
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.yearsOfResidence}
                  onChange={e => handleChange('yearsOfResidence', e.target.value)}
                  placeholder="e.g. 6"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Accommodation Ownership Type
                </label>
                <select
                  value={formData.accommodationType}
                  onChange={e => handleChange('accommodationType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Owned / Ancestral">Owned / Ancestral House</option>
                  <option value="Rented / Leased">Rented / Leased Accommodation</option>
                  <option value="Government Quarters">Government Staff Quarters</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 3: Scholarship Application */}
          {service.id === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course / Degree Enrolled <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.courseName}
                    onChange={e => handleChange('courseName', e.target.value)}
                    placeholder="e.g. B.Tech Computer Science, MBBS, Diploma"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.courseName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.courseName && <p className="text-xs text-red-500 mt-1">{errors.courseName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Parent / Household Annual Income (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.annualIncome}
                    onChange={e => handleChange('annualIncome', e.target.value)}
                    placeholder="e.g. 180000"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.annualIncome ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.annualIncome && <p className="text-xs text-red-500 mt-1">{errors.annualIncome}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / Institution Name
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={e => handleChange('institution', e.target.value)}
                    placeholder="e.g. Government Engineering College"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Previous Academic Marks (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.marksPercentage}
                    onChange={e => handleChange('marksPercentage', e.target.value)}
                    placeholder="e.g. 84"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Service 4: Community / Caste Certificate */}
          {service.id === 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Do parents or blood relatives have a community certificate?
                </label>
                <select
                  value={formData.relativeCasteCertAvailable}
                  onChange={e => handleChange('relativeCasteCertAvailable', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (Father/Sibling certificate available)</option>
                  <option value="No">No (Need local VAO/Tahsildar spot verification enquiry)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School TC with Caste entry available?
                </label>
                <select
                  value={formData.schoolTcAvailable || 'Yes'}
                  onChange={e => handleChange('schoolTcAvailable', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (School Transfer Certificate records community)</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 5: Birth Certificate Registration */}
          {service.id === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Birth Event Registration Timeline
                </label>
                <select
                  value={formData.delayedDays}
                  onChange={e => handleChange('delayedDays', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Under 21 Days">Within 21 Days (Normal Institutional Registration)</option>
                  <option value="21 to 30 Days">21 to 30 Days (Late Fee applicable)</option>
                  <option value="Over 30 Days (Delayed Registration)">Over 30 Days up to 1 Year+ (Magistrate / Revenue Order required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Place of Delivery
                </label>
                <select
                  value={formData.deliveryPlace || 'Hospital'}
                  onChange={e => handleChange('deliveryPlace', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Hospital">Government / Private Hospital (Discharge Form-1)</option>
                  <option value="Home">Home Delivery (Local Village Health Nurse report)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 6: Old Age / Social Security Pension */}
          {service.id === 6 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pension Category Scheme
                </label>
                <select
                  value={formData.pensionCategory}
                  onChange={e => handleChange('pensionCategory', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Old Age Pension (Destitute Senior Citizen)">Old Age Pension (Indigent Senior Citizen 60+)</option>
                  <option value="Widow / Destitute Pension">Widow / Destitute Women Pension</option>
                  <option value="Disability Pension">Differently-Abled Pension</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Below Poverty Line (BPL) Card Holder?
                </label>
                <select
                  value={formData.hasBplCard}
                  onChange={e => handleChange('hasBplCard', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (Have BPL / PHH Ration Card)</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 7: Affordable Housing Scheme (PMAY) */}
          {service.id === 7 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Annual Household Income (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.annualIncome}
                  onChange={e => handleChange('annualIncome', e.target.value)}
                  placeholder="e.g. 95000"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.annualIncome ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.annualIncome && <p className="text-xs text-red-500 mt-1">{errors.annualIncome}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Do you own a construction land plot / patta?
                </label>
                <select
                  value={formData.ownsLandPlot}
                  onChange={e => handleChange('ownsLandPlot', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (Own legal plot with patta / title deed)</option>
                  <option value="No">No (Applying for government allocated tenement)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 8: CSIS Education Loan Interest Subsidy */}
          {service.id === 8 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Professional / Technical Course Enrolled <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.courseName}
                  onChange={e => handleChange('courseName', e.target.value)}
                  placeholder="e.g. MBBS, B.Tech, MBA, MCA"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.courseName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.courseName && <p className="text-xs text-red-500 mt-1">{errors.courseName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Annual Family Income (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.annualIncome}
                  onChange={e => handleChange('annualIncome', e.target.value)}
                  placeholder="e.g. 320000"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.annualIncome ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.annualIncome && <p className="text-xs text-red-500 mt-1">{errors.annualIncome}</p>}
              </div>
            </div>
          )}

          {/* Service 9: Nativity Certificate */}
          {service.id === 9 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Were you born outside the state?
                </label>
                <select
                  value={formData.bornOutsideState || 'No'}
                  onChange={e => handleChange('bornOutsideState', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (Born within the state)</option>
                  <option value="Yes">Yes (Born outside state - Parents Nativity Proof required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Claiming Nativity via Ancestral Land?
                </label>
                <select
                  value={formData.ancestralPropertyClaim || 'No'}
                  onChange={e => handleChange('ancestralPropertyClaim', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (Based on birth/schooling records)</option>
                  <option value="Yes">Yes (Submitting ancestral registered land title deed)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 10: Death Certificate */}
          {service.id === 10 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Death Registration Timeline
                </label>
                <select
                  value={formData.delayedDays || 'Under 21 Days'}
                  onChange={e => handleChange('delayedDays', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Under 21 Days">Within 21 Days (Normal Registration)</option>
                  <option value="21 to 30 Days">21 to 30 Days (Late Fee applicable)</option>
                  <option value="Over 30 Days (Delayed Registration)">Over 30 Days (Magistrate Sanction Order required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Circumstances / Cause of Demise
                </label>
                <select
                  value={formData.causeOfDeath || 'Natural Medical Cause'}
                  onChange={e => handleChange('causeOfDeath', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Natural Medical Cause">Natural Medical Cause (Hospital / Home)</option>
                  <option value="Accidental / Unnatural Demise">Accidental / Unnatural (Police FIR & Autopsy required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 11: Legal Heir Certificate */}
          {service.id === 11 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Applying on behalf of all heirs for single settlement?
                </label>
                <select
                  value={formData.claimingNoc || 'No'}
                  onChange={e => handleChange('claimingNoc', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (Standard joint legal heir verification)</option>
                  <option value="Yes">Yes (NOC Affidavits from other surviving co-heirs required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Surviving Spouse Name Status
                </label>
                <select
                  value={formData.spouseNameUpdated || 'Yes'}
                  onChange={e => handleChange('spouseNameUpdated', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Updated on family ration card and deceased identity proofs</option>
                  <option value="No">Not updated (Marriage certificate / Service record required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 12: Marriage Certificate */}
          {service.id === 12 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Previous Marriage / Remarriage Status
                </label>
                <select
                  value={formData.remarriageStatus || 'No'}
                  onChange={e => handleChange('remarriageStatus', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (First Marriage for both Bride and Groom)</option>
                  <option value="Yes">Yes (Remarriage - Divorce Decree or Death Certificate required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Spouse Nationality
                </label>
                <select
                  value={formData.foreignSpouseStatus || 'No'}
                  onChange={e => handleChange('foreignSpouseStatus', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">Both Indian Citizens</option>
                  <option value="Yes">NRI / Foreign National Spouse (Embassy NOC required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 13: Aadhaar Card / Update */}
          {service.id === 13 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Do you have address proof in your own name?
                </label>
                <select
                  value={formData.hasOwnAddressProof || 'Yes'}
                  onChange={e => handleChange('hasOwnAddressProof', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (Have electricity bill, bank statement, or rent agreement)</option>
                  <option value="No">No (Update address via Head of Family - HoF Self-Declaration)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Are you applying for a legal name change?
                </label>
                <select
                  value={formData.isLegalNameChange || 'No'}
                  onChange={e => handleChange('isLegalNameChange', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (Minor spelling correction or standard demographic update)</option>
                  <option value="Yes">Yes (Major legal name change - Official Gazette Notification required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 14: PAN Card */}
          {service.id === 14 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  PAN Applicant Category
                </label>
                <select
                  value={formData.panCitizenType || 'Individual (Adult)'}
                  onChange={e => handleChange('panCitizenType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Individual (Adult)">Individual Adult (18+ Years)</option>
                  <option value="Minor Child (via Representative Assessee)">Minor Child (Representative Assessee Guardian required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Name / Surname Modification
                </label>
                <select
                  value={formData.nameChangeReason || 'None'}
                  onChange={e => handleChange('nameChangeReason', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="None">None (Fresh PAN / Identical identity details)</option>
                  <option value="Marriage / Legal">Surname update after marriage / Legal name amendment</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 15: Passport */}
          {service.id === 15 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Passport Processing Scheme
                </label>
                <select
                  value={formData.passportScheme || 'Normal Scheme'}
                  onChange={e => handleChange('passportScheme', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Normal Scheme">Normal Scheme (Standard processing)</option>
                  <option value="Tatkaal">Tatkaal Scheme (Urgent fast-track - Annexure E required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Passport Application Type
                </label>
                <select
                  value={formData.passportApplicationType || 'Fresh Passport'}
                  onChange={e => handleChange('passportApplicationType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Fresh Passport">Fresh Passport</option>
                  <option value="Renewal / Re-issue">Renewal / Re-issue (Old Passport required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 16: Voter ID */}
          {service.id === 16 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Electoral Application Type
                </label>
                <select
                  value={formData.voterApplicationType || 'New Voter Registration (Form 6)'}
                  onChange={e => handleChange('voterApplicationType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="New Voter Registration (Form 6)">New Voter Enrollment (Form 6 - First time voter 18+)</option>
                  <option value="Shifting / Correction (Form 8)">Shifting of Residence / Correction (Form 8 - Old EPIC required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Accommodation Status
                </label>
                <select
                  value={formData.accommodationType || 'Owned / Ancestral'}
                  onChange={e => handleChange('accommodationType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Owned / Ancestral">Owned Family House (Utility Bill in family name)</option>
                  <option value="Hostel / Tenant">Hostel / Rented Room (Landlord/Warden declaration required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 17: Driving Licence */}
          {service.id === 17 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Licence Application Stage
                </label>
                <select
                  value={formData.dlApplicationType || "Learner's Licence (LL)"}
                  onChange={e => handleChange('dlApplicationType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Learner's Licence (LL)">Applying for Learner's Licence (LL)</option>
                  <option value="Permanent DL (Already have LL)">Applying for Permanent DL (Have active LL over 30 days)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Licence Vehicle Class
                </label>
                <select
                  value={formData.dlCategory || 'Motorcycle / LMV (Private)'}
                  onChange={e => handleChange('dlCategory', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Motorcycle / LMV (Private)">Two-Wheeler / Light Motor Vehicle (Private)</option>
                  <option value="Transport / Commercial">Commercial Transport / Heavy Goods (Form 1A & Form 5 required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 18: Vehicle Registration */}
          {service.id === 18 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Financing Status
                </label>
                <select
                  value={formData.vehicleFinanceStatus || 'Self-Financed'}
                  onChange={e => handleChange('vehicleFinanceStatus', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Self-Financed">Self-Financed (Fully Paid)</option>
                  <option value="Hypothecated (Financed/Loan)">Bank Auto Loan / Finance (Form 34 Hypothecation required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registration Type
                </label>
                <select
                  value={formData.vehicleTransferType || 'New Vehicle Registration'}
                  onChange={e => handleChange('vehicleTransferType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="New Vehicle Registration">Brand New Vehicle Registration</option>
                  <option value="Inter-State Transfer">Inter-State Transfer / Re-registration (Form 28 NOC required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 19: Ration Card */}
          {service.id === 19 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ration Card Application Type
                </label>
                <select
                  value={formData.rationCardType || 'New Family Card'}
                  onChange={e => handleChange('rationCardType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="New Family Card">New Family Smart Card</option>
                  <option value="Splitting / Relocation">Splitting / Relocation (Surrender/Deletion Certificate required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Domestic LPG Gas Connection
                </label>
                <select
                  value={formData.hasLpgConnection || 'No'}
                  onChange={e => handleChange('hasLpgConnection', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No LPG Gas Connection</option>
                  <option value="Yes">Yes (Declare consumer booklet for subsidized quota allocation)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 20: PM-KISAN */}
          {service.id === 20 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Agricultural Land Title Status
                </label>
                <select
                  value={formData.landSuccessionType || 'Self-Owned Land Record'}
                  onChange={e => handleChange('landSuccessionType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Self-Owned Land Record">Self-Owned Land Record (Direct Khatauni / Jamabandi in farmer name)</option>
                  <option value="Inherited / Mutation in Progress">Inherited Land (Succession Mutation / Vamshavruksha required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cultivable Landholding Size (Acres)
                </label>
                <input
                  type="text"
                  value={formData.landSize || '2.5 Acres'}
                  onChange={e => handleChange('landSize', e.target.value)}
                  placeholder="e.g. 2.5 Acres"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 21: Ayushman Bharat / PM-JAY */}
          {service.id === 21 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Do you have a PM-JAY Family Letter / SECC HHID?
                </label>
                <select
                  value={formData.hasSeccLetter || 'No'}
                  onChange={e => handleChange('hasSeccLetter', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (Verifying via Ration Card & Aadhaar OTP)</option>
                  <option value="Yes">Yes (Have official SECC PM-JAY Family ID letter)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Food Security (Ration Card) Type
                </label>
                <select
                  value={formData.rationType || 'PHH / BPL Card'}
                  onChange={e => handleChange('rationType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="PHH / BPL Card">Priority Household (PHH) / Below Poverty Line (BPL)</option>
                  <option value="AAY Card">Antyodaya Anna Yojana (AAY - Poorest of Poor)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 22: Disability Pension */}
          {service.id === 22 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certified Disability Percentage (%)
                </label>
                <select
                  value={formData.disabilityPercentage || '50'}
                  onChange={e => handleChange('disabilityPercentage', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="50">40% to 79% (Standard Disability Pension)</option>
                  <option value="85">80% and above (Severe Disability - High Support Need Grant)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unique Disability ID (UDID) Card
                </label>
                <select
                  value={formData.hasUdidCard || 'Yes'}
                  onChange={e => handleChange('hasUdidCard', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (Have digital UDID Card / Medical Certificate)</option>
                  <option value="No">No (Need District Medical Board appointment)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 23: Unemployment Assistance */}
          {service.id === 23 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Employment Exchange Continuous Live Registration
                </label>
                <select
                  value={formData.employmentLiveYears || '3+ Years Continuous Registration'}
                  onChange={e => handleChange('employmentLiveYears', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="3+ Years Continuous Registration">3+ Years Continuous Live Registration</option>
                  <option value="5+ Years Registration">5+ Years Continuous Live Registration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Highest Educational Qualification
                </label>
                <select
                  value={formData.educationQualification || 'Graduate Degree'}
                  onChange={e => handleChange('educationQualification', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="10th / SSLC Pass">10th / SSLC Pass</option>
                  <option value="12th / HSC Pass">12th / Higher Secondary Pass</option>
                  <option value="Graduate Degree">Graduate / Post-Graduate Degree</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 24: Labour Card / e-Shram */}
          {service.id === 24 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unorganized Worker Occupation Trade
                </label>
                <select
                  value={formData.occupationTrade || 'Construction / Mason'}
                  onChange={e => handleChange('occupationTrade', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Construction / Mason">Construction Worker / Painter / Mason</option>
                  <option value="Agricultural Labourer">Agricultural Labourer / Farm Worker</option>
                  <option value="Street Vendor">Street Vendor / Hawkers / Small Trader</option>
                  <option value="Domestic Worker">Domestic Worker / House Maid</option>
                  <option value="Auto / Transport Driver">Auto-Rickshaw / Commercial Driver</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nominee for ₹2 Lakh Accidental Insurance Cover
                </label>
                <select
                  value={formData.hasNominee || 'No'}
                  onChange={e => handleChange('hasNominee', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">None at present</option>
                  <option value="Yes">Yes (Attach Nominee ID Proof for PMSBY Cover)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 25: BOCW Welfare Scheme */}
          {service.id === 25 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  90-Day Construction Work Engagement Proof
                </label>
                <select
                  value={formData.has90DayWorkCert || 'Yes'}
                  onChange={e => handleChange('has90DayWorkCert', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (Form-V from Registered Builder / Trade Union available)</option>
                  <option value="No">No (Requires Labour Inspector site verification)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  BOCW Scheme Benefit Claim Type
                </label>
                <select
                  value={formData.bocwClaimType || 'General Worker Registration'}
                  onChange={e => handleChange('bocwClaimType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="General Worker Registration">Fresh Worker Passbook Registration</option>
                  <option value="Children Education Scholarship">Children Education Scholarship Grant (School Bonafide required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 26: Small Business / MSME Registration */}
          {service.id === 26 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enterprise Constitution Type
                </label>
                <select
                  value={formData.enterpriseType || 'Proprietorship'}
                  onChange={e => handleChange('enterpriseType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership Firm">Partnership Firm (Partnership Deed required)</option>
                  <option value="Private Limited / LLP">Private Limited Company / LLP (Incorporation Certificate required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GST Registration Status
                </label>
                <select
                  value={formData.isGstLiable || 'No'}
                  onChange={e => handleChange('isGstLiable', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">Exempted / Turnover below GST mandatory threshold</option>
                  <option value="Yes">Yes (Attach 15-digit GSTIN Certificate)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 27: Domicile Certificate */}
          {service.id === 27 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Basis of Domicile Claim
                </label>
                <select
                  value={formData.domicileBasis || 'Continuous 5+ Years Residence in State'}
                  onChange={e => handleChange('domicileBasis', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Continuous 5+ Years Residence in State">Continuous 5+ Years Residence in State (VAO / Revenue Report)</option>
                  <option value="Parental Ancestral Origin">Parental Ancestral Origin / Native Heritage</option>
                  <option value="State Govt / PSU Employee Ward">Ward of State Government / Defense Personnel</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Consecutive Years of Residence in State
                </label>
                <input
                  type="number"
                  value={formData.yearsOfResidence || 10}
                  onChange={e => handleChange('yearsOfResidence', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 28: Character Certificate */}
          {service.id === 28 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certificate Request Purpose
                </label>
                <select
                  value={formData.characterCertPurpose || 'State Public Service Commission Employment'}
                  onChange={e => handleChange('characterCertPurpose', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="State Public Service Commission Employment">Government / PSU Employment Appointment</option>
                  <option value="Passport / Overseas Visa Clearance">Passport / Overseas Visa Police Clearance</option>
                  <option value="Arms Licence / Security Agency">Arms Licence / Security Agency Registration</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Local Police Station Jurisdiction
                </label>
                <input
                  type="text"
                  value={formData.policeStation || 'Central Police Station'}
                  onChange={e => handleChange('policeStation', e.target.value)}
                  placeholder="e.g. Town West Police Station"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 29: Unemployment Certificate */}
          {service.id === 29 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Duration of Post-Study Unemployment
                </label>
                <select
                  value={formData.unemploymentDuration || '2+ Years Post Graduation'}
                  onChange={e => handleChange('unemploymentDuration', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Under 1 Year">Under 1 Year</option>
                  <option value="1 to 2 Years">1 to 2 Years</option>
                  <option value="2+ Years Post Graduation">2+ Years Post Graduation</option>
                  <option value="5+ Years Registered">5+ Years Registered</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  District Employment Exchange Enrolment
                </label>
                <input
                  type="text"
                  value={formData.employmentRegNo || 'TN-EMP-2022-849102'}
                  onChange={e => handleChange('employmentRegNo', e.target.value)}
                  placeholder="Registration Card Number"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 30: Non-Creamy Layer Certificate */}
          {service.id === 30 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent Income Tax Payer Status
                </label>
                <select
                  value={formData.taxPayerStatus || 'No'}
                  onChange={e => handleChange('taxPayerStatus', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (Annual Family Gross Income below ₹8 Lakhs)</option>
                  <option value="Yes">Yes (Attach 3-Year Income Tax Returns / Form 16)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent Employment Cadre
                </label>
                <select
                  value={formData.parentGovtCadre || 'Group C/D or Private Sector'}
                  onChange={e => handleChange('parentGovtCadre', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Group C/D or Private Sector">Group C/D, Agricultural or Unorganized Private</option>
                  <option value="Group A/B Direct Recruit">Group A or Class I Officer (Subject to Creamy Layer Exclusion)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 31: EWS Certificate */}
          {service.id === 31 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Family Agricultural Landholding
                </label>
                <select
                  value={formData.ewsLandArea || 'Under 5 Acres Agricultural Land'}
                  onChange={e => handleChange('ewsLandArea', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Under 5 Acres Agricultural Land">Under 5 Acres (Eligible for EWS)</option>
                  <option value="No Agricultural Land">No Agricultural Land Owned</option>
                  <option value="5 Acres or more">5 Acres or More (Exceeds EWS Ceiling)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Residential Property Size
                </label>
                <select
                  value={formData.ewsFlatArea || 'Under 1000 sq ft Residential Flat'}
                  onChange={e => handleChange('ewsFlatArea', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Under 1000 sq ft Residential Flat">Flat under 1000 sq ft / Plot under 100 sq yards</option>
                  <option value="Over 1000 sq ft Residential Flat">Plot/Flat exceeding 1000 sq ft ceiling</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 32: OBC Certificate */}
          {service.id === 32 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  OBC Community Name (Central/State Schedule)
                </label>
                <input
                  type="text"
                  value={formData.obcSubCaste || 'Kongu Vellalar / Yadav / Saini'}
                  onChange={e => handleChange('obcSubCaste', e.target.value)}
                  placeholder="Official caste name as in Gazette"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Father / Mother Community Certificate Available
                </label>
                <select
                  value={formData.parentCasteCertAvailable || 'Yes'}
                  onChange={e => handleChange('parentCasteCertAvailable', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (Attach Parent's Official Community Certificate)</option>
                  <option value="No">No (Requires School TC with Community Entry)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 33: SC Certificate */}
          {service.id === 33 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Scheduled Caste Community Name
                </label>
                <input
                  type="text"
                  value={formData.subCaste || 'Adi Dravidar / Paraiyar / Chamar'}
                  onChange={e => handleChange('subCaste', e.target.value)}
                  placeholder="Community specified under Presidential Order"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent / Sibling SC Certificate Available
                </label>
                <select
                  value={formData.parentCasteCertAvailable || 'Yes'}
                  onChange={e => handleChange('parentCasteCertAvailable', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes">Yes (Attach Blood Relative Community Certificate)</option>
                  <option value="No">No (Requires Revenue Inspector Local Enrolment Verification)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 34: ST Certificate */}
          {service.id === 34 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Scheduled Tribe Community Name
                </label>
                <input
                  type="text"
                  value={formData.stTribeName || 'Irular / Kurumbas / Toda / Gond'}
                  onChange={e => handleChange('stTribeName', e.target.value)}
                  placeholder="Scheduled Tribe name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Revenue Divisional Officer (RDO) Inquiry Status
                </label>
                <select
                  value={formData.rdoInquiryDone || 'Yes (RDO Field Inquiry Completed)'}
                  onChange={e => handleChange('rdoInquiryDone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes (RDO Field Inquiry Completed)">Field Inquiry by RDO / Sub-Collector Completed</option>
                  <option value="Pending Revenue Inquiry">Pending Revenue Inquiry (Genealogy Tree Affidavit Required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 35: Disability Certificate / UDID Card */}
          {service.id === 35 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Disability Category Type
                </label>
                <select
                  value={formData.disabilityType || 'Locomotor Disability (Lower Limb)'}
                  onChange={e => handleChange('disabilityType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Locomotor Disability (Lower Limb)">Locomotor Disability / Orthopedic</option>
                  <option value="Visual Impairment">Visual Impairment (Blindness / Low Vision)</option>
                  <option value="Hearing Impairment">Hearing Impairment (Deaf / Hard of Hearing)</option>
                  <option value="Intellectual Disability">Intellectual Disability / Autism Spectrum</option>
                  <option value="Multiple Disabilities">Multiple Disabilities</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Disability Assessment Percentage (%)
                </label>
                <input
                  type="number"
                  value={formData.disabilityPercentage || 50}
                  onChange={e => handleChange('disabilityPercentage', parseInt(e.target.value) || 0)}
                  min="40"
                  max="100"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 36: Senior Citizen Certificate */}
          {service.id === 36 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Applicant Blood Group (Printed on Smart Card)
                </label>
                <input
                  type="text"
                  value={formData.bloodGroup || 'O+ Positive'}
                  onChange={e => handleChange('bloodGroup', e.target.value)}
                  placeholder="e.g. O+ Positive, B+ Positive"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emergency Relative Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact || '9876543210'}
                  onChange={e => handleChange('emergencyContact', e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 37: Solvency Certificate */}
          {service.id === 37 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Solvency Value Amount Requested (₹)
                </label>
                <input
                  type="number"
                  value={formData.solvencyAmount || 2500000}
                  onChange={e => handleChange('solvencyAmount', parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Property Valuation Assessment Basis
                </label>
                <select
                  value={formData.propertyValuationType || 'Approved Civil Engineer / PWD Registered Valuer Report'}
                  onChange={e => handleChange('propertyValuationType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Approved Civil Engineer / PWD Registered Valuer Report">Approved Civil Engineer / PWD Valuer Report with Guideline Value</option>
                  <option value="Fixed Deposit / Bank Solvency Guarantee">Fixed Deposit / Scheduled Bank Solvency Guarantee</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 38: Encumbrance Certificate (Property) */}
          {service.id === 38 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Search Period Duration
                </label>
                <select
                  value={formData.ecSearchYears || 15}
                  onChange={e => handleChange('ecSearchYears', parseInt(e.target.value) || 15)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="15">15 Years (Standard Housing Loan Search)</option>
                  <option value="30">30 Years (Legal Title Clearance / Judicial Search)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Property Survey / Sub-Division Number
                </label>
                <input
                  type="text"
                  value={formData.propertySurveyNumber || 'SF No. 248/1A, Ward 7'}
                  onChange={e => handleChange('propertySurveyNumber', e.target.value)}
                  placeholder="e.g. S.F. No. 128/3B"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 39: Land Patta / Patta Transfer */}
          {service.id === 39 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mode of Land Acquisition
                </label>
                <select
                  value={formData.pattaTransferMode || 'Registered Sale Deed Purchase'}
                  onChange={e => handleChange('pattaTransferMode', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Registered Sale Deed Purchase">Registered Sale Deed Purchase</option>
                  <option value="Inheritance / Legal Succession">Inheritance / Legal Heir Succession</option>
                  <option value="Settlement / Partition Deed">Registered Settlement or Partition Deed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Existing Patta / Khata Number
                </label>
                <input
                  type="text"
                  value={formData.existingPattaNo || 'Patta No. 892, Revenue Village No. 14'}
                  onChange={e => handleChange('existingPattaNo', e.target.value)}
                  placeholder="e.g. Patta No. 892"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 40: Land Ownership / Chitta / Adangal */}
          {service.id === 40 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Land Classification Type
                </label>
                <select
                  value={formData.landType || 'Nanja (Wet) Agricultural Land'}
                  onChange={e => handleChange('landType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Nanja (Wet) Agricultural Land">Nanja (Wet) Irrigated Agricultural Land</option>
                  <option value="Punja (Dry) Agricultural Land">Punja (Dry) Agricultural Land</option>
                  <option value="Natham / Residential Land">Grama Natham / Residential Plot</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Village Khata & Survey Number
                </label>
                <input
                  type="text"
                  value={formData.villageKhataNo || 'Khata No. 114, Survey No. 42/3'}
                  onChange={e => handleChange('villageKhataNo', e.target.value)}
                  placeholder="Khata and Survey No."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 41: Property Tax Payment */}
          {service.id === 41 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Municipal Property Assessment Number
                </label>
                <input
                  type="text"
                  value={formData.propertyAssessmentNo || 'Corp Assessment # 08/114/05921'}
                  onChange={e => handleChange('propertyAssessmentNo', e.target.value)}
                  placeholder="Assessment Number on previous tax receipt"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Municipal Zone / Ward Identifier
                </label>
                <input
                  type="text"
                  value={formData.zoneWard || 'Zone 8, Ward 114 (Anna Nagar)'}
                  onChange={e => handleChange('zoneWard', e.target.value)}
                  placeholder="e.g. Ward 12, West Zone"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 42: Building Plan Approval */}
          {service.id === 42 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Proposed Construction Category
                </label>
                <select
                  value={formData.buildingType || 'Residential (Individual Villa Under 15m)'}
                  onChange={e => handleChange('buildingType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Residential (Individual Villa Under 15m)">Residential Individual House / Villa (Under 15m)</option>
                  <option value="Commercial / Multi-Storey Building">Commercial Complex / Multi-Storey Building (Over 15m - Fire NOC Required)</option>
                  <option value="Industrial Shed / Warehouse">Industrial Warehouse / Factory Shed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Building Height Over 15 Metres
                </label>
                <select
                  value={formData.buildingHeightOver15m || 'No'}
                  onChange={e => handleChange('buildingHeightOver15m', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (Low Rise under 15 metres)</option>
                  <option value="Yes">Yes (High-Rise / Multi-Storey - Requires Fire & Rescue Services NOC)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 43: Trade Licence */}
          {service.id === 43 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trade Operation Classification
                </label>
                <select
                  value={formData.tradeCategory || 'Retail General Merchandise'}
                  onChange={e => handleChange('tradeCategory', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Retail General Merchandise">General Retail / Non-Hazardous Commercial Goods</option>
                  <option value="Food Processing / Restaurant / Hazardous Trade">Food / Restaurant / Catering (Sanitation & FSSAI Required)</option>
                  <option value="Chemical / Timber / Heavy Machinery Trade">Inflammable / Dangerous & Offensive (D&O Fire NOC Required)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Establishment Floor Area (sq ft)
                </label>
                <input
                  type="text"
                  value={formData.establishmentSqFt || '850 sq ft'}
                  onChange={e => handleChange('establishmentSqFt', e.target.value)}
                  placeholder="e.g. 500 sq ft"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 44: Shop & Establishment Registration */}
          {service.id === 44 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Number of Employed Staff
                </label>
                <input
                  type="number"
                  value={formData.employeeCount || 5}
                  onChange={e => handleChange('employeeCount', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Operating Hours & Weekly Closed Day
                </label>
                <input
                  type="text"
                  value={formData.operatingHours || '09:00 AM to 09:30 PM (Sunday Holiday)'}
                  onChange={e => handleChange('operatingHours', e.target.value)}
                  placeholder="e.g. 9 AM - 9 PM"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 45: Professional Tax Registration */}
          {service.id === 45 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business Entity Classification
                </label>
                <select
                  value={formData.businessEntityType || 'Proprietorship / Individual Firm'}
                  onChange={e => handleChange('businessEntityType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Proprietorship / Individual Firm">Proprietorship / Individual Professional</option>
                  <option value="Partnership / LLP / Private Limited">Partnership Firm / Private Limited Company</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Number of Salaried Staff Subject to PT Deduction
                </label>
                <input
                  type="number"
                  value={formData.numberOfStaff || 8}
                  onChange={e => handleChange('numberOfStaff', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 46: Factory Licence */}
          {service.id === 46 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Installed Machine Motive Power (Horsepower - HP)
                </label>
                <input
                  type="text"
                  value={formData.factoryPowerHP || '40 HP'}
                  onChange={e => handleChange('factoryPowerHP', e.target.value)}
                  placeholder="e.g. 50 HP"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  High-Pressure Boilers / Hazardous Chemicals Present
                </label>
                <select
                  value={formData.hasBoilerHazards || 'No'}
                  onChange={e => handleChange('hasBoilerHazards', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">No (Standard Mechanical / Light Assembly)</option>
                  <option value="Yes">Yes (Boiler Inspectorate & Hazardous Emergency Plan Required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 47: FSSAI Food Business Licence */}
          {service.id === 47 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Food Business Enterprise Type
                </label>
                <select
                  value={formData.foodBusinessType || 'Petty Retailer / Restaurant'}
                  onChange={e => handleChange('foodBusinessType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Petty Retailer / Restaurant">Petty Food Retailer / Eatery (Basic Registration)</option>
                  <option value="Food Manufacturer / Repacker">Food Manufacturer / Processor (NABL Water Report Required)</option>
                  <option value="Distributor / Wholesale Trader">Wholesale Distributor / Cold Storage</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Annual Food Business Turnover Range
                </label>
                <select
                  value={formData.foodTurnoverRange || 'Under 12 Lakhs (Registration)'}
                  onChange={e => handleChange('foodTurnoverRange', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Under 12 Lakhs (Registration)">Under ₹12 Lakhs (FSSAI Basic Registration)</option>
                  <option value="Between 12 Lakhs and 20 Crores (State Licence)">₹12 Lakhs to ₹20 Crores (FSSAI State Licence)</option>
                  <option value="Above 20 Crores (Central Licence)">Above ₹20 Crores / 100% EOU (FSSAI Central Licence)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 48: GST Registration */}
          {service.id === 48 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GST Entity Constitution
                </label>
                <select
                  value={formData.gstEntityConstitution || 'Proprietorship'}
                  onChange={e => handleChange('gstEntityConstitution', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Proprietorship">Individual Sole Proprietorship</option>
                  <option value="Partnership Firm">Partnership Firm (Deed & Authorization Letter required)</option>
                  <option value="Private Limited / LLP">Private Limited Company / LLP (Board Resolution required)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inter-State Supplies or E-Commerce Selling
                </label>
                <select
                  value={formData.isInterStateOrEcomm || 'No'}
                  onChange={e => handleChange('isInterStateOrEcomm', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="No">Intra-State (Within State Only)</option>
                  <option value="Yes">Inter-State or Selling via E-Commerce (Mandatory GST Registration)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 49: EPFO / PF Account Services */}
          {service.id === 49 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  EPFO Service Request Type
                </label>
                <select
                  value={formData.epfRequestType || 'UAN Member Activation & Online KYC'}
                  onChange={e => handleChange('epfRequestType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="UAN Member Activation & Online KYC">UAN Member Activation & Online Bank KYC Seeding</option>
                  <option value="Joint Declaration Demographic Correction">Demographic Correction (Joint Declaration Form signed by Employer)</option>
                  <option value="PF Transfer / Partial Advance Withdrawal">PF Account Transfer / Form 31 Advance Claim</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Universal Account Number (UAN)
                </label>
                <input
                  type="text"
                  value={formData.uanNumber || '101482910452'}
                  onChange={e => handleChange('uanNumber', e.target.value)}
                  placeholder="12-digit UAN"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Service 50: ESIC Registration / Services */}
          {service.id === 50 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ESIC Insured Person (IP) Number
                </label>
                <input
                  type="text"
                  value={formData.insuredPersonNo || 'IP # 5192847103'}
                  onChange={e => handleChange('insuredPersonNo', e.target.value)}
                  placeholder="10-digit IP Insurance Number"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Family Dependents Coverage (Form-1 Enrolment)
                </label>
                <select
                  value={formData.hasFamilyDependents || 'Yes (Spouse & 2 Children)'}
                  onChange={e => handleChange('hasFamilyDependents', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Yes (Spouse & 2 Children)">Yes (Family Joint Photograph & Aadhaar Required)</option>
                  <option value="Self Only">Self Only (Individual Coverage)</option>
                </select>
              </div>
            </div>
          )}

          {/* Service 51: National Scholarship Application */}
          {service.id === 51 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Enrolled Degree / Course
                </label>
                <input
                  type="text"
                  value={formData.courseName || 'B.Sc Agriculture (Honours)'}
                  onChange={e => handleChange('courseName', e.target.value)}
                  placeholder="Course and Academic Year"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Residence Status
                </label>
                <select
                  value={formData.studentResidenceType || 'Day Scholar'}
                  onChange={e => handleChange('studentResidenceType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Day Scholar">Day Scholar</option>
                  <option value="Hosteller (College Hostel Resident)">Hosteller (Warden Attested Hostel Fee Receipt Required)</option>
                </select>
              </div>
            </div>
          )}

          {/* Category & Purpose (Applicable to all services) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Social Category
                </label>
                <button
                  type="button"
                  onClick={() => toggleTooltip('category')}
                  className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-0.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Why ask?</span>
                </button>
              </div>
              <select
                value={formData.category}
                onChange={e => handleChange('category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="General">General / Open Competition</option>
                <option value="OBC">Other Backward Class (OBC)</option>
                <option value="MBC">Most Backward Class (MBC)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="Minority">Minority Community</option>
              </select>
              {activeTooltip === 'category' && (
                <div className="text-xs bg-slate-800 text-slate-200 p-2 rounded mt-1">
                  Determines whether Community/Caste Certificate is required for category fee exemptions or reservations.
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Purpose of Application
              </label>
              <input
                type="text"
                value={formData.purpose}
                onChange={e => handleChange('purpose', e.target.value)}
                placeholder="e.g. Higher Education Admission, Welfare Scheme"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Security & Data Privacy Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-800">Citizen Privacy Assurance: </strong>
            We do not collect or store biometric data or sensitive identifiers. Data is exclusively analyzed in real-time against official government documentation rules.
          </p>
        </div>

        {/* Validation Warning Alert above button */}
        {Object.keys(errors).length > 0 && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2.5 font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Please fill in the required applicant details marked with * above before generating your checklist.</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing Regulations & Generating Checklist...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Personalized Checklist with AI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

