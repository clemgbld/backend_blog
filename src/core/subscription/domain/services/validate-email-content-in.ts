import { EmailContentIn } from "../../../../app/subscription/dto/email-content-in";
import { pipeValidators } from "../../../common/pipe-validators";

const validateField = (field: string) => (emailContentIn: EmailContentIn) =>
  !emailContentIn[field] ? field : undefined;

const subscriptionPipeValidators = pipeValidators<EmailContentIn>(
  validateField("title"),
  validateField("id"),
  validateField("summary"),
  validateField("img"),
  validateField("topic"),
  validateField("timeToRead")
);

export const validateEmailContentIn = (emailContentIn: EmailContentIn) => {
  const field = subscriptionPipeValidators(emailContentIn);
  if (field) {
    throw new Error(`${field} is mandatory`);
  }
};
