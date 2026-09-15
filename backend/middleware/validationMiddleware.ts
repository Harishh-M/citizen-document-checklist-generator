import { Request, Response, NextFunction } from 'express';

export function validateChecklistRequest(req: Request, res: Response, next: NextFunction): void {
  const { serviceId } = req.body;
  let { citizenData } = req.body;

  if (!serviceId || isNaN(Number(serviceId))) {
    res.status(400).json({
      success: false,
      error: 'Invalid or missing "serviceId". It must be a valid numeric ID.'
    });
    return;
  }

  if (!citizenData || typeof citizenData !== 'object') {
    citizenData = {};
    req.body.citizenData = citizenData;
  }

  // Gracefully provide default values for any missing fields so requests are never blocked
  if (!citizenData.name || typeof citizenData.name !== 'string' || citizenData.name.trim() === '') {
    citizenData.name = 'Citizen Applicant';
  }

  if (!citizenData.district || typeof citizenData.district !== 'string' || citizenData.district.trim() === '') {
    citizenData.district = 'State Jurisdiction';
  }

  if (!citizenData.age || isNaN(Number(citizenData.age))) {
    citizenData.age = 25;
  }

  next();
}

export function validateServiceParam(req: Request, res: Response, next: NextFunction): void {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({
      success: false,
      error: 'Invalid service ID specified in URL parameter.'
    });
    return;
  }
  next();
}
