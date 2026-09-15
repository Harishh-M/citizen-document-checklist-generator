import fs from 'fs';
import path from 'path';

export interface ServiceRecord {
  id: number;
  service_name: string;
  department: string;
  description: string;
  eligibility: string;
  procedure_steps: string;
  source: string;
  last_updated: string;
  jurisdiction?: 'State' | 'Central' | 'State/Central';
  created_at?: string;
}

export interface DocumentRecord {
  id: number;
  service_id: number;
  document_name: string;
  description: string;
  mandatory: boolean | number;
  condition_rule: string | null;
  source: string;
  created_at?: string;
}

export interface CitizenRequestRecord {
  id: number;
  service_id: number;
  citizen_data: any;
  created_at: string;
}

export interface AIResultRecord {
  id: number;
  request_id: number;
  generated_result: any;
  model_name: string;
  created_at: string;
}

export interface RegistryFileFormat {
  services: ServiceRecord[];
  documents: DocumentRecord[];
  citizen_requests: CitizenRequestRecord[];
  ai_results: AIResultRecord[];
}

/**
 * Modular Database Store Interface
 * 
 * Defines the contract for data persistence across government services, official document
 * requirements, citizen audit trails, and AI result records.
 * 
 * Implementations:
 * - JsonFileStore: Local JSON file-backed store (zero external database dependency).
 * - MySQLStore (future): Can be plugged in to connect to an external MySQL / Cloud SQL server.
 */
export interface IDatabaseStore {
  getStatus(): {
    connected: boolean;
    mode: string;
    storageType: string;
    dataFile: string;
    totalServices: number;
    totalDocuments: number;
    totalRequests: number;
  };
  getServices(): Promise<ServiceRecord[]>;
  getServiceById(id: number): Promise<ServiceRecord | null>;
  addService(service: Omit<ServiceRecord, 'id' | 'created_at'>): Promise<ServiceRecord>;
  updateService(id: number, data: Partial<ServiceRecord>): Promise<ServiceRecord | null>;
  getDocumentsByServiceId(serviceId: number): Promise<DocumentRecord[]>;
  addDocument(doc: Omit<DocumentRecord, 'id' | 'created_at'>): Promise<DocumentRecord>;
  updateDocument(id: number, data: Partial<DocumentRecord>): Promise<DocumentRecord | null>;
  deleteDocument(id: number): Promise<boolean>;
  saveCitizenRequest(serviceId: number, citizenData: any): Promise<number>;
  saveAIResult(requestId: number, result: any, modelName: string): Promise<number>;
  getChecklistByRequestId(requestId: number): Promise<{ request: CitizenRequestRecord; result: AIResultRecord; service: ServiceRecord } | null>;
  resetToDefaultSeed(): void;
}

import { ALL_SERVICES, ALL_DOCUMENTS } from './serviceData.js';

/**
 * Default Verified Government Registry Seeds (Fallback)
 */
export const DEFAULT_SERVICES: ServiceRecord[] = ALL_SERVICES;
export const DEFAULT_DOCUMENTS: DocumentRecord[] = ALL_DOCUMENTS;

/**
 * JsonFileStore
 * 
 * Production-ready, zero-database store that manages official government services and
 * document requirements directly in a structured local JSON data file.
 * Requires NO external database (no DB_HOST, DB_USER, etc.).
 */
export class JsonFileStore implements IDatabaseStore {
  private filePath: string;
  private services: ServiceRecord[] = [];
  private documents: DocumentRecord[] = [];
  private citizenRequests: CitizenRequestRecord[] = [];
  private aiResults: AIResultRecord[] = [];

  private nextServiceId = 1;
  private nextDocumentId = 1;
  private nextRequestId = 1;
  private nextResultId = 1;

  constructor(customPath?: string) {
    this.filePath = customPath || path.join(process.cwd(), 'backend', 'data', 'government-registry.json');
    this.loadData();
  }

  private loadData(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed: RegistryFileFormat = JSON.parse(raw);
        this.services = parsed.services || [];
        this.documents = parsed.documents || [];
        this.citizenRequests = parsed.citizen_requests || [];
        this.aiResults = parsed.ai_results || [];
        console.log(`[Store] Loaded ${this.services.length} services and ${this.documents.length} document rules from ${path.basename(this.filePath)}`);
      } else {
        // Initialize with verified seeds
        this.services = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
        this.documents = JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
        this.citizenRequests = [];
        this.aiResults = [];
        this.persist();
        console.log(`[Store] Initialized fresh government registry file at ${this.filePath}`);
      }
    } catch (err: any) {
      console.error('[Store] Error reading government registry JSON file. Using default verified seeds in-memory:', err.message);
      this.services = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
      this.documents = JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
      this.citizenRequests = [];
      this.aiResults = [];
    }

    // Auto-sync any new official default services or documents into the stored registry
    let synced = false;
    for (const defaultService of DEFAULT_SERVICES) {
      const existingIdx = this.services.findIndex(s => s.id === defaultService.id);
      if (existingIdx === -1) {
        this.services.push(defaultService);
        synced = true;
      } else {
        // Update jurisdiction & metadata if missing
        if (!this.services[existingIdx].jurisdiction && defaultService.jurisdiction) {
          this.services[existingIdx].jurisdiction = defaultService.jurisdiction;
          synced = true;
        }
      }
    }

    for (const defaultDoc of DEFAULT_DOCUMENTS) {
      if (!this.documents.some(d => d.id === defaultDoc.id)) {
        this.documents.push(defaultDoc);
        synced = true;
      }
    }

    if (synced) {
      this.persist();
      console.log(`[Store] Synchronized official services: now ${this.services.length} services and ${this.documents.length} document rules.`);
    }

    // Initialize ID counters
    this.nextServiceId = Math.max(...this.services.map(s => s.id), 0) + 1;
    this.nextDocumentId = Math.max(...this.documents.map(d => d.id), 0) + 1;
    this.nextRequestId = Math.max(...this.citizenRequests.map(r => r.id), 0) + 1;
    this.nextResultId = Math.max(...this.aiResults.map(a => a.id), 0) + 1;
  }

  private persist(): void {
    try {
      const payload: RegistryFileFormat = {
        services: this.services,
        documents: this.documents,
        citizen_requests: this.citizenRequests,
        ai_results: this.aiResults
      };
      fs.writeFileSync(this.filePath, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (err: any) {
      console.error('[Store] Failed to write changes to registry file:', err.message);
    }
  }

  public getStatus() {
    return {
      connected: true,
      mode: 'Local Government Data Store (JSON)',
      storageType: 'Structured File Registry',
      dataFile: path.basename(this.filePath),
      totalServices: this.services.length,
      totalDocuments: this.documents.length,
      totalRequests: this.citizenRequests.length
    };
  }

  // --- Services ---
  public async getServices(): Promise<ServiceRecord[]> {
    return [...this.services];
  }

  public async getServiceById(id: number): Promise<ServiceRecord | null> {
    return this.services.find(s => s.id === id) || null;
  }

  public async addService(service: Omit<ServiceRecord, 'id' | 'created_at'>): Promise<ServiceRecord> {
    const newRecord: ServiceRecord = {
      ...service,
      id: this.nextServiceId++,
      created_at: new Date().toISOString()
    };
    this.services.push(newRecord);
    this.persist();
    return newRecord;
  }

  public async updateService(id: number, data: Partial<ServiceRecord>): Promise<ServiceRecord | null> {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.services[index] = { ...this.services[index], ...data };
    this.persist();
    return this.services[index];
  }

  // --- Documents ---
  public async getDocumentsByServiceId(serviceId: number): Promise<DocumentRecord[]> {
    return this.documents.filter(d => d.service_id === serviceId);
  }

  public async addDocument(doc: Omit<DocumentRecord, 'id' | 'created_at'>): Promise<DocumentRecord> {
    const newDoc: DocumentRecord = {
      ...doc,
      id: this.nextDocumentId++,
      created_at: new Date().toISOString()
    };
    this.documents.push(newDoc);
    this.persist();
    return newDoc;
  }

  public async updateDocument(id: number, data: Partial<DocumentRecord>): Promise<DocumentRecord | null> {
    const index = this.documents.findIndex(d => d.id === id);
    if (index === -1) return null;
    this.documents[index] = { ...this.documents[index], ...data };
    this.persist();
    return this.documents[index];
  }

  public async deleteDocument(id: number): Promise<boolean> {
    const initialLength = this.documents.length;
    this.documents = this.documents.filter(d => d.id !== id);
    const deleted = this.documents.length < initialLength;
    if (deleted) {
      this.persist();
    }
    return deleted;
  }

  // --- Requests & Results ---
  public async saveCitizenRequest(serviceId: number, citizenData: any): Promise<number> {
    const id = this.nextRequestId++;
    this.citizenRequests.push({
      id,
      service_id: serviceId,
      citizen_data: citizenData,
      created_at: new Date().toISOString()
    });
    this.persist();
    return id;
  }

  public async saveAIResult(requestId: number, result: any, modelName: string): Promise<number> {
    const id = this.nextResultId++;
    this.aiResults.push({
      id,
      request_id: requestId,
      generated_result: result,
      model_name: modelName,
      created_at: new Date().toISOString()
    });
    this.persist();
    return id;
  }

  public async getChecklistByRequestId(requestId: number): Promise<{ request: CitizenRequestRecord; result: AIResultRecord; service: ServiceRecord } | null> {
    const req = this.citizenRequests.find(r => r.id === requestId);
    if (!req) return null;
    const res = this.aiResults.find(r => r.request_id === requestId);
    if (!res) return null;
    const service = this.services.find(s => s.id === req.service_id);
    if (!service) return null;

    return { request: req, result: res, service };
  }

  public resetToDefaultSeed(): void {
    this.services = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
    this.documents = JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
    this.citizenRequests = [];
    this.aiResults = [];
    this.nextServiceId = Math.max(...this.services.map(s => s.id), 0) + 1;
    this.nextDocumentId = Math.max(...this.documents.map(d => d.id), 0) + 1;
    this.nextRequestId = 1;
    this.nextResultId = 1;
    this.persist();
    console.log('[Store] Reset government registry to default verified seed records.');
  }
}

/**
 * Modular Database Store Factory / Singleton Instance
 * 
 * Default is JsonFileStore. To plug in MySQL in the future:
 * 1. Install mysql2
 * 2. Create MySQLStore class implementing IDatabaseStore
 * 3. Return MySQLStore instance here when process.env.DATABASE_TYPE === 'mysql'
 */
export const db: IDatabaseStore = new JsonFileStore();
