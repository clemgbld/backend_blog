import { pipe, map, join } from "ramda";
import { SubscriptionEmail } from "../subscription-email";

const SEPARATOR = ", ";

const mapSupscriptonEmailToEmail = ({ email }: SubscriptionEmail) => email;

export const buildEmailListStr = pipe(
  map(mapSupscriptonEmailToEmail),
  join(SEPARATOR)
);
