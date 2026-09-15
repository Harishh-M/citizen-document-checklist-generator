import { Router } from 'express';
import { generateChecklist, getChecklistById } from '../controllers/checklistController.js';
import { validateChecklistRequest } from '../middleware/validationMiddleware.js';

const router = Router();

// POST /api/checklist/generate - Generate personalized AI checklist
router.post('/generate', validateChecklistRequest, generateChecklist);

// GET /api/checklist/:id - Retrieve a previously generated checklist
router.get('/:id', getChecklistById);

export default router;
