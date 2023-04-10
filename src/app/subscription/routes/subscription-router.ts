import express from "express";
import { notifySubscribersHandler } from "../controllers/subscription-controllers";
import { protectHandler } from "../../auth/controllers/auth-controller";

export const subscriptionRouter = express.Router();

subscriptionRouter.use(protectHandler);

subscriptionRouter.post("/notify", notifySubscribersHandler);
