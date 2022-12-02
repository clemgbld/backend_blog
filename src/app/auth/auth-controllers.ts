import express, { Response, Request } from "express";

import { login } from "../../core/auth/use-cases/login";
import { globalErrorHandler } from "../error/error-controllers";

export const authRouter = express.Router();

const loginHandler: any = async (req: Request, res: Response) => {
  if (!req.body.email) {
    return globalErrorHandler({
      res,
      statusCode: 400,
      message: "Please provide an email address and a password.",
    });
  }

  const tokenObj = await login({
    email: req.body.email,
    password: req.body.password,
    userRepository: req.authService.userRepository,
    tokenGenerator: req.authService.tokenGenerator,
  });

  if (!tokenObj)
    return globalErrorHandler({
      res,
      statusCode: 401,
      message: "Please provide a valid email address and password.",
    });

  res.status(200).json({
    status: "success",
    data: tokenObj,
  });
};

authRouter.route("/login").post(loginHandler);
