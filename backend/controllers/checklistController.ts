import { Request, Response, NextFunction } from 'express';
import { db } from '../config/db.js';
import { GeminiService } from '../services/geminiService.js';

export async function generateChecklist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { serviceId, citizenData } = req.body;
    const numServiceId = Number(serviceId);

    // 1. Retrieve the government service from Official Data Store
    const service = await db.getServiceById(numServiceId);
    if (!service) {
      res.status(404).json({
        success: false,
        error: `Government service with ID ${serviceId} does not exist in the database.`
      });
      return;
    }

    // 2. Retrieve official requirements (source of truth) from Official Data Store
    const officialDocuments = await db.getDocumentsByServiceId(numServiceId);
    if (!officialDocuments || officialDocuments.length === 0) {
      res.status(400).json({
        success: false,
        error: `No official document requirements found in the database for service "${service.service_name}".`
      });
      return;
    }

    // 3. Persist citizen request in citizen_requests table
    const requestId = await db.saveCitizenRequest(numServiceId, citizenData);

    // Read optional client-provided API key from header or body
    const overrideApiKey = (req.headers['x-gemini-api-key'] as string) || req.body.apiKey;

    // 4. Invoke Gemini AI Analysis with strict hallucination safeguards
    const checklistResult = await GeminiService.analyzeChecklist(
      service,
      officialDocuments,
      citizenData,
      overrideApiKey
    );

    // 5. Persist the generated AI result in ai_results table
    await db.saveAIResult(requestId, checklistResult, checklistResult.modelName);

    // 6. Return validated structured response to citizen
    res.json({
      success: true,
      requestId,
      service: checklistResult.service,
      department: checklistResult.department,
      summary: checklistResult.summary,
      citizenProfileSummary: checklistResult.citizenProfileSummary,
      mandatoryDocuments: checklistResult.mandatoryDocuments,
      conditionalDocuments: checklistResult.conditionalDocuments,
      documents: checklistResult.allDocuments,
      source: checklistResult.source,
      sourceDate: checklistResult.sourceDate,
      disclaimer: checklistResult.disclaimer,
      aiGenerated: checklistResult.aiGenerated,
      modelName: checklistResult.modelName,
      hallucinationAudit: checklistResult.hallucinationAudit
    });
  } catch (error) {
    next(error);
  }
}

export async function getChecklistById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const requestId = Number(req.params.id);
    if (isNaN(requestId) || requestId <= 0) {
      res.status(400).json({
        success: false,
        error: 'Invalid checklist request ID.'
      });
      return;
    }

    const record = await db.getChecklistByRequestId(requestId);
    if (!record) {
      res.status(404).json({
        success: false,
        error: `No saved checklist found for ID ${requestId}.`
      });
      return;
    }

    const generated = record.result.generated_result;

    res.json({
      success: true,
      requestId: record.request.id,
      createdAt: record.request.created_at,
      service: record.service.service_name,
      department: record.service.department,
      citizenData: record.request.citizen_data,
      summary: generated.summary,
      citizenProfileSummary: generated.citizenProfileSummary,
      mandatoryDocuments: generated.mandatoryDocuments || generated.documents?.filter((d: any) => d.status === 'mandatory'),
      conditionalDocuments: generated.conditionalDocuments || generated.documents?.filter((d: any) => d.status === 'conditional'),
      documents: generated.allDocuments || generated.documents,
      source: generated.source,
      sourceDate: generated.sourceDate,
      disclaimer: generated.disclaimer,
      aiGenerated: generated.aiGenerated,
      modelName: record.result.model_name
    });
  } catch (error) {
    next(error);
  }
}
