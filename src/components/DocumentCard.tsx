import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Check, Copy, Info } from 'lucide-react';
import { DocumentItem } from '../types.js';

interface DocumentCardProps {
  document: DocumentItem;
  index: number;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, index }) => {
  const [isPrepared, setIsPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isMandatory = document.status === 'mandatory';

  const handleCopy = () => {
    navigator.clipboard.writeText(`${document.name} - ${document.reason}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 bg-white p-5 shadow-sm ${
        isPrepared
          ? 'border-emerald-300 bg-emerald-50/30'
          : isMandatory
          ? 'border-slate-200 hover:border-emerald-300 hover:shadow'
          : 'border-amber-200/80 bg-amber-50/10 hover:border-amber-300 hover:shadow'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Checkbox and Title */}
        <div className="flex items-start gap-3.5 flex-1">
          <button
            type="button"
            onClick={() => setIsPrepared(!isPrepared)}
            aria-label={`Mark ${document.name} as ready`}
            className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center transition-colors border ${
              isPrepared
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-slate-300 hover:border-emerald-500 bg-white text-transparent'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </button>

          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`font-semibold text-base sm:text-lg ${isPrepared ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                {document.name}
              </h3>

              {isMandatory ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Mandatory
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Conditional
                </span>
              )}
            </div>

            {/* Simple AI Explanation */}
            <p className="text-slate-700 text-sm leading-relaxed pt-1">
              <strong className="text-slate-900 font-medium">Why you need this: </strong>
              {document.reason}
            </p>

            {/* Conditional trigger rule if applicable */}
            {!isMandatory && (document.conditionRule || document.officialDescription) && (
              <div className="mt-2 text-xs bg-amber-50 text-amber-900 p-2.5 rounded-lg border border-amber-200/80 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">When does this apply? </span>
                  <span>{document.conditionRule || document.officialDescription}</span>
                </div>
              </div>
            )}

            {/* Expandable Official metadata */}
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-500 bg-slate-50 p-2.5 rounded-lg">
                {document.officialDescription && (
                  <p><strong className="text-slate-700">Official Specification:</strong> {document.officialDescription}</p>
                )}
                <p><strong className="text-slate-700">Government Source:</strong> {document.source}</p>
                <div className="flex items-center gap-1 text-emerald-700 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Against MySQL Public Registry</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-1 shrink-0">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
            title="Toggle Official Details"
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
            title="Copy requirement"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
