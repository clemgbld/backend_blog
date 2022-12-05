import { Db } from "mongodb";
import { User } from "../../core/auth/entities/user";
import { adaptDataForApp, adaptDataForMongoDb } from "../db/utils/adapt-data";

export const buildUserRepository = (db: Db) => {
  const collection = db.collection("users");
  return {
    add: async (user: User) => {
      await collection.insertOne(adaptDataForMongoDb(user));
    },
    one: async (email: string): Promise<User | undefined> => {
      const userFromDb = await collection.findOne({ email });
      return adaptDataForApp(userFromDb);
    },
  };
};
