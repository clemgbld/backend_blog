import { EmailInfos } from "../../core/subscription/domain/email-infos";
import { EmailService } from "../../core/subscription/domain/gateway/email-service";

export const buildInMemoryEmailService = ({
  emailServiceSpy,
}: {
  emailServiceSpy: any;
}): EmailService => ({
  sendEmail: async (emailInfos: EmailInfos) => emailServiceSpy(emailInfos),
});
