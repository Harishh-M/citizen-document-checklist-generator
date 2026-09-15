import axios from 'axios';
import { Service, ChecklistResultData, CitizenFormData } from '../types.js';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

export const apiService = {
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
