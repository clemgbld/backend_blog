import { EmailContentIn } from "../../../../app/subscription/dto/email-content-in";
import { pipeValidators } from "../../../common/pipe-validators";

type EmailContentField =
  | "title"
  | "id"
  | "summary"
  | "img"
  | "topic"
  | "timeToRead";

const FIELDS: EmailContentField[] = [
  "title",
  "id",
  "summary",
  "img",
  "topic",
  "timeToRead",
];

const validateField =
  (field: EmailContentField) => (emailContentIn: EmailContentIn) =>
    !emailContentIn[field] ? field : undefined;

const subscriptionPipeValidators = pipeValidators<
  EmailContentIn,
  EmailContentField
>(...FIELDS.map((filed) => validateField(filed)));

export const validateEmailContentIn = (emailContentIn: EmailContentIn) => {
  const field = subscriptionPipeValidators(emailContentIn);
  if (field) {
    throw new Error(`${field} is mandatory`);
  }
};
