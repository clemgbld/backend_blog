import express, { Response, Request } from "express";
import { login } from "../../core/auth/use-cases/login";
import { catchAsync } from "../error/catch-async";
import { AppError } from "../error/app-error";

export const authRouter = express.Router();

const loginHandler = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.email) {
    throw new AppError("Please provide an email address and a password.", 400);
  }

  const tokenObj = await login({
    email: req.body.email,
    password: req.body.password,
    userRepository: req.authService.userRepository,
    tokenGenerator: req.authService.tokenGenerator,
  });

  if (!tokenObj) {
    throw new AppError(
      "Please provide a valid email address and password.",
      401
    );
  }

  res.status(200).json({
    status: "success",
    data: tokenObj,
  });
});

authRouter.route("/login").post(loginHandler);
