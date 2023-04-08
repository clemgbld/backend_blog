import { EmailContentIn } from "../../../app/subscription/dto/email-content-in";
import { SubscriptionRepository } from "../domain/repositories/subscription-repository";
import { FilesRepository } from "../domain/repositories/files-repository";
import { EmailService } from "../domain/gateway/email-service";

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
  await emailService.sendEmail({ to: "", subject: "", html: "" });
};
