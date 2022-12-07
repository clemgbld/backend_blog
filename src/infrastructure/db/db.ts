import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const initDB = async () => {
  const mongoServer = await MongoMemoryServer.create();

  const connection = await MongoClient.connect(mongoServer.getUri(), {});

  const db = connection.db("admin");

  return { db, connection, mongoServer };
};

export const initRealDB = async () => {
  const url = process.env.DB || "";
  const dbName = process.env.DB_NAME;
  const client = new MongoClient(url);
  await client.connect();
  return client.db(dbName);
};
