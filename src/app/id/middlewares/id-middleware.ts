import { Request, Response, NextFunction } from "express";
import { IdGenerator } from "../../../core/id/repositories/id-generator";

export const buildIdMiddleware =
  (services: { idGenerator: IdGenerator }) =>
  (req: Request, response: Response, next: NextFunction) => {
    req.idService = Object.freeze(services);
    next();
  };
