import {
  UserRepository,
  TokenGenerator,
} from "../../src/core/auth/repositories/auth-repositories";

declare global {
  declare namespace Express {
    interface Request {
      authService: {
        userRepository: UserRepository;
        tokenGenerator: TokenGenerator;
      };
    }
  }
}
