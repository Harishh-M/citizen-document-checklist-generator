import axios from 'axios';
import { Service, ChecklistResultData, CitizenFormData } from '../types.js';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Attach local API key header if available in browser storage
apiClient.interceptors.request.use((config) => {
  const localKey = localStorage.getItem('gemini_api_key');
  if (localKey && !config.headers['x-gemini-api-key']) {
    config.headers['x-gemini-api-key'] = localKey;
  }
  return config;
});

export const apiService = {
  // API Key Management
  async getApiKeyStatus(): Promise<{ success: boolean; configured: boolean; maskedKey?: string; model: string }> {
    const res = await apiClient.get('/admin/api-key');
    return res.data;
  },

  async saveApiKey(apiKey: string): Promise<{ success: boolean; message: string; configured: boolean; maskedKey?: string; model: string }> {
    const res = await apiClient.post('/admin/api-key', { apiKey });
    return res.data;
  },

  async removeApiKey(): Promise<{ success: boolean; message: string; configured: boolean; model: string }> {
    const res = await apiClient.delete('/admin/api-key');
    return res.data;
  },

  // Services
  async getServices(): Promise<Service[]> {
    const res = await apiClient.get('/services');
    return res.data.data;
  },

  async getServiceById(id: number): Promise<{ service: Service; documents: any[] }> {
    const res = await apiClient.get(`/services/${id}`);
    return res.data.data;
  },

  // Checklist Generation
  async generateChecklist(serviceId: number, citizenData: CitizenFormData): Promise<ChecklistResultData> {
    const res = await apiClient.post('/checklist/generate', {
      serviceId,
      citizenData
    });
    return res.data;
  },

  async getSavedChecklist(id: number): Promise<ChecklistResultData> {
    const res = await apiClient.get(`/checklist/${id}`);
    return res.data;
  },

  // Admin & System
  async getSystemStatus(): Promise<any> {
    const res = await apiClient.get('/admin/status');
    return res.data;
  },

  async createService(data: Partial<Service>): Promise<Service> {
    const res = await apiClient.post('/admin/services', data);
    return res.data.data;
  },

  async updateService(id: number, data: Partial<Service>): Promise<Service> {
    const res = await apiClient.put(`/admin/services/${id}`, data);
    return res.data.data;
  },

  async addDocument(data: any): Promise<any> {
    const res = await apiClient.post('/admin/documents', data);
    return res.data.data;
  },

  async updateDocument(id: number, data: any): Promise<any> {
    const res = await apiClient.put(`/admin/documents/${id}`, data);
    return res.data.data;
  },

  async deleteDocument(id: number): Promise<void> {
    await apiClient.delete(`/admin/documents/${id}`);
  },

  async resetDatabase(): Promise<void> {
    await apiClient.post('/admin/reset');
  }
};
