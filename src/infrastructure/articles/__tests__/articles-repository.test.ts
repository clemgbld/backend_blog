import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { initDB } from "../../db/db";
import { buildArticlesRepository } from "../articles-repository";
import { buildArticle } from "../../../core/articles/entites/articles";
import { buildIdGenerator } from "../../id/id-generator";

let db: Db;
let connection: MongoClient;
let mongoServer: MongoMemoryServer;
let articlesRepository: ReturnType<typeof buildArticlesRepository>;

describe("user repository", () => {
  beforeAll(async () => {
    const dbData = await initDB();
    db = dbData.db;
    connection = dbData.connection;
    mongoServer = dbData.mongoServer;
  });

  beforeEach(() => {
    articlesRepository = buildArticlesRepository(db);
  });

  afterEach(async () => {
    await db.collection("articles").deleteMany({});
  });

  afterAll(async () => {
    jest.setTimeout(20000);
    await mongoServer.stop();
    await connection.close();
  });
});
