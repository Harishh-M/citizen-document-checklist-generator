import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { db } from '../config/db.js';
import { GeminiService } from '../services/geminiService.js';

export async function createService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { service_name, department, description, eligibility, procedure_steps, source, last_updated } = req.body;

    if (!service_name || !department || !description) {
      res.status(400).json({
        success: false,
        error: 'service_name, department, and description are required fields.'
      });
      return;
    }

    const newService = await db.addService({
      service_name,
      department,
      description,
      eligibility: eligibility || 'State residency requirements apply.',
      procedure_steps: procedure_steps || 'Standard online submission and field verification.',
      source: source || 'State Citizen Services Portal 2026',
      last_updated: last_updated || new Date().toISOString().split('T')[0]
    });

    res.status(201).json({
      success: true,
      data: newService,
      message: 'Government service created successfully.'
    });
  } catch (error) {
    next(error);
  }
}

export async function updateService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const updated = await db.updateService(id, req.body);

    if (!updated) {
      res.status(404).json({
        success: false,
        error: `Service with ID ${id} not found.`
      });
      return;
    }

    res.json({
      success: true,
      data: updated,
      message: 'Service updated successfully.'
    });
  } catch (error) {
    next(error);
  }
}

export async function addDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { service_id, document_name, description, mandatory, condition_rule, source } = req.body;

    if (!service_id || !document_name || !description) {
      res.status(400).json({
        success: false,
        error: 'service_id, document_name, and description are required fields.'
      });
      return;
    }

    const newDoc = await db.addDocument({
      service_id: Number(service_id),
      document_name,
      description,
      mandatory: Boolean(mandatory),
      condition_rule: condition_rule || null,
      source: source || 'Government Guidelines 2026'
    });

    res.status(201).json({
      success: true,
      data: newDoc,
      message: 'Document requirement added to government service successfully.'
    });
  } catch (error) {
    next(error);
  }
}

export async function updateDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const updated = await db.updateDocument(id, req.body);

    if (!updated) {
      res.status(404).json({
        success: false,
        error: `Document requirement with ID ${id} not found.`
      });
      return;
    }

    res.json({
      success: true,
      data: updated,
      message: 'Document requirement updated successfully.'
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const deleted = await db.deleteDocument(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: `Document requirement with ID ${id} not found.`
      });
      return;
    }

    res.json({
      success: true,
      message: `Document requirement with ID ${id} was deleted successfully.`
    });
  } catch (error) {
    next(error);
  }
}

export async function resetDatabase(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    db.resetToDefaultSeed();
    res.json({
      success: true,
      message: 'Government dataset reset to default verified official records.'
    });
  } catch (error) {
    next(error);
  }
}

export async function getSystemStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const status = db.getStatus();
    const keyStatus = GeminiService.getApiKeyStatus();

    res.json({
      success: true,
      system: 'GOV-23 Citizen Document Checklist Generator',
      database: status,
      geminiAI: {
        configured: keyStatus.configured,
        model: keyStatus.model,
        maskedKey: keyStatus.maskedKey,
        mode: keyStatus.configured ? 'Live Gemini 2.5 Flash LLM (Structured JSON)' : 'Deterministic Government Rules Fallback'
      },
      serverTime: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function getApiKeyStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const keyStatus = GeminiService.getApiKeyStatus();
    res.json({
      success: true,
      ...keyStatus
    });
  } catch (error) {
    next(error);
  }
}

export async function saveApiKey(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { apiKey } = req.body;
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid Gemini API Key string.'
      });
      return;
    }

    const testResult = await GeminiService.testApiKey(apiKey.trim());
    if (!testResult.success) {
      res.status(400).json({
        success: false,
        error: testResult.message
      });
      return;
    }

    // Set at runtime
    GeminiService.setApiKey(apiKey.trim());

    // Persist to .env
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf-8');
      }
      if (envContent.includes('GEMINI_API_KEY=')) {
        envContent = envContent.replace(/GEMINI_API_KEY=.*/g, `GEMINI_API_KEY=${apiKey.trim()}`);
      } else {
        envContent += `\nGEMINI_API_KEY=${apiKey.trim()}\n`;
      }
      fs.writeFileSync(envPath, envContent, 'utf-8');
    } catch (fsErr) {
      console.warn('[AdminController] Warning: Could not write key to .env file:', fsErr);
    }

    const keyStatus = GeminiService.getApiKeyStatus();
    res.json({
      success: true,
      message: 'Gemini API Key verified and connected successfully!',
      ...keyStatus
    });
  } catch (error) {
    next(error);
  }
}

export async function removeApiKey(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    GeminiService.disconnectApiKey();

    try {
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf-8');
        envContent = envContent.replace(/GEMINI_API_KEY=.*/g, 'GEMINI_API_KEY=');
        fs.writeFileSync(envPath, envContent, 'utf-8');
      }
    } catch (fsErr) {
      console.warn('[AdminController] Warning: Could not clear key in .env file:', fsErr);
    }

    res.json({
      success: true,
      message: 'Gemini API Key disconnected. System will use deterministic official rules engine.',
      configured: false,
      model: 'gemini-2.5-flash'
    });
  } catch (error) {
    next(error);
  }
}
