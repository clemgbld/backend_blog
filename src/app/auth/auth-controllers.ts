import express, { Response } from "express";
import { AuthRequest } from "./middlewares/auth-middleware-services";
import { login } from "../../core/auth/use-cases/login";

export const authRouter = express.Router();

const loginCtrl: any = async (req: AuthRequest, res: Response) => {
  const tokenObj = await login({
    email: req.body.email,
    password: req.body.password,
    userRepository: req.service.userRepository,
    tokenGenerator: req.service.tokenGenerator,
  });

  res.status(200).json({
    status: "success",
    data: tokenObj,
  });
};

authRouter.route("/login").post(loginCtrl);
