import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Landmark, 
  FileText,
  X
} from 'lucide-react';
import { apiService } from '../services/api.js';
import { Service } from '../types.js';

interface AdminPageProps {
  onRefreshData: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onRefreshData }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedServiceDocs, setSelectedServiceDocs] = useState<any[]>([]);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Forms
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newService, setNewService] = useState({
    service_name: '',
    department: '',
    description: '',
    eligibility: '',
    procedure_steps: '',
    source: 'State e-Governance Gazette 2026',
    last_updated: new Date().toISOString().split('T')[0]
  });

  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    document_name: '',
    description: '',
    mandatory: true,
    condition_rule: '',
    source: 'Department Guidelines 2026'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [servicesList, sysStatus] = await Promise.all([
        apiService.getServices(),
        apiService.getSystemStatus()
      ]);
      setServices(servicesList);
      setStatus(sysStatus);
      if (servicesList.length > 0 && !selectedServiceId) {
        setSelectedServiceId(servicesList[0].id);
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: 'Failed to load admin data: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedServiceId) {
      apiService.getServiceById(selectedServiceId)
        .then(res => {
          setSelectedServiceDocs(res.documents);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [selectedServiceId]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createService(newService);
      showToast('Government service created successfully.');
      setShowAddServiceModal(false);
      setNewService({
        service_name: '',
        department: '',
        description: '',
        eligibility: '',
        procedure_steps: '',
        source: 'State e-Governance Gazette 2026',
        last_updated: new Date().toISOString().split('T')[0]
      });
      loadData();
      onRefreshData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId) return;

    try {
      await apiService.addDocument({
        service_id: selectedServiceId,
        ...newDoc
      });
      showToast('Document requirement added successfully.');
      setShowAddDocModal(false);
      setNewDoc({
        document_name: '',
        description: '',
        mandatory: true,
        condition_rule: '',
        source: 'Department Guidelines 2026'
      });
      // Reload current service docs
      const res = await apiService.getServiceById(selectedServiceId);
      setSelectedServiceDocs(res.documents);
      onRefreshData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteDocument = async (docId: number) => {
    if (!confirm('Are you sure you want to delete this document requirement from the government database?')) {
      return;
    }
    try {
      await apiService.deleteDocument(docId);
      showToast('Document requirement removed.');
      if (selectedServiceId) {
        const res = await apiService.getServiceById(selectedServiceId);
        setSelectedServiceDocs(res.documents);
      }
      onRefreshData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleResetDb = async () => {
    if (!confirm('Reset all services and requirements back to default verified government seed data?')) {
      return;
    }
    try {
      await apiService.resetDatabase();
      showToast('Database reset to verified government records.');
      loadData();
      onRefreshData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const currentService = services.find(s => s.id === selectedServiceId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : 'bg-red-900 text-white border-red-700'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-300" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
            <Settings className="w-3.5 h-3.5" />
            <span>Administrative Control Plane</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Government Registry Management
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Maintain official public services, document requirements, and source validation metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDb}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset to default official seed records"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Seeds</span>
          </button>

          <button
            onClick={() => setShowAddServiceModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* System Status Metrics */}
      {status && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-medium">Database Layer</span>
            <div className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>{status.database?.mode || 'Active'}</span>
            </div>
            <p className="text-[11px] text-slate-500">{status.database?.totalServices} services, {status.database?.totalDocuments} rules</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-medium">AI Inference Engine</span>
            <div className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${status.geminiAI?.configured ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span>{status.geminiAI?.model || 'Gemini 3.8 Flash'}</span>
            </div>
            <p className="text-[11px] text-slate-500">{status.geminiAI?.mode}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-400 font-medium">Validation Mode</span>
            <div className="text-base font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Strict Zero-Hallucination</span>
            </div>
            <p className="text-[11px] text-slate-500">Cross-verified against official requirements</p>
          </div>
        </div>
      )}

      {/* Main Content: Services List & Documents Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Service Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Official Services</span>
            <span className="text-xs font-normal text-slate-400">{services.length} items</span>
          </h3>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {services.map(service => (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`w-full text-left p-3 rounded-xl transition-colors text-xs space-y-1 cursor-pointer ${
                  selectedServiceId === service.id
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-950 font-medium'
                    : 'hover:bg-slate-50 border border-transparent text-slate-700'
                }`}
              >
                <div className="font-bold text-slate-900">{service.service_name}</div>
                <div className="text-[11px] text-slate-500 truncate">{service.department}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Documents for Selected Service */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {currentService ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs text-slate-500">{currentService.department}</span>
                  <h2 className="text-xl font-bold text-slate-900">{currentService.service_name}</h2>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Source: <span className="text-slate-600 font-medium">{currentService.source}</span> (Verified: {currentService.last_updated})
                  </div>
                </div>

                <button
                  onClick={() => setShowAddDocModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Requirement</span>
                </button>
              </div>

              {/* Requirements Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Associated Official Documents ({selectedServiceDocs.length})
                </h4>

                {selectedServiceDocs.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">
                    No documents registered for this service yet. Click "Add Requirement" above.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {selectedServiceDocs.map(doc => (
                      <div
                        key={doc.id}
                        className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{doc.document_name}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                doc.mandatory
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {doc.mandatory ? 'Mandatory' : 'Conditional'}
                            </span>
                          </div>

                          <p className="text-slate-600">{doc.description}</p>
                          {doc.condition_rule && (
                            <p className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded inline-block">
                              <strong>Condition:</strong> {doc.condition_rule}
                            </p>
                          )}
                          <div className="text-[11px] text-slate-400">
                            Source: {doc.source}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Requirement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              Select a service from the left column to inspect and manage its document requirements.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Service */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add Government Public Service</h3>
              <button onClick={() => setShowAddServiceModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={newService.service_name}
                  onChange={e => setNewService({ ...newService, service_name: e.target.value })}
                  placeholder="e.g. Legal Heir Certificate"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Department *</label>
                <input
                  type="text"
                  required
                  value={newService.department}
                  onChange={e => setNewService({ ...newService, department: e.target.value })}
                  placeholder="e.g. Revenue & Disaster Management"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  value={newService.description}
                  onChange={e => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Official purpose and overview of this service..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Eligibility</label>
                <input
                  type="text"
                  value={newService.eligibility}
                  onChange={e => setNewService({ ...newService, eligibility: e.target.value })}
                  placeholder="e.g. Direct legal successors of deceased person"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Source Name</label>
                  <input
                    type="text"
                    value={newService.source}
                    onChange={e => setNewService({ ...newService, source: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Last Updated</label>
                  <input
                    type="date"
                    value={newService.last_updated}
                    onChange={e => setNewService({ ...newService, last_updated: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Document Requirement */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Add Document Requirement to {currentService?.service_name}
              </h3>
              <button onClick={() => setShowAddDocModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Name *</label>
                <input
                  type="text"
                  required
                  value={newDoc.document_name}
                  onChange={e => setNewDoc({ ...newDoc, document_name: e.target.value })}
                  placeholder="e.g. Death Certificate of the Deceased"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Requirement Classification *</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={newDoc.mandatory === true}
                      onChange={() => setNewDoc({ ...newDoc, mandatory: true })}
                    />
                    <span>Mandatory</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={newDoc.mandatory === false}
                      onChange={() => setNewDoc({ ...newDoc, mandatory: false })}
                    />
                    <span>Conditional</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Description *</label>
                <textarea
                  required
                  rows={2}
                  value={newDoc.description}
                  onChange={e => setNewDoc({ ...newDoc, description: e.target.value })}
                  placeholder="Specify issuing authority, format, or validity criteria..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {!newDoc.mandatory && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Applicable Condition Rule</label>
                  <input
                    type="text"
                    value={newDoc.condition_rule}
                    onChange={e => setNewDoc({ ...newDoc, condition_rule: e.target.value })}
                    placeholder="e.g. Required only if applicant is claiming under specific quota"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Source of Regulation</label>
                <input
                  type="text"
                  value={newDoc.source}
                  onChange={e => setNewDoc({ ...newDoc, source: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg"
                >
                  Save Requirement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
