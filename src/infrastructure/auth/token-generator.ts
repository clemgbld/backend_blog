import jwt from "jsonwebtoken";

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
      expirationDate: daysToMilliseconds(process.env.JWT_EXPIRES_IN || ""),
    };
  },

  decode: async (token: string) => {
    const verifyTokenAsync = (token: string, secret: string) => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    };
    const verifyPromise = verifyTokenAsync(token, process.env.JWT_SECRET || "");

    const decoded: any = await verifyPromise;
    const id: string = decoded.id;

    return {
      id,
    };
  },
});
