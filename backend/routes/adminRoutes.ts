import { Router } from 'express';
import {
  createService,
  updateService,
  addDocument,
  updateDocument,
  deleteDocument,
  resetDatabase,
  getSystemStatus,
  getApiKeyStatus,
  saveApiKey,
  removeApiKey
} from '../controllers/adminController.js';

const router = Router();

// System health & config
router.get('/status', getSystemStatus);
router.post('/reset', resetDatabase);

// Gemini API Key management
router.get('/api-key', getApiKeyStatus);
router.post('/api-key', saveApiKey);
router.delete('/api-key', removeApiKey);

// Services management
router.post('/services', createService);
router.put('/services/:id', updateService);

// Documents management
router.post('/documents', addDocument);
router.put('/documents/:id', updateDocument);
router.delete('/documents/:id', deleteDocument);

export default router;

