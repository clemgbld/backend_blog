import { Db } from "mongodb";
import { SubscriptionRepository } from "../../core/subscription/domain/repositories/subscription-repository";

export const buildSubscripitonRepository = (
  db: Db
): SubscriptionRepository => ({
  all: async () => [],
  delete: async (id) => true,
});
