import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, Loader2, Sparkles, Database, Cpu } from 'lucide-react';

interface AIProcessingPageProps {
  serviceName: string;
}

export const AIProcessingPage: React.FC<AIProcessingPageProps> = ({ serviceName }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { text: 'Retrieving official requirements from Government MySQL Registry', doneAt: 1 },
    { text: 'Validating citizen profile parameters and jurisdiction', doneAt: 2 },
    { text: 'Applying Gemini 3.8 Flash structured reasoning model', doneAt: 3 },
    { text: 'Enforcing Anti-Hallucination validation filter against ground truth', doneAt: 4 },
    { text: 'Structuring personalized mandatory vs conditional checklist', doneAt: 5 }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(1), 600);
    const timer2 = setTimeout(() => setStepIndex(2), 1400);
    const timer3 = setTimeout(() => setStepIndex(3), 2200);
    const timer4 = setTimeout(() => setStepIndex(4), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Central Spinner */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-ping opacity-25"></div>
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600 shadow-inner">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Analyzing Document Requirements
        </h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Preparing custom checklist for <strong className="text-slate-900">{serviceName}</strong>.
          Cross-referencing citizen parameters with certified department guidelines.
        </p>
      </div>

      {/* Steps List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-left max-w-md mx-auto space-y-3.5">
        {steps.map((step, idx) => {
          const isDone = stepIndex >= step.doneAt;
          const isCurrent = stepIndex === idx;

          return (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shrink-0"></div>
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
              )}
              <span className={isDone ? 'text-slate-700 font-medium' : isCurrent ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                {step.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Security note */}
      <div className="inline-flex items-center gap-2 text-xs bg-slate-100 text-slate-600 px-3.5 py-2 rounded-full border border-slate-200">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Strict Hallucination Filter: Only approved government documents allowed.</span>
      </div>
    </div>
  );
};
