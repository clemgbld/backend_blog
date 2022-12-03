import express from "express";
import { loginHandler } from "../controllers/auth-controller";

export const authRouter = express.Router();

authRouter.route("/login").post(loginHandler);
