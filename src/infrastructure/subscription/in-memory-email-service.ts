import { EmailInfos } from "../../core/subscription/domain/email-infos";

export const buildInMemoryEmailService = ({
  emailServiceSpy,
}: {
  emailServiceSpy: any;
}) => ({
  sendEmail: async (emailInfos: EmailInfos) => emailServiceSpy(emailInfos),
});
