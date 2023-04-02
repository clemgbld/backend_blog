import { SubscriptionRepository } from "../../core/subscription/repositories/subscription-repository";

export const buildInMemorySubscriptionRepository = (
  subscriberEmailsStore: Record<string, string>
): SubscriptionRepository => ({
  all: async () =>
    Object.entries(subscriberEmailsStore).map(([id, email]) => ({ id, email })),

  delete: async (id: string) => {
    delete subscriberEmailsStore[id];
    return subscriberEmailsStore[id] ? false : true;
  },
});
