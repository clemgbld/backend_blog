import { Response, Request, NextFunction } from "express";
import { login } from "../../../core/auth/use-cases/login";
import { protect } from "../../../core/auth/use-cases/protect";
import { catchAsync } from "../../error/catch-async";
import { AppError } from "../../error/app-error";
import { mapErrorToHttpStatus } from "../../error/map-error-to-https-status";

export const loginHandler = catchAsync(async (req: Request, res: Response) => {
  try {
    const tokenObj = await login({
      email: req.body.email,
      password: req.body.password,
      userRepository: req.authService.userRepository,
      tokenGenerator: req.authService.tokenGenerator,
    });

    res.status(200).json({
      status: "success",
      data: tokenObj,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new AppError(
        err.message,
        mapErrorToHttpStatus(err.message, req.body.id)
      );
    }
  }
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
