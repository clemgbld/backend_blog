import { Request, Response } from "express";
import { deleteArticle } from "../../../core/articles/use-cases/delete-article";
import { catchAsync } from "../../error/catch-async";
import { AppError } from "../../error/app-error";

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
