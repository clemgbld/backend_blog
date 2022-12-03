import express from "express";
import { deleteHandler } from "../controllers/articles-controllers";
import { retrieveArticlesHandler } from "../controllers/articles-controllers";
import { protectHandler } from "../../auth/controllers/auth-controller";

export const articlesRouter = express.Router();

articlesRouter.delete("/delete/:id", protectHandler, deleteHandler);
articlesRouter.get("/", protectHandler, retrieveArticlesHandler);
