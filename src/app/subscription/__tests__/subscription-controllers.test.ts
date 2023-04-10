import express, { Express } from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { EmailService } from "../../../core/subscription/domain/gateway/email-service";
import { SubscriptionRepository } from "../../../core/subscription/domain/repositories/subscription-repository";
import { EmailInfos } from "../../../core/subscription/domain/email-infos";
import { buildInMemoryFilesRepository } from "../../../infrastructure/subscription/in-memory-files-repository";
import { buildInMemorySubscriptionRepository } from "../../../infrastructure/subscription/in-memory-subscription-repository";
import { emailTemplate } from "../../../core/subscription/fixtures/email-template";
import { buildSubscriptionMiddleware } from "../middlewares/subscription-middleware";
import { buildFilesMiddleware } from "../../files/middlewares/files-middleware";
import { subscriptionRouter } from "../routes/subscription-router";
import { buildInMemoryUserRepository } from "../../../infrastructure/auth/in-memory-user-repository";
import { buildAuthMiddlewareServices } from "../../auth/middlewares/auth-middleware-services";
import { inMemoryTokenGenerator } from "../../../infrastructure/auth/in-memory-token-generator";
import { buildUser } from "../../../core/auth/entities/user";

let app: Express;
let subscriptionRepository: SubscriptionRepository;
let userRepository: ReturnType<typeof buildInMemoryUserRepository>;
const emailService: EmailService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendEmail: async (_: EmailInfos) => Promise.resolve(),
};
const filesRepository = buildInMemoryFilesRepository(emailTemplate);
const subscriberEmailsStore = {
  "1": "exemple@hotmail.fr",
  "2": "exemple2@hotmail.fr",
};

beforeEach(async () => {
  app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  subscriptionRepository = buildInMemorySubscriptionRepository(
    subscriberEmailsStore
  );

  userRepository = buildInMemoryUserRepository();

  const tokenGenerator = inMemoryTokenGenerator();

  const subscriptionMiddleware = buildSubscriptionMiddleware({
    emailService,
    subscriptionRepository,
  });

  const authMiddleware = buildAuthMiddlewareServices({
    userRepository,
    tokenGenerator,
  });

  const filesMiddleware = buildFilesMiddleware({ filesRepository });

  app.use(
    "/api/v1/subscription",
    authMiddleware,
    subscriptionMiddleware,
    filesMiddleware,
    subscriptionRouter
  );
});

beforeEach(async () => {
  const user = await buildUser({
    id: "abc",
    email: "exemple@gmail.com",
    password: "password",
  });
  userRepository.add(user);
});

describe("notify subscriberes controller", () => {
  it("should get a 201 response", async () => {
    const emailContentIn = {
      title: "How to use the useState hook",
      id: "1",
      summary: "summary",
      img: "imgSrc",
      topic: "React",
      timeToRead: "7 min to read",
    };

    const response = await request(app)
      .post("/api/v1/subscription/notify")
      .set("Authorization", "Bearer FAKE_TOKEN")
      .send(emailContentIn)
      .type("json");

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual({ status: "success" });
  });

  it("should be a 404 bad request when there is a field missing", async () => {
    const emailContentIn = {
      title: "How to use the useState hook",
      summary: "summary",
      img: "imgSrc",
      topic: "React",
      timeToRead: "7 min to read",
    };

    const response = await request(app)
      .post("/api/v1/subscription/notify")
      .set("Authorization", "Bearer FAKE_TOKEN")
      .send(emailContentIn)
      .type("json");
  });
});
