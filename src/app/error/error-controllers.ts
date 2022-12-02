import { Response } from "express";

type GlobalErrorHandler = {
  statusCode: number;
  message: string;
  res: Response;
};

export const globalErrorHandler = async ({
  statusCode,
  message,
  res,
}: GlobalErrorHandler) => {
  res.status(statusCode).json({
    status: "fail",
    statusCode,
    message,
  });
};
