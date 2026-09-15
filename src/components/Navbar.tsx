import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, Sparkles, Settings, Info, Landmark, Key } from 'lucide-react';
import { ApiKeyModal } from './ApiKeyModal.js';
import { apiService } from '../services/api.js';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  systemStatus?: any;
  onRefreshStatus?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, systemStatus, onRefreshStatus }) => {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<{ configured: boolean; maskedKey?: string; model?: string }>({
    configured: false,
    model: 'gemini-2.5-flash'
  });

  const checkKeyStatus = async () => {
    try {
      const res = await apiService.getApiKeyStatus();
      setApiKeyStatus({
        configured: res.configured,
        maskedKey: res.maskedKey,
        model: res.model || 'gemini-2.5-flash'
      });
    } catch (e) {
      // Fallback to systemStatus
      if (systemStatus?.geminiAI) {
        setApiKeyStatus({
          configured: systemStatus.geminiAI.configured,
          maskedKey: systemStatus.geminiAI.maskedKey,
          model: systemStatus.geminiAI.model || 'gemini-2.5-flash'
        });
      }
    }
  };

  useEffect(() => {
    checkKeyStatus();
  }, [systemStatus]);

  const handleKeyUpdated = () => {
    checkKeyStatus();
    if (onRefreshStatus) onRefreshStatus();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        {/* Top emergency/official strip */}
        <div className="bg-slate-950 text-slate-400 text-xs py-1 px-4 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-slate-300">National e-Governance Public Advisory</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="hidden md:inline text-slate-400">Database: <strong className="text-emerald-400 font-semibold">{systemStatus?.database?.mode || 'JSON File Store'}</strong></span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Anti-Hallucination Active
              </span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div 
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30 group-hover:bg-emerald-500 transition-colors">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-lg sm:text-xl tracking-tight flex items-center gap-2">
                  <span>CitizenDoc</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    AI Powered
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">Official Document Checklist Generator</p>
              </div>
            </div>

            {/* Nav Items & API Key Trigger */}
            <nav className="flex items-center space-x-1 sm:space-x-2">
              {/* API Key Connection Button */}
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  apiKeyStatus.configured
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                }`}
                title={apiKeyStatus.configured ? `Gemini API Key Connected (${apiKeyStatus.maskedKey})` : 'Click to connect Google Gemini API Key'}
              >
                {apiKeyStatus.configured ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Gemini AI Active</span>
                    <span className="sm:hidden">AI Active</span>
                  </>
                ) : (
                  <>
                    <Key className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Connect API Key</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setCurrentView('services')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentView === 'services' || currentView === 'details' || currentView === 'result'
                    ? 'bg-emerald-700/80 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Services</span>
              </button>

              <button
                onClick={() => setCurrentView('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentView === 'about'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>Architecture</span>
              </button>

              <button
                onClick={() => setCurrentView('admin')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentView === 'admin'
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
                title="Manage Government Services & Requirements"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeyUpdated={handleKeyUpdated}
      />
    </>
  );
};
