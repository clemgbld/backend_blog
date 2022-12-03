import express, { Express } from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { buildArticlesMiddleware } from "../middlewares/articles-middleware";
import { buildInMemoryArticlesRepository } from "../../../infrastructure/articles/in-memory-articles-repository";
import { buildInMemoryUserRepository } from "../../../infrastructure/auth/in-memory-user-repository";
import { inMemoryTokenGenerator } from "../../../infrastructure/auth/in-memory-token-generator";
import { protectHandler } from "../../auth/controllers/auth-controller";
import { articlesRouter } from "../routes/articles-router";
import { buildAuthMiddlewareServices } from "../../auth/middlewares/auth-middleware-services";

describe("given that the user needs to be authenticated", () => {
  let app: Express;
  let articlesRepository: ReturnType<typeof buildInMemoryArticlesRepository>;
  let userRepository: ReturnType<typeof buildInMemoryUserRepository>;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    articlesRepository = buildInMemoryArticlesRepository();
    userRepository = buildInMemoryUserRepository();
    const tokenGenerator = inMemoryTokenGenerator();
    const articlesMiddleware = buildArticlesMiddleware({
      articlesRepository,
    });
    const authMiddleware = buildAuthMiddlewareServices({
      userRepository,
      tokenGenerator,
    });
    app.use(
      "/api/v1/articles",
      authMiddleware,
      articlesMiddleware,
      protectHandler,
      articlesRouter
    );
  });

  describe("given that the user is not login", () => {
    it("should not let this operation there is no authorization field in the headers", async () => {
      const response = await request(app)
        .delete("/api/v1/articles/delete/123")
        .type("json");

      expect(response.statusCode).toBe(401);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual({
        status: "fail",
        statusCode: 401,
        message: "You are not logged in !",
      });
    });

    it("should not let this operation happen when the authorization headers does not start by 'Bearer' ", async () => {
      const response = await request(app)
        .delete("/api/v1/articles/delete/123")
        .set("Authorization", "no Bearer")
        .type("json");

      expect(response.statusCode).toBe(401);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual({
        status: "fail",
        statusCode: 401,
        message: "You are not logged in !",
      });
    });

    it("should not let the operation happer when the user han no token", async () => {
      const response = await request(app)
        .delete("/api/v1/articles/delete/123")
        .set("Authorization", "Bearer")
        .type("json");

      expect(response.statusCode).toBe(401);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual({
        status: "fail",
        statusCode: 401,
        message: "You are not logged in ! Please log in to get access.",
      });
    });

    it("should not let the operation when the id in the token does not match any user", async () => {
      const response = await request(app)
        .delete("/api/v1/articles/delete/123")
        .set("Authorization", "Bearer FAKE_TOKEN")
        .type("json");

      expect(response.statusCode).toBe(401);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual({
        status: "fail",
        statusCode: 401,
        message: "The user belonging to this token does no longer exist.",
      });
    });
  });

  describe("given that the user is logged in", () => {
    describe("delete", () => {
      it("should delete expected article", async () => {});
    });
  });
});
