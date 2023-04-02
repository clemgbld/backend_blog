import { buildInMemorySubscriptionRepository } from "../../../../infrastructure/subscription/in-memory-subscription-repository";
import { getAllSubscriberEmails } from "../get-all-subscriber-emails";

describe("get all subscriber emails", () => {
  it("should retrieve all subscriber emails", async () => {
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    expect(await getAllSubscriberEmails(subscriptionRepository)).toEqual([
      {
        id: "1",
        email: "exemple@hotmail.fr",
      },
      {
        id: "2",
        email: "exemple2@hotmail.fr",
      },
    ]);
  });
});
