import { Response, Request, NextFunction } from "express";

interface AuthRequest extends Request {
  service?: any;
}

export const buildAuthMiddlewareServices =
  (services: { userRepository: any; tokenGenerator: any }) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    req.service = Object.freeze(services);
    next();
  };
