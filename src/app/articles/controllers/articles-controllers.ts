import { Request, Response } from "express";
import { deleteArticle } from "../../../core/articles/use-cases/delete-article";
import { retrieveArticles } from "../../../core/articles/use-cases/retrieve-articles";
import { retrievePuplishedArticles } from "../../../core/articles/use-cases/retrieve-puplished-articles";
import { retrieveArticle } from "../../../core/articles/use-cases/retrieve-article";
import { updateArticle } from "../../../core/articles/use-cases/update-article";
import { postArticle } from "../../../core/articles/use-cases/post-article";
import { catchAsync } from "../../error/catch-async";
import { mapErrorToHttpStatus } from "../../error/map-error-to-https-status";
import { AppError } from "../../error/app-error";

export const updateHandler = catchAsync(async (req: Request, res: Response) => {
  try {
    const updtatedArticle = await updateArticle({
      articleIn: {
        id: req.body.id,
        topic: req.body.topic,
        title: req.body.title,
        summary: req.body.summary,
        date: req.body.date,
        content: req.body.content,
        hide: req.body.hide,
        lightMode: req.body.lightMode,
      },
      articlesRepository: req.articlesService.articlesRepository,
    });

    res.status(200).json({
      status: "success",
      data: updtatedArticle,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new AppError(
        err.message,
        mapErrorToHttpStatus(err.message, req.body.id)
      );
    }
  }
});

export const postHandler = catchAsync(async (req: Request, res: Response) => {
  try {
    const article = await postArticle({
      articleIn: {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        topic: req.body.topic,
        hide: req.body.hide,
        lightMode: req.body.lightMode,
      },
      articlesRepository: req.articlesService.articlesRepository,
      time: req.timeService.time,
      idGenerator: req.idService.idGenerator,
    });

    res.status(201).json({
      status: "success",
      data: article,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new AppError(
        err.message,
        mapErrorToHttpStatus(err.message, req.params.id)
      );
    }
  }
});

export const deleteHandler = catchAsync(async (req: Request, res: Response) => {
  try {
    await deleteArticle({
      id: req.params.id,
      articlesRepository: req.articlesService.articlesRepository,
    });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new AppError(
        err.message,
        mapErrorToHttpStatus(err.message, req.params.id)
      );
    }
  }
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

export const retrievePublishedArticlesHandler = catchAsync(
  async (req: Request, res: Response) => {
    const articles = await retrievePuplishedArticles({
      articlesRepository: req.articlesService.articlesRepository,
    });

    res.status(200).json({
      status: "success",
      results: articles.length,
      data: articles,
    });
  }
);

export const retrievePublishedArticleHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const article = await retrieveArticle({
        id: req.params.id,
        articlesRepository: req.articlesService.articlesRepository,
      });

      res.status(200).json({
        status: "success",
        data: article,
      });
    } catch (err) {
      if (err instanceof Error) {
        throw new AppError(
          err.message,
          mapErrorToHttpStatus(err.message, req.params.id)
        );
      }
    }
  }
);
