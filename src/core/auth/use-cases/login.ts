import bcrypt from "bcrypt";
import { User } from "../entities/user";
import {
  UserRepository,
  TokenGenerator,
} from "../repositories/auth-repositories";

type Login = {
  email: string;
  password: string;
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
  const user = await userRepository.one(email);

  return (await shouldLogUser({ user, password }))
    ? tokenGenerator.generate(user?.id)
    : null;
};
