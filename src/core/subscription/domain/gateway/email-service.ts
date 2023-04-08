import { EmailInfos } from "../email-infos";

export type EmailService = {
  sendEmail: (emailInfos: EmailInfos) => Promise<void>;
};
