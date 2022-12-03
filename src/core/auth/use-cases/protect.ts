import { UserRepository } from "../repositories/auth-repositories";
import { TokenGenerator } from "../repositories/auth-repositories";

type Protect = {
  userRepository: UserRepository;
  tokenGenerator: TokenGenerator;
  bearerToken: string;
};

const retrieveToken = (bearerToken: string) => bearerToken.split(" ")[1];

export const protect = async ({
  userRepository,
  tokenGenerator,
  bearerToken,
}: Protect) => {
  const token = retrieveToken(bearerToken);

  const { id } = await tokenGenerator.decode(token);

  const user = await userRepository.findById(id);

  return { user: user || null, hasToken: !!token };
};
