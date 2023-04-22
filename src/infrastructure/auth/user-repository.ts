import { Db } from "mongodb";
import { User } from "../../core/auth/domain/user";
import {
  adaptDataForApp,
  adaptDataForMongoDb,
  adaptIdForMongoDB,
} from "../db/utils/adapt-data";

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
    findById: async (id: string): Promise<User | undefined> => {
      const userFromDb = await collection.findOne({
        _id: adaptIdForMongoDB(id),
      });
      return adaptDataForApp(userFromDb);
    },
  };
};
