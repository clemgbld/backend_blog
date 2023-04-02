import { SubscriptionRepository } from "../repositories/subscription-repository";

export const deleteSubscriberEmail = async ({
  subscriptionRepository,
  id,
}: {
  subscriptionRepository: SubscriptionRepository;
  id: string;
}) => {
  await subscriptionRepository.delete(id);
};
