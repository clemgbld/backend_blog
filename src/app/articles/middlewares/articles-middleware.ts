import { Request, Response, NextFunction } from "express";

import { ArticlesRepository } from "../../../core/articles/domain/repositories/articles-repository";

export const buildArticlesMiddleware =
  (services: { articlesRepository: ArticlesRepository }) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.articlesService = Object.freeze(services);
    next();
  };
