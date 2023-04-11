import { Request, Response } from "express";
import { notifySubscibers } from "../../../core/subscription/use-cases/notify-subscribers";
import { getAllSubscriberEmails } from "../../../core/subscription/use-cases/get-all-subscriber-emails";
import { deleteSubscriberEmail } from "../../../core/subscription/use-cases/delete-subscriber-email";
import { AppError } from "../../error/app-error";
import { catchAsync } from "../../error/catch-async";
import { EmailContentIn } from "../dto/email-content-in";
import { mapErrorToHttpStatus } from "../../error/map-error-to-https-status";

export const deleteSubscriberEmailHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      await deleteSubscriberEmail({
        subscriptionRepository: req.subscriptionService.subscriptionRepository,
        id: req.params.id,
      });
    } catch (err) {
      if (err instanceof Error) {
        throw new AppError(
          err.message,
          mapErrorToHttpStatus(err.message, req.params.id)
        );
      }
    }

    return res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const getAllSubscriberEmailsHandler = catchAsync(
  async (req: Request, res: Response) => {
    const emails = await getAllSubscriberEmails(
      req.subscriptionService.subscriptionRepository
    );
    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: emails,
    });
  }
);

export const notifySubscribersHandler = catchAsync(
  async (req: Request, res: Response) => {
    const emailContentIn: EmailContentIn = {
      title: req.body.title,
      id: req.body.id,
      summary: req.body.summary,
      img: req.body.img,
      topic: req.body.topic,
      timeToRead: req.body.timeToRead,
    };
    try {
      await notifySubscibers({
        emailContentIn,
        subscriptionRepository: req.subscriptionService.subscriptionRepository,
        emailService: req.subscriptionService.emailService,
        filesRepository: req.filesService.filesRepository,
      });
    } catch (err) {
      if (err instanceof Error) {
        throw new AppError(err.message, mapErrorToHttpStatus(err.message));
      }
    }

    return res.status(201).json({ status: "success" });
  }
);
