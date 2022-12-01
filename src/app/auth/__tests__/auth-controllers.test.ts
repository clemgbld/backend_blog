import express from "express";
import request from "supertest";
import { buildInMemoryUserRepository } from "../../../infrastructure/auth/in-memory-user-repository";
import { inMemoryTokenGenerator } from "../../../infrastructure/auth/in-memory-token-generator";
import { buildUser } from "../../../core/auth/entities/user";
import { authRouter } from "../auth-controllers";
import { buildAuthMiddlewareServices } from "../middlewares/auth-middleware-services";
import bodyParser from "body-parser";

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

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api/v1/users", authMiddlewareServices, authRouter);

    const response = await request(app)
      .post("/api/v1/users/login")
      .type("json")
      .send({
        email,
        password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );

    expect(response.body).toEqual({
      status: "success",
      data: {
        token: `fake-tokenabc`,
        expirationDate: 7776000000,
      },
    });
  });
});
