import { EmailContentIn } from "../../../app/subscription/dto/email-content-in";
import { SubscriptionRepository } from "../domain/repositories/subscription-repository";
import { FilesRepository } from "../domain/repositories/files-repository";
import { EmailService } from "../domain/gateway/email-service";
import { SUBJET_WORDING } from "../domain/email-constants";
import { buildEmailListStr } from "../domain/services/builld-email-list-str";
import { validateEmailContentIn } from "../domain/services/validate-email-content-in";
import { fillEmailTemplate } from "../domain/services/fill-email-template";

const EMAIL_TEMPLATE_PATH = "../../../templates/email.html";

export const notifySubscibers = async ({
  emailContentIn,
  subscriptionRepository,
  filesRepository,
  emailService,
}: {
  emailContentIn: EmailContentIn;
  subscriptionRepository: SubscriptionRepository;
  filesRepository: FilesRepository;
  emailService: EmailService;
}) => {
  validateEmailContentIn(emailContentIn);

  const [emails, emailTemplate] = await Promise.all([
    subscriptionRepository.all(),
    filesRepository.readFile(EMAIL_TEMPLATE_PATH, "utf8"),
  ]);

  await emailService.sendEmail({
    to: buildEmailListStr(emails),
    subject: `${SUBJET_WORDING} ${emailContentIn.title}`,
    html: fillEmailTemplate({ emailTemplate, emailContentIn }),
  });
};
