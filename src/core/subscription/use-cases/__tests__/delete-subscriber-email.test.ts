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

  it("should throw an error when there is no subscriber email to delete with the given id", async () => {
    const subscriberEmailsStore = {
      "1": "exemple@hotmail.fr",
      "2": "exemple2@hotmail.fr",
    };
    const subscriptionRepository = buildInMemorySubscriptionRepository(
      subscriberEmailsStore
    );

    const id = "3";

    await expect(async () =>
      deleteSubscriberEmail({ subscriptionRepository, id })
    ).rejects.toThrowError(`Subscriber email with the id ${id} does not exist`);
  });
});
