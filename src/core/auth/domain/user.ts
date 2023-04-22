import bcrypt from "bcrypt";

export type User = {
  id: string;
  email: string;
  password: string;
};

export const buildUser = async ({ id, email, password }: User) => {
  return {
    id,
    email,
    password: await bcrypt.hash(password, 12),
  };
};
