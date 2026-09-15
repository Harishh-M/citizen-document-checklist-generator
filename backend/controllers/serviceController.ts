import { Request, Response, NextFunction } from 'express';
import { db } from '../config/db.js';

export async function getAllServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const services = await db.getServices();
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
}

export async function getServiceById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const service = await db.getServiceById(id);

    if (!service) {
      res.status(404).json({
        success: false,
        error: `Government service with ID ${id} was not found.`
      });
      return;
    }

    const documents = await db.getDocumentsByServiceId(id);

    res.json({
      success: true,
      data: {
        service,
        documents
      }
    });
  } catch (error) {
    next(error);
  }
}
