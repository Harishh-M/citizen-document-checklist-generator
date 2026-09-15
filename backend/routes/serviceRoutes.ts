import { Router } from 'express';
import { getAllServices, getServiceById } from '../controllers/serviceController.js';
import { validateServiceParam } from '../middleware/validationMiddleware.js';

const router = Router();

// GET /api/services - Return all available government services
router.get('/', getAllServices);

// GET /api/services/:id - Return one service and its requirements
router.get('/:id', validateServiceParam, getServiceById);

export default router;
