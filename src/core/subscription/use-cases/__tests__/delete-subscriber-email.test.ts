import { buildInMemorySubscriptionRepository } from "../../../../infrastructure/subscription/in-memory-subscription-repository";
import { deleteSubscriberEmail } from "../delete-subscriber-email";

describe("delete subscriber email", () => {
  it("should sucessfully delete the subsciber email", async () => {
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const id = "1";

    await deleteSubscriberEmail({ subscriptionRepository, id });

    expect(await subscriptionRepository.all()).toEqual([
      { id: "2", email: "exemple2@hotmail.fr" },
    ]);
  });
});
