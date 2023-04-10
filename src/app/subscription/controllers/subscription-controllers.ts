import { Request, Response } from "express";

export const notifySubscribersHandler = async (req: Request, res: Response) => {
  return res.status(201).json({ status: "success" });
};
