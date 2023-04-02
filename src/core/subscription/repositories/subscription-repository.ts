type SubscriptionEmail = {
  id: string;
  email: string;
};

export type SubscriptionRepository = {
  all: () => Promise<SubscriptionEmail[]>;
};
