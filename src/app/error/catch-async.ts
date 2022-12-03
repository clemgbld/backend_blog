import { Response, Request, NextFunction } from "express";
import { AppError } from "./app-error";

export const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch((err: AppError | Error) => {
      const error =
        err instanceof AppError ? err : new AppError(err.message, 500);
      res.status(error.statusCode).json({
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
      });
    });
