import { buildInMemoryFilesRepository } from "../../../../infrastructure/files/in-memory-files-repository";
import { buildInMemorySubscriptionRepository } from "../../../../infrastructure/subscription/in-memory-subscription-repository";
import { buildInMemoryEmailService } from "../../../../infrastructure/subscription/in-memory-email-service";
import { notifySubscibers } from "../notify-subscribers";
import { emailTemplate } from "../../fixtures/email-template";

describe("notify subscribers", () => {
  it("should notify all the subscribers by email when a new article is published", async () => {
    const filesRepository = buildInMemoryFilesRepository(emailTemplate);
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const emailServiceSpy = jest.fn();

    const emailService = buildInMemoryEmailService({ emailServiceSpy });

    const emailContentIn = {
      title: "How to use the useState hook",
      id: "1",
      summary: "summary",
      img: "imgSrc",
      topic: "React",
      timeToRead: "7 min to read",
    };

    await notifySubscibers({
      emailContentIn,
      subscriptionRepository,
      filesRepository,
      emailService,
    });

    expect(emailServiceSpy).toHaveBeenCalledWith({
      to: "exemple@hotmail.fr, exemple2@hotmail.fr",
      subject: "A new Article has been published: How to use the useState hook",
      html: `<html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0;" />
        <meta name="format-detection" content="telephone=no" />
        <style>
          body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            width: 100% !important;
            height: 100% !important;
          }
          body,
          table,
          td,
          div,
          p,
          a {
            -webkit-font-smoothing: antialiased;
            text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            line-height: 100%;
          }
          table,
          td {
            border-collapse: collapse !important;
            border-spacing: 0;
          }
          img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          #outlook a {
            padding: 0;
          }
          .ReadMsgBody {
            width: 100%;
          }
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
          @media all and (min-width: 560px) {
            .container {
              border-radius: 8px;
              -webkit-border-radius: 8px;
              -moz-border-radius: 8px;
              -khtml-border-radius: 8px;
            }
          }
          a,
          a:hover {
            color: #127db3;
          }
          .footer a,
          .footer a:hover {
            color: #999999;
          }
        </style>
      
        <title>Get this responsive email template</title>
      </head>
      <body
        topmargin="0"
        rightmargin="0"
        bottommargin="0"
        leftmargin="0"
        marginwidth="0"
        marginheight="0"
        width="100%"
        style="
          border-collapse: collapse;
          border-spacing: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          -webkit-font-smoothing: antialiased;
          text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          line-height: 100%;
          background-color: #212529;
          color: #000000;
        "
        bgcolor="#212529"
        text="#000000"
      >
        <table
          width="100%"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0;
            padding: 0;
            width: 100%;
          "
          class="background"
        >
          <tr>
            <td
              align="center"
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                margin: 0;
                padding: 0;
              "
              bgcolor="#212529"
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                width="560"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  padding: 0;
                  width: inherit;
                  max-width: 560px;
                "
                class="wrapper"
              >
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      padding-top: 20px;
                      padding-bottom: 20px;
                    "
                  >
                    <div
                      style="
                        display: none;
                        visibility: hidden;
                        overflow: hidden;
                        opacity: 0;
                        font-size: 1px;
                        line-height: 1px;
                        height: 0;
                        max-height: 0;
                        max-width: 0;
                        color: #212529;
                      "
                      class="preheader"
                    ></div>
                    <a
                      target="_blank"
                      style="text-decoration: none"
                      href="https://blog-clement-gombauld.vercel.app/"
                      ><img
                        border="0"
                        vspace="0"
                        hspace="0"
                        src="https://blog-clement-gombauld.vercel.app/_next/image?url=%2Fapp-logo.png&w=1080&q=75"
                        width="90"
                        height="87"
                        alt="Logo"
                        title="Logo"
                        style="
                          object-fit: cover;
                          color: #000000;
                          font-size: 10px;
                          margin: 0;
                          padding: 0;
                          outline: none;
                          text-decoration: none;
                          -ms-interpolation-mode: bicubic;
                          border: none;
                          display: block;
                        "
                    /></a>
                  </td>
                </tr>
              </table>
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                bgcolor="#212529"
                color="#c5f6fa"
                width="560"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  padding: 0;
                  width: inherit;
                  max-width: 560px;
                "
                class="container"
              >
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 24px;
                      font-weight: bold;
                      line-height: 130%;
                      padding-top: 25px;
                      color: #08fdd8;
                      font-family: sans-serif;
                    "
                    class="header"
                  >
                    A new Article has been published!
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-bottom: 3px;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 18px;
                      font-weight: 300;
                      line-height: 150%;
                      padding-top: 5px;
                      color: #08fdd8;
                      font-family: sans-serif;
                    "
                    class="subheader"
                  >
                    ${emailContentIn.title}
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-top: 20px;
                    "
                    class="hero"
                  >
                    <a
                      target="_blank"
                      style="text-decoration: none"
                      href="https://blog-clement-gombauld.vercel.app/${emailContentIn.id}"
                      ><img
                        border="0"
                        vspace="0"
                        hspace="0"
                        src="${emailContentIn.img}"
                        alt="${emailContentIn.title}"
                        width="560"
                        style="
                          object-fit: cover;
                          width: 100%;
                          max-width: 560px;
                          color: #000000;
                          font-size: 13px;
                          margin: 0;
                          padding: 0;
                          outline: none;
                          text-decoration: none;
                          -ms-interpolation-mode: bicubic;
                          border: none;
                          display: block;
                        "
                    /></a>
                  </td>
                </tr>
                <tr>
                  <td
                  align="center"
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    margin: 0;
                    padding: 0;
                    padding-left: 6.25%;
                    padding-right: 6.25%;
                    width: 87.5%;
                    font-size: 17px;
                    font-weight: 400;
                    line-height: 160%;
                    padding-top: 25px;
                    color: #c5f6fa;
                    font-family: sans-serif;
                  "
                  class="paragraph"
                >
                  Topic: ${emailContentIn.topic}
                </td>
                </tr>
                <tr>
                  <td
                  align="center"
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    margin: 0;
                    padding: 0;
                    padding-left: 6.25%;
                    padding-right: 6.25%;
                    width: 87.5%;
                    font-size: 17px;
                    font-weight: 400;
                    line-height: 160%;
                    padding-top: 25px;
                    color: #c5f6fa;
                    font-family: sans-serif;
                  "
                  class="paragraph"
                >
                  Time to read: ${emailContentIn.timeToRead}
                </td>
                </tr>
                <tr>
                  
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 17px;
                      font-weight: 400;
                      line-height: 160%;
                      padding-top: 25px;
                      color: #c5f6fa;
                      font-family: sans-serif;
                    "
                    class="paragraph"
                  >
                    ${emailContentIn.summary}
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      padding-top: 25px;
                      padding-bottom: 5px;
                    "
                    class="button"
                  >
                    <a
                      href="https://blog-clement-gombauld.vercel.app/${emailContentIn.id}"
                      target="_blank"
                      style="text-decoration: underline"
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        style="
                          max-width: 240px;
                          min-width: 120px;
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                        "
                      >
                        <tr>
                          <td
                            align="center"
                            valign="middle"
                            style="
                              padding: 12px 24px;
                              margin: 0;
                              text-decoration: underline;
                              border-collapse: collapse;
                              border-spacing: 0;
                              border-radius: 4px;
                              -webkit-border-radius: 4px;
                              -moz-border-radius: 4px;
                              -khtml-border-radius: 4px;
                            "
                            bgcolor="#08fdd8"
                          >
                            <a
                              target="_blank"
                              style="
                                text-decoration: underline;
                                color: #000000;
                                font-family: sans-serif;
                                font-size: 17px;
                                font-weight: 400;
                                line-height: 120%;
                              "
                              href="https://blog-clement-gombauld.vercel.app/${emailContentIn.id}"
                            >
                              Read the article
                            </a>
                          </td>
                        </tr>
                      </table></a
                    >
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      padding-top: 25px;
                    "
                    class="line"
                  >
                    <hr
                      color="#E0E0E0"
                      align="center"
                      width="100%"
                      size="1"
                      noshade
                      style="margin: 0; padding: 0"
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      margin: 0;
                      padding: 0;
                      padding-left: 6.25%;
                      padding-right: 6.25%;
                      width: 87.5%;
                      font-size: 13px;
                      font-weight: 400;
                      line-height: 150%;
                      padding-top: 20px;
                      padding-bottom: 20px;
                      color: #c5f6fa;
                    "
                    class="footer"
                  >
                    If you want to unsubscribe yourself from this newsletter, please
                    send an email to clementgombaulddev@gmail.com.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `
        .replace(/\s+/g, " ")
        .trim(),
    });
  });

  it("should throw an error when there is no title", async () => {
    const filesRepository = buildInMemoryFilesRepository(emailTemplate);
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const emailServiceSpy = jest.fn();

    const emailService = buildInMemoryEmailService({ emailServiceSpy });

    const emailContentIn = {
      id: "1",
      summary: "summary",
      img: "imgSrc",
      topic: "React",
      timeToRead: "7 min to read",
    };

    await expect(async () =>
      notifySubscibers({
        emailContentIn,
        emailService,
        filesRepository,
        subscriptionRepository,
      })
    ).rejects.toThrowError("title is mandatory");
  });

  it("should throw an error when there is no id", async () => {
    const filesRepository = buildInMemoryFilesRepository(emailTemplate);
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const emailServiceSpy = jest.fn();

    const emailService = buildInMemoryEmailService({ emailServiceSpy });

    const emailContentIn = {
      title: "title",
      summary: "summary",
      img: "imgSrc",
      topic: "React",
      timeToRead: "7 min to read",
    };

    await expect(async () =>
      notifySubscibers({
        emailContentIn,
        emailService,
        filesRepository,
        subscriptionRepository,
      })
    ).rejects.toThrowError("id is mandatory");
  });

  it("should throw an error when there is no summary", async () => {
    const filesRepository = buildInMemoryFilesRepository(emailTemplate);
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const emailServiceSpy = jest.fn();

    const emailService = buildInMemoryEmailService({ emailServiceSpy });

    const emailContentIn = {
      title: "title",
      id: "1",
      img: "imgSrc",
      topic: "React",
      timeToRead: "7 min to read",
    };

    await expect(async () =>
      notifySubscibers({
        emailContentIn,
        emailService,
        filesRepository,
        subscriptionRepository,
      })
    ).rejects.toThrowError("summary is mandatory");
  });

  it("should throw an error when there is no img", async () => {
    const filesRepository = buildInMemoryFilesRepository(emailTemplate);
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const emailServiceSpy = jest.fn();

    const emailService = buildInMemoryEmailService({ emailServiceSpy });

    const emailContentIn = {
      title: "tile",
      id: "1",
      summary: "summary",
      topic: "React",
      timeToRead: "7 min to read",
    };

    await expect(async () =>
      notifySubscibers({
        emailContentIn,
        emailService,
        filesRepository,
        subscriptionRepository,
      })
    ).rejects.toThrowError("img is mandatory");
  });

  it("should throw an error when there is no topic", async () => {
    const filesRepository = buildInMemoryFilesRepository(emailTemplate);
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const emailServiceSpy = jest.fn();

    const emailService = buildInMemoryEmailService({ emailServiceSpy });

    const emailContentIn = {
      title: "title",
      id: "1",
      summary: "summary",
      img: "imgSrc",
      timeToRead: "7 min to read",
    };

    await expect(async () =>
      notifySubscibers({
        emailContentIn,
        emailService,
        filesRepository,
        subscriptionRepository,
      })
    ).rejects.toThrowError("topic is mandatory");
  });

  it("should throw an error when there is no time to read", async () => {
    const filesRepository = buildInMemoryFilesRepository(emailTemplate);
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const emailServiceSpy = jest.fn();

    const emailService = buildInMemoryEmailService({ emailServiceSpy });

    const emailContentIn = {
      title: "title",
      id: "1",
      summary: "summary",
      img: "imgSrc",
      topic: "React",
    };

    await expect(async () =>
      notifySubscibers({
        emailContentIn,
        emailService,
        filesRepository,
        subscriptionRepository,
      })
    ).rejects.toThrowError("timeToRead is mandatory");
  });
});
