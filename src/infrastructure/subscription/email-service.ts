/* eslint-disable @typescript-eslint/ban-ts-comment */
import nodemailer from "nodemailer";
import { EmailContentIn } from "../../app/subscription/dto/email-content-in";
import { EmailService } from "../../core/subscription/domain/gateway/email-service";

export const buildEmailService = (): EmailService => {
  const transporter = nodemailer.createTransport({
    // @ts-ignore
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
  return {
    sendEmail: async (emailInfos: EmailContentIn) => {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_EMAIL,
          to: emailInfos.to,
          subject: emailInfos.subject,
          html: emailInfos.html,
        });
      } catch (err) {
        throw new Error(`Error ${err}`);
      }
    },
  };
};
