import { Db } from "mongodb";
import { User } from "../../core/auth/entities/user";

const adaptDataForMongoDb = (data: any) => {
  const id = data.id;
  const adaptedData = { ...data };
  delete adaptedData.id;
  return { _id: id, ...adaptedData };
};

const adaptDataForApp = (data: any) => {
  const id = data._id.toString();
  const adaptedData = { ...data };
  delete adaptedData._id;
  return { id, ...adaptedData };
};

export const buildUserRepository = (db: Db) => {
  const collection = db.collection("users");
  return {
    add: async (user: User) => {
      collection.insertOne(adaptDataForMongoDb(user));
    },
    one: async (email: string): Promise<User | undefined> => {
      const userFromDb = await collection.findOne({ email });
      return adaptDataForApp(userFromDb);
    },
  };
};
