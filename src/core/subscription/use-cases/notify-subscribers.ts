import { EmailContentIn } from "../../../app/subscription/dto/email-content-in";
import { SubscriptionRepository } from "../domain/repositories/subscription-repository";
import { FilesRepository } from "../domain/repositories/files-repository";
import { EmailService } from "../domain/gateway/email-service";
import { SUBJET_WORDING } from "../domain/email-constants";

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
  const emails = await subscriptionRepository.all();

  const transformedEmails = emails.map(({ email }) => email).join(", ");

  await emailService.sendEmail({
    to: transformedEmails,
    subject: `${SUBJET_WORDING} ${emailContentIn.title}`,
    html: "",
  });
};
