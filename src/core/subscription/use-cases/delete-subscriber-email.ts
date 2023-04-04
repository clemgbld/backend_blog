import { SubscriptionRepository } from "../domain/repositories/subscription-repository";
import { throwDeleteErrorMessage } from "../domain/exceptions/throw-delete-error-msg";

export const deleteSubscriberEmail = async ({
  subscriptionRepository,
  id,
}: {
  subscriptionRepository: SubscriptionRepository;
  id: string;
}) => {
  const isFailure = await subscriptionRepository.delete(id);

  if (isFailure) {
    throwDeleteErrorMessage(id);
  }
};
