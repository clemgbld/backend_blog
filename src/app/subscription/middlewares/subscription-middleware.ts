import { Request, Response, NextFunction } from "express";
import { SubscriptionRepository } from "../../../core/subscription/domain/repositories/subscription-repository";
import { EmailService } from "../../../core/subscription/domain/gateway/email-service";

export const buildSubscriptionMiddleware =
  (services: {
    subscriptionRepository: SubscriptionRepository;
    emailService: EmailService;
  }) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.subscriptionService = Object.freeze(services);
    next();
  };
