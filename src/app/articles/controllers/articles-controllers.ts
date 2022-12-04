import { Request, Response } from "express";
import { deleteArticle } from "../../../core/articles/use-cases/delete-article";
import { retrieveArticles } from "../../../core/articles/use-cases/retrieve-articles";
import { updateArticle } from "../../../core/articles/use-cases/update-article";
import { catchAsync } from "../../error/catch-async";
import { AppError } from "../../error/app-error";
import { buildArticle } from "../../../core/articles/entites/articles";

export const updateHandler = catchAsync(async (req: Request, res: Response) => {
  const article = buildArticle({
    id: req.body.id,
    title: req.body.title,
    summary: req.body.summary,
    date: req.body.date,
    content: req.body.content,
    hide: req.body.hide,
    lightMode: req.body.lightMode,
  });

  const updtatedArticle = await updateArticle({
    article,
    articlesRepository: req.articlesService.articlesRepository,
  });

  if (!updtatedArticle) {
    throw new AppError(`${req.params.id} id does not exist`, 400);
  }

  res.status(200).json({
    status: "success",
    data: updtatedArticle,
  });
});

export const deleteHandler = catchAsync(async (req: Request, res: Response) => {
  const deletedArticle = await deleteArticle({
    id: req.params.id,
    articlesRepository: req.articlesService.articlesRepository,
  });

  if (!deletedArticle) {
    throw new AppError(`${req.params.id} id does not exist`, 400);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const retrieveArticlesHandler = catchAsync(
  async (req: Request, res: Response) => {
    const articles = await retrieveArticles({
      articlesRepository: req.articlesService.articlesRepository,
    });
    res.status(200).json({
      status: "success",
      results: articles.length,
      data: articles,
    });
  }
);
