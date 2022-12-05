import { MongoClient, Db, ObjectId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { initDB } from "../../db/db";
import { buildUserRepository } from "../user-repository";
import { buildUser } from "../../../core/auth/entities/user";

const idGenerator = {
  makeId: () => {
    const id = new ObjectId();
    return id.toString();
  },
};

let db: Db;
let connection: MongoClient;
let mongoServer: MongoMemoryServer;

describe("user repositories", () => {
  const email = "exemple@gmail.com";
  const password = "password";

  beforeAll(async () => {
    const dbData = await initDB();
    db = dbData.db;
    connection = dbData.connection;
    mongoServer = dbData.mongoServer;
  });

  afterAll(async () => {
    jest.setTimeout(20000);

    await mongoServer.stop();
    await connection.close();
  });

  it("should find a user by email", async () => {
    const userRepository = buildUserRepository(db);
    const user = await buildUser({
      id: idGenerator.makeId(),
      email,
      password,
    });
    await userRepository.add(user);
    const expectedUser = await userRepository.one(email);

    expect(expectedUser).toEqual(user);

    await db.collection("users").deleteOne({ email });
  });
});
