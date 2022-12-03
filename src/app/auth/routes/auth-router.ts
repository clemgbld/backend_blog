import express from "express";
import { loginHandler } from "../controllers/auth-controllers";

export const authRouter = express.Router();

authRouter.route("/login").post(loginHandler);
