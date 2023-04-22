import { UserRepository } from "../repositories/auth-repositories";
import { TokenGenerator } from "../repositories/auth-repositories";

type Protect = {
  userRepository: UserRepository;
  tokenGenerator: TokenGenerator;
  bearerToken: string | undefined;
};

const retrieveToken = (bearerToken: string) => bearerToken.split(" ")[1];

export const protect = async ({
  userRepository,
  tokenGenerator,
  bearerToken,
}: Protect) => {
  if (!bearerToken?.startsWith("Bearer")) {
    throw new Error("You are not logged in !");
  }
  const token = retrieveToken(bearerToken);

  if (!token) {
    throw new Error("You are not logged in ! Please log in to get access.");
  }

  const { id } = await tokenGenerator.decode(token);

  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("The user belonging to this token does no longer exist.");
  }

  return undefined;
};
