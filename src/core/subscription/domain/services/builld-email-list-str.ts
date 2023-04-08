import { pipe, map, join } from "ramda";
import { SubscriptionRepository } from "../repositories/subscription-repository";
import { SubscriptionEmail } from "../subscription-email";

const SEPARATOR = ", ";

const mapSupscriptonEmailToEmail = ({ email }: SubscriptionEmail) => email;

const joinEmailsByComma = pipe(
  map(mapSupscriptonEmailToEmail),
  join(SEPARATOR)
);

export const buildEmailListStr = async (
  subscriptionRepository: SubscriptionRepository
) => joinEmailsByComma(await subscriptionRepository.all());
