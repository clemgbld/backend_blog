import express, { Response, Request } from "express";

import { login } from "../../core/auth/use-cases/login";

export const authRouter = express.Router();

const loginCtrl: any = async (req: Request, res: Response) => {
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
};

authRouter.route("/login").post(loginCtrl);
