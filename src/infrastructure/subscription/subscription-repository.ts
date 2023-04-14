import { Db } from "mongodb";
import { SubscriptionRepository } from "../../core/subscription/domain/repositories/subscription-repository";
import { adaptDataListForApp, adaptIdForMongoDB } from "../db/utils/adapt-data";

export const buildSubscriptionsRepository = (
  db: Db
): SubscriptionRepository => {
  const collection = db.collection("emails");
  return {
    all: async () => {
      const emailsFromDb = await collection.find().toArray();
      return adaptDataListForApp(emailsFromDb);
    },
    delete: async (id) => {
      const doc = await collection.deleteOne({ _id: adaptIdForMongoDB(id) });

      return doc.deletedCount < 1;
    },
  };
};
