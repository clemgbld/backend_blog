import { SubscriptionEmail } from "../subscription-email";

export type SubscriptionRepository = {
  all: () => Promise<SubscriptionEmail[]>;
  delete: (id: string) => Promise<boolean>;
};
