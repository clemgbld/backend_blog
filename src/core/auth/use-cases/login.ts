import bcrypt from "bcrypt";
import { User } from "../entities/user";

type Login = {
  email: string;
  password: string;
  userRepository: any;
  tokenGenerator: any;
};

const shouldLogUser = async ({
  user,
  password,
}: {
  user: User;
  password: string;
}) => user && (await bcrypt.compare(password, user.password));

export const login = async ({
  email,
  password,
  userRepository,
  tokenGenerator,
}: Login) => {
  const user = userRepository.one(email);

  return (await shouldLogUser({ user, password }))
    ? tokenGenerator.generate(user.id)
    : null;
};
