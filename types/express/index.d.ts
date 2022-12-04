import {
  UserRepository,
  TokenGenerator,
} from "../../src/core/auth/repositories/auth-repositories";
import { ArticlesRepository } from "../../src/core/articles/repositories/articles-repository";
import { Time } from "../../src/core/time/repositories/time";

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
      timeService: {
        time: Time;
      };
    }
  }
}
