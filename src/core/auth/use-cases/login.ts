import { shouldLogUser } from "../domain/services/should-log-user";
import {
  UserRepository,
  TokenGenerator,
} from "../repositories/auth-repositories";
import { AUTH_ERROR_MESSAGES } from "../domain/exceptions/constants";

type Login = {
  email: string | undefined;
  password: string | undefined;
  userRepository: UserRepository;
  tokenGenerator: TokenGenerator;
};

export const login = async ({
  email,
  password,
  userRepository,
  tokenGenerator,
}: Login) => {
  if (!email || !password) {
    throw new Error(AUTH_ERROR_MESSAGES.NO_EMAIL_OR_PASSWORD);
  }

  const user = await userRepository.one(email);

  if (await shouldLogUser({ user, password })) {
    return tokenGenerator.generate(user?.id);
  }

  throw new Error(AUTH_ERROR_MESSAGES.NO_VALID_EMAIL_OR_PASSWORD);
};
