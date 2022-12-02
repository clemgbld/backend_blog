import { Response, Request, NextFunction } from "express";
import {
  UserRepository,
  TokenGenerator,
} from "../../../core/auth/repositories/auth-repositories";

export const buildAuthMiddlewareServices =
  (services: {
    userRepository: UserRepository;
    tokenGenerator: TokenGenerator;
  }) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.authService = Object.freeze(services);
    next();
  };
