import express, { Express } from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { buildArticlesMiddleware } from "../middlewares/articles-middleware";
import { buildInMemoryArticlesRepository } from "../../../infrastructure/articles/in-memory-articles-repository";
import { buildInMemoryUserRepository } from "../../../infrastructure/auth/in-memory-user-repository";
import { inMemoryTokenGenerator } from "../../../infrastructure/auth/in-memory-token-generator";
import { articlesRouter } from "../routes/articles-router";
import { buildAuthMiddlewareServices } from "../../auth/middlewares/auth-middleware-services";
import { buildUser } from "../../../core/auth/entities/user";
import { buildArticle } from "../../../core/articles/entites/articles";
import { buildInMemoryTime } from "../../../infrastructure/time/in-memory-time";
import { buildInMemoryIdGenerator } from "../../../infrastructure/id/in-memory-id-generator";
import { buildTimeMiddleware } from "../../time/middlewares/time-middleware";
import { buildIdMiddleware } from "../../id/middlewares/id-middleware";

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
    const time = buildInMemoryTime();
    const idGenerator = buildInMemoryIdGenerator();

    const articlesMiddleware = buildArticlesMiddleware({
      articlesRepository,
    });
    const authMiddleware = buildAuthMiddlewareServices({
      userRepository,
      tokenGenerator,
    });

    const timeMiddleware = buildTimeMiddleware({ time });

    const idMiddleware = buildIdMiddleware({ idGenerator });

    app.use(
      "/api/v1/articles",
      authMiddleware,
      articlesMiddleware,
      timeMiddleware,
      idMiddleware,
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
    beforeEach(async () => {
      const user = await buildUser({
        id: "abc",
        email: "exemple@gmail.com",
        password: "password",
      });
      userRepository.add(user);
    });

    const genrateAndAddArticle = async () => {
      const article = buildArticle({
        id: "123",
        title: "title 1",
        date: 12345,
        content: [{ type: "h1", id: "1", text: "hello" }],
      });

      await articlesRepository.add({
        ...article,
        content: JSON.stringify(article.content),
      });

      return article;
    };

    describe("DELETE /articles/delete/:id", () => {
      it("should delete expected article", async () => {
        await genrateAndAddArticle();

        const response = await request(app)
          .delete("/api/v1/articles/delete/123")
          .set("Authorization", "Bearer FAKE_TOKEN")
          .type("json");

        expect(response.statusCode).toBe(204);

        expect(await articlesRepository.all()).toEqual([]);
      });

      it("should give a 400 error when there is no article to delete", async () => {
        const response = await request(app)
          .delete("/api/v1/articles/delete/123")
          .set("Authorization", "Bearer FAKE_TOKEN")
          .type("json");

        expect(response.statusCode).toBe(400);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
        expect(response.body).toEqual({
          status: "fail",
          statusCode: 400,
          message: "123 id does not exist",
        });
      });
    });

    describe("GET /articles", () => {
      it("should should retrieve all articles", async () => {
        const article = await genrateAndAddArticle();

        const response = await request(app)
          .get("/api/v1/articles")
          .set("Authorization", "Bearer FAKE_TOKEN")
          .type("json");

        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
        expect(response.body).toEqual({
          status: "success",
          results: 1,
          data: [article],
        });
      });
    });

    describe("PATCH /articles", () => {
      it("should correctly update the expected article", async () => {
        await genrateAndAddArticle();
        const article = buildArticle({
          id: "123",
          title: "title 1",
          summary: "summary 1",
          date: 12345,
          content: [{ type: "h1", id: "1", text: "hello" }],
          hide: true,
          lightMode: true,
        });

        const response = await request(app)
          .patch("/api/v1/articles")
          .set("Authorization", "Bearer FAKE_TOKEN")
          .send(article)
          .type("json");

        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
        expect(response.body).toEqual({
          status: "success",

          data: article,
        });
      });

      it("should fails fast when the expected article to update is not found with a 400 error", async () => {
        const article = buildArticle({
          id: "123",
          title: "title 1",
          summary: "summary 1",
          date: 12345,
          content: [{ type: "h1", id: "1", text: "hello" }],
          hide: true,
          lightMode: true,
        });

        const response = await request(app)
          .patch("/api/v1/articles")
          .set("Authorization", "Bearer FAKE_TOKEN")
          .send(article)
          .type("json");

        expect(response.statusCode).toBe(400);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
        expect(response.body).toEqual({
          status: "fail",
          statusCode: 400,
          message: "123 id does not exist",
        });
      });
    });

    describe("POST /articles", () => {
      it.skip("should should successfully post a new article in the blog", async () => {
        const article = buildArticle({
          id: "123",
          title: "title 1",
          summary: "summary 1",
          date: 12345,
          content: [{ type: "h1", id: "1", text: "hello" }],
        });

        const response = await request(app)
          .post("/api/v1/articles")
          .set("Authorization", "Bearer FAKE_TOKEN")
          .send(article)
          .type("json");
      });
    });
  });
});
