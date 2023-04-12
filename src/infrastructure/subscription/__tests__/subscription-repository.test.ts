import { MongoClient, Db, ObjectId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { initDB } from "../../db/db";
import { buildIdGenerator } from "../../id/id-generator";
import { SubscriptionRepository } from "../../../core/subscription/domain/repositories/subscription-repository";
import { buildSubscripitonRepository } from "../subscription-repository";

let db: Db;
let connection: MongoClient;
let mongoServer: MongoMemoryServer;
let subscriptionRepository: SubscriptionRepository;
const idGenrator = buildIdGenerator();

beforeAll(async () => {
  const dbData = await initDB();
  db = dbData.db;
  connection = dbData.connection;
  mongoServer = dbData.mongoServer;
});

beforeEach(() => {
  subscriptionRepository = buildSubscripitonRepository(db);
});

afterEach(async () => {
  await db.collection("emails").deleteMany({});
});

afterAll(async () => {
  jest.setTimeout(20000);
  await mongoServer.stop();
  await connection.close();
});

describe("mongo subscription repository", () => {
  it("should get all subscriber email", async () => {
    const id = idGenrator.makeId();
    const _id = new ObjectId(id);
    const email = "email@example.com";

    const subscriberEmail = { id, email };

    await db.collection("emails").insertOne({ _id, email });

    expect(await subscriptionRepository.all()).toEqual([subscriberEmail]);
  });
});
