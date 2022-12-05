import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { initDB } from "../../db/db";
import { buildUserRepository } from "../user-repository";
import { buildUser } from "../../../core/auth/entities/user";
import { buildIdGenerator } from "../../id/id-generator";

let db: Db;
let connection: MongoClient;
let mongoServer: MongoMemoryServer;
let userRepository: ReturnType<typeof buildUserRepository>;

describe("user repositories", () => {
  const email = "exemple@gmail.com";
  const password = "password";

  beforeAll(async () => {
    const dbData = await initDB();
    db = dbData.db;
    connection = dbData.connection;
    mongoServer = dbData.mongoServer;
  });

  beforeEach(() => {
    userRepository = buildUserRepository(db);
  });

  afterEach(async () => {
    await db.collection("users").deleteMany({});
  });

  afterAll(async () => {
    jest.setTimeout(20000);
    await mongoServer.stop();
    await connection.close();
  });

  it("should find a user by email", async () => {
    const idGenerator = buildIdGenerator();

    const user = await buildUser({
      id: idGenerator.makeId(),
      email,
      password,
    });
    await userRepository.add(user);
    const expectedUser = await userRepository.one(email);

    expect(expectedUser).toEqual(user);
  });

  it("should be undefined when trying to find an user that does not exist", async () => {
    const expectedUser = await userRepository.one(email);
    expect(expectedUser).toBe(undefined);
  });
});
