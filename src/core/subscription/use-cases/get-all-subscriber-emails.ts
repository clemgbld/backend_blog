import { SubscriptionRepository } from "../repositories/subscription-repository";

export const getAllSubscriberEmails = async (
  subscriptionRepository: SubscriptionRepository
) => subscriptionRepository.all();
