import { SubscriptionRepository } from "../domain/repositories/subscription-repository";

export const getAllSubscriberEmails = async (
  subscriptionRepository: SubscriptionRepository
) => subscriptionRepository.all();
