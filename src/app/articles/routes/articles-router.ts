import express from "express";
import {
  deleteHandler,
  updateHandler,
  retrieveArticlesHandler,
  retrievePublishedArticlesHandler,
  retrievePublishedArticleHandler,
  postHandler,
} from "../controllers/articles-controllers";
import { protectHandler } from "../../auth/controllers/auth-controller";

export const articlesRouter = express.Router();

articlesRouter.get("/published", retrievePublishedArticlesHandler);
articlesRouter.get("/published/:id", retrievePublishedArticleHandler);

articlesRouter.use(protectHandler);

articlesRouter.delete("/delete/:id", deleteHandler);
articlesRouter.get("/", retrieveArticlesHandler);
articlesRouter.patch("/", updateHandler);
articlesRouter.post("/", postHandler);
