import express from "express";
import {
  deleteHandler,
  updateHandler,
  retrieveArticlesHandler,
} from "../controllers/articles-controllers";
import { protectHandler } from "../../auth/controllers/auth-controller";

export const articlesRouter = express.Router();

articlesRouter.delete("/delete/:id", protectHandler, deleteHandler);
articlesRouter.get("/", protectHandler, retrieveArticlesHandler);
articlesRouter.patch("/", protectHandler, updateHandler);
