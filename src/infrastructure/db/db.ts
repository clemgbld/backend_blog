import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const initDB = async (inMemory = true) => {
  const mongoServer = await MongoMemoryServer.create();

  const connection = await MongoClient.connect(mongoServer.getUri(), {});

  const db = connection.db("admin");

  return { db, connection, mongoServer };
};
