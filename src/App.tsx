import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { StepIndicator } from './components/StepIndicator.js';
import { HomePage } from './pages/HomePage.js';
import { ServiceSelectionPage } from './pages/ServiceSelectionPage.js';
import { CitizenDetailsPage } from './pages/CitizenDetailsPage.js';
import { AIProcessingPage } from './pages/AIProcessingPage.js';
import { ChecklistResultPage } from './pages/ChecklistResultPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { AdminPage } from './pages/AdminPage.js';
import { apiService } from './services/api.js';
import { Service, ChecklistResultData, CitizenFormData } from './types.js';
import { AlertCircle, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'details' | 'processing' | 'result' | 'about' | 'admin'>(() => {
    try {
      const saved = sessionStorage.getItem('citizen_current_view');
      if (saved && ['home', 'services', 'details', 'result', 'about', 'admin'].includes(saved)) {
        return saved as any;
      }
    } catch (e) {}
    return 'home';
  });

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(() => {
    try {
      const saved = sessionStorage.getItem('citizen_selected_service');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [checklistResult, setChecklistResult] = useState<ChecklistResultData | null>(() => {
    try {
      const saved = sessionStorage.getItem('citizen_checklist_result');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Sync state to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('citizen_current_view', currentView);
    } catch (e) {}
  }, [currentView]);

  useEffect(() => {
    try {
      if (selectedService) {
        sessionStorage.setItem('citizen_selected_service', JSON.stringify(selectedService));
      } else {
        sessionStorage.removeItem('citizen_selected_service');
      }
    } catch (e) {}
  }, [selectedService]);

  useEffect(() => {
    try {
      if (checklistResult) {
        sessionStorage.setItem('citizen_checklist_result', JSON.stringify(checklistResult));
      } else {
        sessionStorage.removeItem('citizen_checklist_result');
      }
    } catch (e) {}
  }, [checklistResult]);

  // Load initial services and system health
  const fetchData = async () => {
    setIsLoadingServices(true);
    try {
      const [servicesList, status] = await Promise.all([
        apiService.getServices(),
        apiService.getSystemStatus().catch(() => null)
      ]);
      setServices(servicesList);
      setSystemStatus(status);
    } catch (err: any) {
      console.error('[App] Initial load error:', err);
      setGlobalError('Could not load services from server. Ensure backend is running.');
    } finally {
      setIsLoadingServices(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute step number for StepIndicator (1: services, 2: details, 3: processing, 4: result)
  const getStepNumber = () => {
    switch (currentView) {
      case 'services': return 1;
      case 'details': return 2;
      case 'processing': return 3;
      case 'result': return 4;
      default: return 0;
    }
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setCurrentView('details');
    setGlobalError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitDetails = async (formData: CitizenFormData) => {
    if (!selectedService) return;

    setCurrentView('processing');
    setIsSubmitting(true);
    setGlobalError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const result = await apiService.generateChecklist(selectedService.id, formData);
      if (!result || !result.mandatoryDocuments) {
        throw new Error('Checklist generation returned empty response. Please retry.');
      }
      setChecklistResult(result);
      setCurrentView('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('[App] Generation error:', err);
      const errMsg = err.response?.data?.error || err.message || 'Failed to generate document checklist.';
      setGlobalError(errMsg);
      setCurrentView('details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = async (serviceId: number, demoData: any) => {
    let service = services.find(s => s.id === serviceId);
    if (!service) {
      try {
        const fetched = await apiService.getServiceById(serviceId);
        service = fetched.service;
      } catch (err) {
        console.error(err);
      }
    }

    if (service) {
      setSelectedService(service);
      setCurrentView('processing');
      setGlobalError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        const result = await apiService.generateChecklist(service.id, demoData);
        if (!result || !result.mandatoryDocuments) {
          throw new Error('Checklist demo returned empty response.');
        }
        setChecklistResult(result);
        setCurrentView('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err: any) {
        console.error(err);
        setGlobalError(err.response?.data?.error || err.message || 'Failed demo generation.');
        setCurrentView('services');
      }
    }
  };

  const handleStepClick = (stepNum: number) => {
    if (stepNum === 1) {
      setCurrentView('services');
    } else if (stepNum === 2 && selectedService) {
      setCurrentView('details');
    }
  };

  const handleStartNew = () => {
    setSelectedService(null);
    setChecklistResult(null);
    try {
      sessionStorage.removeItem('citizen_selected_service');
      sessionStorage.removeItem('citizen_checklist_result');
    } catch (e) {}
    setCurrentView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentStep = getStepNumber();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Global Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={(v) => {
          setCurrentView(v as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        systemStatus={systemStatus}
        onRefreshStatus={fetchData}
      />

      {/* Global Error Banner */}
      {globalError && (
        <div className="bg-red-50 border-b border-red-200 text-red-800 text-xs px-4 py-3 flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{globalError}</span>
          </div>
          <button onClick={() => setGlobalError(null)} className="text-red-500 hover:text-red-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step Indicator when in citizen flow */}
      {currentStep > 0 && (
        <div className="bg-white border-b border-slate-200/80 shadow-xs print:hidden">
          <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onStart={() => setCurrentView('services')}
            onSelectService={handleSelectService}
            onQuickDemo={handleQuickDemo}
            services={services}
          />
        )}

        {currentView === 'services' && (
          <ServiceSelectionPage
            services={services}
            onSelectService={handleSelectService}
            isLoading={isLoadingServices}
          />
        )}

        {currentView === 'details' && selectedService && (
          <CitizenDetailsPage
            service={selectedService}
            onBack={() => setCurrentView('services')}
            onSubmit={handleSubmitDetails}
            isSubmitting={isSubmitting}
          />
        )}

        {currentView === 'processing' && (
          <AIProcessingPage serviceName={selectedService?.service_name || 'Government Service'} />
        )}

        {currentView === 'result' && (
          checklistResult ? (
            <ChecklistResultPage
              checklist={checklistResult}
              onStartNew={handleStartNew}
            />
          ) : (
            <div className="max-w-xl mx-auto py-16 text-center space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Checklist Ready</h2>
              <button
                onClick={() => setCurrentView('services')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-sm cursor-pointer"
              >
                Browse Government Services
              </button>
            </div>
          )
        )}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'admin' && (
          <AdminPage onRefreshData={fetchData} />
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
