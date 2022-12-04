import { Request, Response, NextFunction } from "express";
import { Time } from "../../../core/time/repositories/time";

export const buildTimeMiddleware =
  (services: { time: Time }) =>
  (req: Request, response: Response, next: NextFunction) => {
    req.timeService = Object.freeze(services);
    next();
  };
