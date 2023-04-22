import { UserRepository } from "../repositories/auth-repositories";
import { TokenGenerator } from "../repositories/auth-repositories";
import { BEARER } from "../domain/constants";
import { AUTH_ERROR_MESSAGES } from "../domain/exceptions/constants";
import { retrieveToken } from "../domain/services/retrieve-token";

type Protect = {
  userRepository: UserRepository;
  tokenGenerator: TokenGenerator;
  bearerToken: string | undefined;
};

export const protect = async ({
  userRepository,
  tokenGenerator,
  bearerToken,
}: Protect) => {
  if (!bearerToken?.startsWith(BEARER)) {
    throw new Error(AUTH_ERROR_MESSAGES.NO_BEARER);
  }
  const token = retrieveToken(bearerToken);

  if (!token) {
    throw new Error(AUTH_ERROR_MESSAGES.NO_TOKEN);
  }

  const { id } = await tokenGenerator.decode(token);

  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error(AUTH_ERROR_MESSAGES.USER_DOES_NOT_EXIST);
  }

  return undefined;
};
