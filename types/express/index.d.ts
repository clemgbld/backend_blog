import {
  UserRepository,
  TokenGenerator,
} from "../../src/core/auth/repositories/auth-repositories";
import { ArticlesRepository } from "../../src/core/articles/repositories/articles-repository";

declare global {
  declare namespace Express {
    interface Request {
      authService: {
        userRepository: UserRepository;
        tokenGenerator: TokenGenerator;
      };
      articlesService: {
        articlesRepository: ArticlesRepository;
      };
    }
  }
}
