import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { initDB } from "../../db/db";
import { buildArticlesRepository } from "../articles-repository";
import { buildArticle } from "../../../core/articles/entites/articles";
import { buildIdGenerator } from "../../id/id-generator";
import { buildTime } from "../../time/time";

let db: Db;
let connection: MongoClient;
let mongoServer: MongoMemoryServer;
let articlesRepository: ReturnType<typeof buildArticlesRepository>;

describe("articles repository", () => {
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

  const generateArticle = () => {
    const idGenerator = buildIdGenerator();
    const id = idGenerator.makeId();
    const time = buildTime();
    const date = time.now();
    const article = buildArticle({
      id,
      title: "title 1",
      date,
      content: [{ tyqpe: "h1", id: "1", text: "hello" }],
    });

    return {
      article: { ...article, content: JSON.stringify(article.content) },
      id,
    };
  };

  it("should get the expected articles", async () => {
    const { article, id } = generateArticle();
    await articlesRepository.add(article);
    const expectedArticle = await articlesRepository.one(id);
    expect(expectedArticle).toEqual(article);
  });

  it("should be able to delete the expected article", async () => {
    const { article, id } = generateArticle();
    await articlesRepository.add(article);
    const deletedArticle = await articlesRepository.delete(id);
    expect(await articlesRepository.one(id)).toEqual(undefined);
    expect(deletedArticle).toEqual({
      acknowledged: true,
      deletedCount: 1,
    });
  });

  it("should be undefined when it deleted nothing", async () => {
    const idGenerator = buildIdGenerator();
    const id = idGenerator.makeId();
    const deletedArticle = await articlesRepository.delete(id);
    expect(deletedArticle).toBe(undefined);
  });
});
