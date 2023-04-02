import { SubscriptionRepository } from "../repositories/subscription-repository";

export const deleteSubscriberEmail = async ({
  subscriptionRepository,
  id,
}: {
  subscriptionRepository: SubscriptionRepository;
  id: string;
}) => {
  const isFailure = await subscriptionRepository.delete(id);

  if (isFailure) {
    throw new Error(`subscriber email with the id ${id} does not exist`);
  }
};
