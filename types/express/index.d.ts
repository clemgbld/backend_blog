import {
  UserRepository,
  TokenGenerator,
} from "../../src/core/auth/domain/repositories/auth-repositories";
import { ArticlesRepository } from "../../src/core/articles/domain/repositories/articles-repository";
import { Time } from "../../src/core/time/repositories/time";
import { IdGenerator } from "../../src/core/id/repositories/id-generator";
import { FilesRepository } from "../../src/core/subscription/domain/repositories/files-repository";
import { SubscriptionRepository } from "../../src/core/subscription/domain/repositories/subscription-repository";
import { EmailService } from "../../src/core/subscription/domain/gateway/email-service";

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
      idService: {
        idGenerator: IdGenerator;
      };

      subscriptionService: {
        subscriptionRepository: SubscriptionRepository;
        emailService: EmailService;
      };

      filesService: {
        filesRepository: FilesRepository;
      };
    }
  }
}
