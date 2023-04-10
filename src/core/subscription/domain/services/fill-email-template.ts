import { EmailContentIn } from "../../../../app/subscription/dto/email-content-in";

export const fillEmailTemplate = ({
  emailTemplate,
  emailContentIn,
}: {
  emailTemplate: string;
  emailContentIn: EmailContentIn;
}) =>
  emailTemplate
    .replace(/#TITLE/g, `${emailContentIn.title}`)
    .replace("#IMG_SRC", `${emailContentIn.img}`)
    .replace("#TOPIC", `${emailContentIn.topic}`)
    .replace("#SUMMARY", `${emailContentIn.summary}`)
    .replace(/#ID/g, `${emailContentIn.id}`)
    .replace("#TIME_TO_READ", `${emailContentIn.timeToRead}`);
