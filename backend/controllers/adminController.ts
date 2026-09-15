import { Request, Response, NextFunction } from 'express';
import { db } from '../config/db.js';

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
    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');

    res.json({
      success: true,
      system: 'GOV-23 Citizen Document Checklist Generator',
      database: status,
      geminiAI: {
        configured: hasApiKey,
        model: 'gemini-3.8-flash',
        mode: hasApiKey ? 'Live Gemini LLM (Structured JSON)' : 'Deterministic Government Rules Fallback'
      },
      serverTime: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}
