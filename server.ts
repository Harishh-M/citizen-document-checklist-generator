import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

import serviceRoutes from './backend/routes/serviceRoutes.js';
import checklistRoutes from './backend/routes/checklistRoutes.js';
import adminRoutes from './backend/routes/adminRoutes.js';
import { errorHandler } from './backend/middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and form payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for API calls
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    console.log(`[API] ${req.method} ${req.url}`);
  }
  next();
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'GOV-23 AI-Powered Citizen Document Checklist Generator',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/services', serviceRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/admin', adminRoutes);

// Error Handler for API routes
app.use('/api', errorHandler);

// Vite middleware for development vs static build in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Government Citizen Assistant running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
