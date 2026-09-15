import React from 'react';
import { ShieldCheck, Landmark, CheckCircle, Database, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center text-white">
                <Landmark className="w-4 h-4" />
              </div>
              <span>Citizen Document Checklist Generator</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A public welfare AI initiative designed to prevent citizen application rejections. 
              The system analyzes citizen circumstances against verified government requirements using Google Gemini 
              under strict anti-hallucination safeguards.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                <Database className="w-3 h-3 text-emerald-400" />
                Verified Ground Truth
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                <Cpu className="w-3 h-3 text-cyan-400" />
                Gemini AI Engine
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Zero Hallucination Tolerance
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Public Services</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-emerald-400 transition-colors">Income Certificate</li>
              <li className="hover:text-emerald-400 transition-colors">Residence / Domicile</li>
              <li className="hover:text-emerald-400 transition-colors">Post-Matric Scholarship</li>
              <li className="hover:text-emerald-400 transition-colors">Community / Caste Certificate</li>
              <li className="hover:text-emerald-400 transition-colors">Birth Certificate Registration</li>
              <li className="hover:text-emerald-400 transition-colors">Old Age / Destitute Pension</li>
            </ul>
          </div>

          {/* Security & Integrity */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Integrity & Trust</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Government database is the sole source of truth.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>No sensitive citizen personal credentials are stored.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Deterministic rule engine acts as continuous fallback.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Citizen Application Document Assistant. All rights reserved.</p>
          <p className="text-slate-400">Strictly follows official government department notification manuals.</p>
        </div>
      </div>
    </footer>
  );
};
