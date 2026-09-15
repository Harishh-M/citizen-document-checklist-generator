import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  Cpu, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  GitMerge, 
  Layers, 
  FileText,
  Landmark,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Landmark className="w-3.5 h-3.5" />
          <span>System Architecture & Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI-Powered Citizen Application Document Checklist Generator
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Technical specifications, anti-hallucination safeguards, and architectural design for Problem Statement ID <strong className="text-slate-900">GOV-23</strong>.
        </p>
      </div>

      {/* Problem Statement Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span>Problem Statement Context</span>
        </h2>
        <p className="text-slate-700 text-sm leading-relaxed">
          Citizens frequently submit incomplete government applications because they are unsure which documents are strictly required for a particular public service. This results in repeated trips to government offices, delays in receiving critical benefits (such as scholarships or pensions), and high administrative burden for government scrutiny officers.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-slate-900">Project Goal:</div>
          <p>
            Create an intuitive web application where a citizen selects a public service and enters basic personal/application details. The system analyzes the service requirements stored in the database and uses Google Gemini to generate an accurate, personalized checklist of required documents before the citizen applies.
          </p>
        </div>
      </div>

      {/* Normal System vs Our AI System Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Normal Static System vs. Our AI-Powered System
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-3 px-4 font-bold text-slate-700">Aspect</th>
                <th className="py-3 px-4 font-bold text-slate-500">Standard Static Web Portal</th>
                <th className="py-3 px-4 font-bold text-emerald-700">Our AI-Powered System (GOV-23)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Checklist Personalization</td>
                <td className="py-3.5 px-4">Static, non-interactive PDF or long generic wall of text.</td>
                <td className="py-3.5 px-4 text-emerald-900 font-medium bg-emerald-50/40">
                  Dynamic analysis tailored to the citizen's specific age, income, caste, and situation.
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Requirement Classification</td>
                <td className="py-3.5 px-4">Lumps mandatory and optional items together, confusing applicants.</td>
                <td className="py-3.5 px-4 text-emerald-900 font-medium bg-emerald-50/40">
                  Strictly separates Mandatory from Conditional requirements with trigger reasons.
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Citizen Language Simplicity</td>
                <td className="py-3.5 px-4">Dense bureaucratic jargon directly copy-pasted from gazettes.</td>
                <td className="py-3.5 px-4 text-emerald-900 font-medium bg-emerald-50/40">
                  Rewrites bureaucratic terminology into clear, accessible plain language.
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Source of Truth & Accuracy</td>
                <td className="py-3.5 px-4">Often outdated static web pages updated only sporadically.</td>
                <td className="py-3.5 px-4 text-emerald-900 font-medium bg-emerald-50/40">
                  Official Government Document Registry as Ground Truth + Anti-Hallucination verification filter.
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Preparation Usability</td>
                <td className="py-3.5 px-4">Read-only text without tracking capability.</td>
                <td className="py-3.5 px-4 text-emerald-900 font-medium bg-emerald-50/40">
                  Interactive document readiness checkmarks, clipboard copy, and formatted PDF download.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hallucination Prevention Strategy */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cybersecurity & Trust Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Zero-Hallucination Engineering Framework
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Public services demand zero margin for error. A citizen must never be sent on a wild goose chase for a non-existent document.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              <span>1. Strict Ground-Truth Context Injection</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              We never prompt the LLM to search its general knowledge. Instead, all official documents are retrieved directly from the official government registry (<code className="text-emerald-300 font-mono">government-registry.json</code>) and injected into the prompt as the sole permissible context.
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>2. System Instruction Negative Constraints</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              The system prompt explicitly commands: <em>"Never invent a document. Never create a government rule not in context. Return valid JSON only."</em>
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Backend Post-Processing Validator</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Before results reach the frontend, the Express backend cross-references every generated item against the official government document records. If the model outputs an invented document, it is immediately stripped out and logged.
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <GitMerge className="w-4 h-4" />
              <span>4. Deterministic Fallback Engine</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              If the Gemini API key is missing or the external API is unreachable, the system automatically falls back to an in-code deterministic government rule engine, guaranteeing high availability for citizens.
            </p>
          </div>
        </div>
      </div>

      {/* Future RAG Architecture */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>Future Retrieval-Augmented Generation (RAG) Extension</span>
        </h2>
        <p className="text-slate-700 text-sm leading-relaxed">
          The system uses a modular storage abstraction layer (<code className="text-slate-900 font-mono text-xs">IDatabaseStore</code>) backed by a local JSON registry for zero-dependency instant startup, and can seamlessly connect to external relational databases (MySQL/PostgreSQL) or expand into an enterprise-scale RAG architecture:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-800">1. Document Ingestion</div>
            <p className="text-slate-600">
              Automated ingestion of official PDF gazettes and department circulars using document chunking.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-800">2. Vector Search</div>
            <p className="text-slate-600">
              Storage in a vector database (e.g. pgvector or Cloud Firestore Vector Search) using text embedding models.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-800">3. Hybrid Verification</div>
            <p className="text-slate-600">
              Hybrid retrieval combining semantic vector similarity with deterministic relational rule constraints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
