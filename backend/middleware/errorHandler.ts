import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error(`[API Error] ${req.method} ${req.url}:`, err);

  // Security: Never leak database stack traces or secrets to citizen client
  const statusCode = err.statusCode || 500;
  const userMessage = err.clientMessage || 'Unable to process your request at this time. Please check your information and try again.';

  res.status(statusCode).json({
    success: false,
    error: userMessage,
    timestamp: new Date().toISOString()
  });
}
