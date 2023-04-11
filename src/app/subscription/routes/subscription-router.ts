import express from "express";
import {
  notifySubscribersHandler,
  getAllSubscriberEmailsHandler,
  deleteSubscriberEmailHandler,
} from "../controllers/subscription-controllers";
import { protectHandler } from "../../auth/controllers/auth-controller";

export const subscriptionRouter = express.Router();

subscriptionRouter.use(protectHandler);

subscriptionRouter.post("/notify", notifySubscribersHandler);
subscriptionRouter.get("/", getAllSubscriberEmailsHandler);
subscriptionRouter.delete("/delete/:id", deleteSubscriberEmailHandler);
