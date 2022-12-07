import jwt from "jsonwebtoken";
import { promisify } from "util";

function daysToMilliseconds(days: string): number {
  const seconds = parseInt(days, 10) * 86400;
  return seconds * 1000;
}

export const buildTokenGenerator = () => ({
  generate: (id?: string) => {
    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return {
      token,
      expiresIn: daysToMilliseconds(process.env.JWT_EXPIRES_IN || ""),
    };
  },

  decode: async (token: string) => {
    const verify: any = promisify(jwt.verify);

    const decoded = await verify(token, process.env.JWT_SECRET);

    return {
      id: decoded.id,
    };
  },
});
