import React from 'react';
import { 
  ArrowRight, 
  FileCheck2, 
  UserCheck, 
  Sparkles, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Award,
  Landmark
} from 'lucide-react';
import { Service } from '../types.js';

interface HomePageProps {
  onStart: () => void;
  onSelectService: (service: Service) => void;
  onQuickDemo: (serviceId: number, demoData: any) => void;
  services: Service[];
}

export const HomePage: React.FC<HomePageProps> = ({ onStart, onSelectService, onQuickDemo, services }) => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-850 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-60"></div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Citizen AI Advisory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Know Your Documents <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Before You Apply
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            AI-powered assistance to help you prepare the documents required for government services.
            Prevent incomplete applications with personalized checklists grounded in official regulations.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Find Required Documents</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToHowItWorks}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-slate-400" />
              <span>How It Works</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left text-xs text-slate-300">
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Grounded in MySQL Source of Truth</span>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Zero Hallucination Tolerance Filter</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mandatory & Conditional Split</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards: 3 Steps */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How CitizenDoc AI Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Moving beyond static document lists: Our system cross-references your profile against official government regulations using structured LLM reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-5 border border-blue-100">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Select Service</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
              Choose from public revenue, social justice, higher education, municipal, and welfare services. Each service is loaded with verified departmental requirements.
            </p>
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
              <div className="font-semibold text-slate-700">Supported Services:</div>
              <div>Income, Residence, Scholarships, Caste, Pensions, Housing, Birth & Loans.</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-5 border border-emerald-100">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Details</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
              Provide basic circumstances like district, income, and category. The form dynamically requests only the parameters relevant to the selected service.
            </p>
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
              <div className="font-semibold text-slate-700">Privacy First:</div>
              <div>No Aadhaar biometric numbers or sensitive bank credentials are ever requested.</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-5 border border-purple-100">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Get Personalized Checklist</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
              Gemini analyzes the verified rules to separate mandatory documents from conditional requirements, providing simple language explanations for each item.
            </p>
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
              <div className="font-semibold text-slate-700">Output Formats:</div>
              <div>Interactive prep checklist, verified sources, and official downloadable PDF.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Scenarios Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 sm:p-10 border border-slate-700 shadow-xl">
          <div className="max-w-3xl space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Award className="w-3.5 h-3.5" />
              <span>Official Problem Statement Demo Scenario</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Instant AI Reasoning Scenarios</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Test how Gemini analyzes different citizen profiles against government rules without manually filling the form:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Demo 1 */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Benchmark Scenario</span>
                <h4 className="font-bold text-base text-white">Income Certificate (Student)</h4>
                <p className="text-xs text-slate-400">
                  Citizen: Age 22, District: Erode, Occupation: Student, Income: ₹1,50,000.
                </p>
                <div className="text-xs bg-slate-900/80 p-2 rounded text-slate-300 font-mono">
                  → Mandatory: Aadhaar, Address, Income Proof <br />
                  → Conditional: Bank Passbook
                </div>
              </div>
              <button
                onClick={() => onQuickDemo(1, {
                  name: 'Karthik Subramanian',
                  age: 22,
                  state: 'Tamil Nadu',
                  district: 'Erode',
                  occupation: 'Student',
                  annualIncome: 150000,
                  category: 'General',
                  purpose: 'Higher Education Fee Concession'
                })}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Run Student Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Demo 2 */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Higher Education</span>
                <h4 className="font-bold text-base text-white">Post-Matric Scholarship</h4>
                <p className="text-xs text-slate-400">
                  Citizen: B.Tech 2nd Year, SC Category, Family Income: ₹1,80,000, 82% Marks.
                </p>
                <div className="text-xs bg-slate-900/80 p-2 rounded text-slate-300 font-mono">
                  → Conditional Caste Certificate triggers as mandatory for SC quota!
                </div>
              </div>
              <button
                onClick={() => onQuickDemo(3, {
                  name: 'Priya Dharshini',
                  age: 20,
                  state: 'Tamil Nadu',
                  district: 'Coimbatore',
                  occupation: 'College Student',
                  courseName: 'B.Tech Computer Science',
                  institution: 'Government Engineering College',
                  annualIncome: 180000,
                  category: 'SC',
                  marksPercentage: 82,
                  purpose: 'Post-Matric Tuition Waiver & Hostel Grant'
                })}
                className="w-full py-2.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Run Scholarship Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Demo 3 */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Housing Mission</span>
                <h4 className="font-bold text-base text-white">Affordable Housing (PMAY)</h4>
                <p className="text-xs text-slate-400">
                  Citizen: Daily Wage Earner, Income ₹95,000, owns hereditary plot with kutcha shelter.
                </p>
                <div className="text-xs bg-slate-900/80 p-2 rounded text-slate-300 font-mono">
                  → Land Patta becomes required for Beneficiary-Led Construction!
                </div>
              </div>
              <button
                onClick={() => onQuickDemo(7, {
                  name: 'Murugan Selvam',
                  age: 44,
                  state: 'Tamil Nadu',
                  district: 'Salem',
                  occupation: 'Agricultural Daily Wage Earner',
                  annualIncome: 95000,
                  category: 'MBC',
                  hasPuccaHouse: 'No',
                  ownsLandPlot: 'Yes',
                  purpose: 'Beneficiary-Led Individual House Construction'
                })}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Run Housing Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Principles: Ground Truth vs LLM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Hallucination Architectural Mandate</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Why Government Data Is The Absolute Source Of Truth
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A common defect in general AI tools is hallucinating unapproved credentials (for example, demanding a Passport or Police Verification for a routine Income Certificate).
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                In our architecture, <strong className="text-slate-900">Gemini never invents requirements</strong>. Official rules originate exclusively from the MySQL registry. The backend cross-validates all model responses and rejects any unsupported document before it can reach the citizen.
              </p>
            </div>

            <div className="w-full lg:w-96 bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs space-y-3 font-mono">
              <div className="font-bold text-slate-800 text-sm pb-1 border-b border-slate-200 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-600" />
                <span>Validation Pipeline</span>
              </div>
              <div className="text-slate-600">1. MySQL Official Rules (Ground Truth)</div>
              <div className="text-emerald-700 font-semibold">↓ Context Bound to Prompt</div>
              <div className="text-slate-600">2. Gemini 3.8 Flash Persona Check</div>
              <div className="text-emerald-700 font-semibold">↓ Structured JSON Output</div>
              <div className="text-slate-600">3. Backend Hallucination Filter</div>
              <div className="text-emerald-700 font-semibold">↓ Discard Any Unknown Document</div>
              <div className="text-slate-800 font-bold bg-emerald-100/60 p-2 rounded text-emerald-900">
                ✓ 100% Certified Citizen Checklist
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
