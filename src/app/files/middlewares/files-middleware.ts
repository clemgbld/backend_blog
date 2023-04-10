import { Request, Response, NextFunction } from "express";
import { FilesRepository } from "../../../core/subscription/domain/repositories/files-repository";

export const buildFilesMiddleware =
  (services: { filesRepository: FilesRepository }) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.filesService = Object.freeze(services);
    next();
  };
