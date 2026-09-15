import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number; // 1 to 4
  onStepClick?: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { num: 1, label: 'Select Service' },
    { num: 2, label: 'Enter Details' },
    { num: 3, label: 'AI Verification' },
    { num: 4, label: 'Personalized Checklist' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 sm:px-6">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-1 bg-slate-200 -z-0"></div>
        {/* Active fill line */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-emerald-600 transition-all duration-500 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.num;
          const isCurrent = currentStep === step.num;
          const isClickable = onStepClick && step.num < currentStep;

          return (
            <div
              key={step.num}
              onClick={() => isClickable && onStepClick(step.num)}
              className={`flex flex-col items-center relative z-10 ${
                isClickable ? 'cursor-pointer group' : 'cursor-default'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 border-2 ${
                  isCompleted
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-white border-emerald-600 text-emerald-700 shadow-md ring-4 ring-emerald-100'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : step.num}
              </div>
              <span
                className={`mt-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-emerald-800'
                    : isCompleted
                    ? 'text-slate-700 group-hover:text-emerald-700'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
