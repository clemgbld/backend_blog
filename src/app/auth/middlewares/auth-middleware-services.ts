import { Response, Request, NextFunction } from "express";
import {
  UserRepository,
  TokenGenerator,
} from "../../../core/auth/repositories/auth-repositories";

interface AuthRequestMiddleware extends Request {
  service?: {
    userRepository: UserRepository;
    tokenGenerator: TokenGenerator;
  };
}

export const buildAuthMiddlewareServices =
  (services: {
    userRepository: UserRepository;
    tokenGenerator: TokenGenerator;
  }) =>
  (req: AuthRequestMiddleware, res: Response, next: NextFunction) => {
    req.service = Object.freeze(services);
    next();
  };

export interface AuthRequest extends Request {
  service: {
    userRepository: UserRepository;
    tokenGenerator: TokenGenerator;
  };
}
