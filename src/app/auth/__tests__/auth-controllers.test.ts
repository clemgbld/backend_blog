import express from "express";
import request from "supertest";
import { buildInMemoryUserRepository } from "../../../infrastructure/auth/in-memory-user-repository";
import { inMemoryTokenGenerator } from "../../../infrastructure/auth/in-memory-token-generator";
import { buildUser } from "../../../core/auth/entities/user";
import { authRouter } from "../auth-controllers";
import { buildAuthMiddlewareServices } from "../middlewares/auth-middleware-services";

let userRepository: ReturnType<typeof buildInMemoryUserRepository>;
let tokenGenerator: ReturnType<typeof inMemoryTokenGenerator>;

beforeEach(() => {
  userRepository = buildInMemoryUserRepository();
  tokenGenerator = inMemoryTokenGenerator();
});

const email = "exemple@gmail.com";
const password = "password";

describe("POST /login", () => {
  const app = express();
  it("should login the user", async () => {
    const user = await buildUser({ id: "abc", email, password });
    await userRepository.add(user);

    const authMiddlewareServices = buildAuthMiddlewareServices({
      userRepository,
      tokenGenerator,
    });

    app.use("/api/v1/users", authMiddlewareServices, authRouter);
  });
});
