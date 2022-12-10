import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import { initRealDB } from "./infrastructure/db/db";
import { buildUserRepository } from "./infrastructure/auth/user-repository";
import { buildTokenGenerator } from "./infrastructure/auth/token-generator";
import { buildAuthMiddlewareServices } from "./app/auth/middlewares/auth-middleware-services";
import { authRouter } from "./app/auth/routes/auth-router";
import { buildTime } from "./infrastructure/time/time";
import { buildIdGenerator } from "./infrastructure/id/id-generator";
import { buildArticlesRepository } from "./infrastructure/articles/articles-repository";
import { buildArticlesMiddleware } from "./app/articles/middlewares/articles-middleware";
import { buildTimeMiddleware } from "./app/time/middlewares/time-middleware";
import { buildIdMiddleware } from "./app/id/middlewares/id-middleware";
import { articlesRouter } from "./app/articles/routes/articles-router";
import { AppError } from "./app/error/app-error";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type Accept");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const unhandledError = (message: string, err: Error) => {
  console.log(err.name, err.message);
  console.log(`${message} (__)。゜zｚＺ Shutting down...`);
  process.exit(1);
};

process.on("unhandledRejection", (err: Error) => {
  unhandledError("unhandled rejection", err);
});

process.on("uncaughtException", (err: Error) => {
  unhandledError("uncaught exception", err);
});

initRealDB()
  .then((db) => {
    console.log("db connection established");
    const userRepository = buildUserRepository(db);
    const articlesRepository = buildArticlesRepository(db);
    const tokenGenerator = buildTokenGenerator();
    const idGenerator = buildIdGenerator();
    const time = buildTime();

    const authMiddleware = buildAuthMiddlewareServices({
      userRepository,
      tokenGenerator,
    });
    const articlesMiddleware = buildArticlesMiddleware({
      articlesRepository,
    });

    const timeMiddleware = buildTimeMiddleware({ time });

    const idMiddleware = buildIdMiddleware({ idGenerator });

    app.use("/api/v1/users", authMiddleware, authRouter);

    app.use(
      "/api/v1/articles",
      authMiddleware,
      articlesMiddleware,
      timeMiddleware,
      idMiddleware,
      articlesRouter
    );

    app.all("*", (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl}`, 404));
    });

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`app running on port:${port}...`);
    });
  })
  .catch((err) => console.error(err));
