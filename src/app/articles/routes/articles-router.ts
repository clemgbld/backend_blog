import express from "express";
import { deleteHandler } from "../controllers/articles-controllers";

export const articlesRouter = express.Router();

articlesRouter.delete("/delete/:id", deleteHandler);
