import express, { Express } from "express";
import request from "supertest";
import { buildInMemoryUserRepository } from "../../../infrastructure/auth/in-memory-user-repository";
import { inMemoryTokenGenerator } from "../../../infrastructure/auth/in-memory-token-generator";
import { buildUser } from "../../../core/auth/entities/user";
import { authRouter } from "../auth-controllers";
import { buildAuthMiddlewareServices } from "../middlewares/auth-middleware-services";
import bodyParser from "body-parser";

let userRepository: ReturnType<typeof buildInMemoryUserRepository>;
let tokenGenerator: ReturnType<typeof inMemoryTokenGenerator>;
let app: Express;

beforeEach(() => {
  userRepository = buildInMemoryUserRepository();
  tokenGenerator = inMemoryTokenGenerator();
  app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const authMiddlewareServices = buildAuthMiddlewareServices({
    userRepository,
    tokenGenerator,
  });

  app.use("/api/v1/users", authMiddlewareServices, authRouter);
});

const email = "exemple@gmail.com";
const password = "password";

describe("POST /login", () => {
  it("should login the user", async () => {
    const user = await buildUser({ id: "abc", email, password });
    await userRepository.add(user);

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

  describe("error handling", () => {
    it("should not login the user when the email or the password is wrong and deliver a 401 error", async () => {
      const response = await request(app)
        .post("/api/v1/users/login")
        .type("json")
        .send({
          email,
          password,
        });

      expect(response.statusCode).toBe(401);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual({
        status: "fail",
        statusCode: 401,
        message: "Please provide a valid email address and password.",
      });
    });

    it("should not login when the email is missing and deliver an 400 error", async () => {
      const response = await request(app)
        .post("/api/v1/users/login")
        .type("json")
        .send({
          password,
        });

      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual({
        status: "fail",
        statusCode: 400,
        message: "Please provide an email address and a password.",
      });
    });
  });
});
