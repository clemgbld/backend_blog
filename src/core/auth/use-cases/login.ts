import bcrypt from "bcrypt";
import { User } from "../domain/user";
import {
  UserRepository,
  TokenGenerator,
} from "../repositories/auth-repositories";

type Login = {
  email: string | undefined;
  password: string | undefined;
  userRepository: UserRepository;
  tokenGenerator: TokenGenerator;
};

const shouldLogUser = async ({
  user,
  password,
}: {
  user?: User;
  password: string;
}): Promise<boolean> =>
  !!user && (await bcrypt.compare(password, user.password));

export const login = async ({
  email,
  password,
  userRepository,
  tokenGenerator,
}: Login) => {
  if (!email || !password) {
    throw new Error("Please provide an email address and a password.");
  }

  const user = await userRepository.one(email);

  if (await shouldLogUser({ user, password })) {
    return tokenGenerator.generate(user?.id);
  }

  throw new Error("Please provide a valid email address and password.");
};
