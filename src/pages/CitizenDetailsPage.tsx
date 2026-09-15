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
    
    // Construct sanitized complete data with intelligent defaults
    const sanitizedData: CitizenFormData = {
      ...formData,
      name: formData.name && formData.name.trim() ? formData.name.trim() : 'Citizen Applicant',
      age: formData.age !== '' && formData.age !== undefined && !isNaN(Number(formData.age)) 
        ? Number(formData.age) 
        : (service.id === 6 ? 65 : 25),
      state: formData.state || 'Tamil Nadu',
      district: formData.district && formData.district.trim() ? formData.district.trim() : 'General District Jurisdiction',
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
        purpose: 'Citizen Verification'
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

