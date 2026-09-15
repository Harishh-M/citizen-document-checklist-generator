import React, { useState, useEffect } from 'react';
import { Key, CheckCircle2, AlertTriangle, X, ExternalLink, ShieldCheck, Sparkles, Eye, EyeOff, Trash2 } from 'lucide-react';
import { apiService } from '../services/api.js';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeyUpdated }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<{
    configured: boolean;
    maskedKey?: string;
    model?: string;
  }>({ configured: false, model: 'gemini-2.5-flash' });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setMessage(null);
    }
  }, [isOpen]);

  const fetchStatus = async () => {
    try {
      const res = await apiService.getApiKeyStatus();
      setStatus({
        configured: res.configured,
        maskedKey: res.maskedKey,
        model: res.model || 'gemini-2.5-flash'
      });
      if (res.configured && res.maskedKey) {
        setApiKeyInput('');
      }
    } catch (e) {
      console.error('[ApiKeyModal] Failed to fetch status:', e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setMessage({ text: 'Please enter a valid Gemini API Key.', type: 'error' });
      return;
    }

    setIsTesting(true);
    setMessage({ text: 'Testing API key with Gemini 2.5 Flash model...', type: 'info' });

    try {
      const res = await apiService.saveApiKey(apiKeyInput.trim());
      if (res.success) {
        localStorage.setItem('gemini_api_key', apiKeyInput.trim());
        setStatus({
          configured: true,
          maskedKey: res.maskedKey,
          model: res.model
        });
        setMessage({
          text: '✓ Gemini API Key successfully verified and connected!',
          type: 'success'
        });
        setApiKeyInput('');
        if (onKeyUpdated) onKeyUpdated();
      } else {
        setMessage({ text: res.message || 'Verification failed.', type: 'error' });
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.error || err.message || 'Failed to verify key with Gemini API.';
      setMessage({ text: errMsg, type: 'error' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsTesting(true);
    try {
      await apiService.removeApiKey();
      localStorage.removeItem('gemini_api_key');
      setStatus({ configured: false, model: 'gemini-2.5-flash' });
      setMessage({
        text: 'API Key disconnected. System will use the official deterministic government rule engine.',
        type: 'info'
      });
      setApiKeyInput('');
      if (onKeyUpdated) onKeyUpdated();
    } catch (err: any) {
      setMessage({ text: 'Failed to disconnect key.', type: 'error' });
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Connect Gemini API Key</h3>
                <p className="text-xs text-slate-300 mt-0.5">Google GenAI SDK (gemini-2.5-flash)</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Current Status Badge */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
            status.configured
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-2.5">
              {status.configured ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">
                  {status.configured ? 'Active & Live Connected' : 'API Key Not Connected'}
                </div>
                <div className="text-[11px] opacity-80">
                  {status.configured
                    ? `Key: ${status.maskedKey} (${status.model})`
                    : 'System is running in Deterministic Government Rule Engine fallback mode'}
                </div>
              </div>
            </div>
            {status.configured && (
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={isTesting}
                className="inline-flex items-center gap-1 text-xs text-rose-700 hover:text-rose-900 bg-rose-100/70 hover:bg-rose-200/70 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer"
                title="Disconnect this key"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            )}
          </div>

          {/* Alert Message */}
          {message && (
            <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-100/80 text-emerald-900 border border-emerald-200'
                : message.type === 'error'
                ? 'bg-rose-100/80 text-rose-900 border border-rose-200'
                : 'bg-blue-100/80 text-blue-900 border border-blue-200'
            }`}>
              <span className="font-semibold">{message.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  {status.configured ? 'Replace with New API Key' : 'Enter Google Gemini API Key'}
                </label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>Get Free Key at Google AI Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder={status.configured ? "Paste new key here to replace current key..." : "AIzaSy..."}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Your key is tested in real-time, stored in <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">.env</code>, and used strictly for checklist generation with zero hallucinations.
              </p>
            </div>

            {/* Privacy & Anti-Hallucination Note */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11px]">
                <strong className="text-slate-800">Statutory Integrity Safeguard: </strong>
                All AI-generated checklists are strictly cross-referenced against the official government database before presentation.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isTesting || !apiKeyInput.trim()}
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTesting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Test & Connect Key</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
