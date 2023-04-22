import bcrypt from "bcrypt";
import { User } from "../user";

export const shouldLogUser = async ({
  user,
  password,
}: {
  user?: User;
  password: string;
}): Promise<boolean> =>
  !!user && (await bcrypt.compare(password, user.password));
