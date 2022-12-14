import { Response, Request, NextFunction } from "express";
import { login } from "../../../core/auth/use-cases/login";
import { protect } from "../../../core/auth/use-cases/protect";
import { catchAsync } from "../../error/catch-async";
import { AppError } from "../../error/app-error";

export const loginHandler = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
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

export const protectHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization?.startsWith("Bearer")) {
      throw new AppError("You are not logged in !", 401);
    }

    const { user, hasToken } = await protect({
      bearerToken: req.headers.authorization,
      userRepository: req.authService.userRepository,
      tokenGenerator: req.authService.tokenGenerator,
    });

    if (!hasToken) {
      throw new AppError(
        "You are not logged in ! Please log in to get access.",
        401
      );
    }

    if (!user) {
      throw new AppError(
        "The user belonging to this token does no longer exist.",
        401
      );
    }

    next();
  }
);
