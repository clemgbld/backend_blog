import { inMemoryTokenGenerator } from "../../../../infrastructure/auth/in-memory-token-generator";
import { buildInMemoryUserRepository } from "../../../../infrastructure/auth/in-memory-user-repository";
import { buildUser } from "../../entities/user";
import { protect } from "../protect";

let userRepository: ReturnType<typeof buildInMemoryUserRepository>;
let tokenGenerator: ReturnType<typeof inMemoryTokenGenerator>;

const email = "exemple@gmail.com";
const password = "password";

beforeEach(() => {
  userRepository = buildInMemoryUserRepository();
  tokenGenerator = inMemoryTokenGenerator();
});

describe("protect", () => {
  describe("given that the user is logged in", () => {
    it("should be able to do an operation", async () => {
      const user = await buildUser({ id: "abc", email, password });
      await userRepository.add(user);

      const bearerToken = "Bearer FAKE_TOKEN";

      const isLoggedIn = await protect({
        userRepository,
        tokenGenerator,
        bearerToken,
      });

      expect(isLoggedIn).toEqual({ user, hasToken: true });
    });

    describe("given that the user is not logged in", () => {
      it("should not enable the user to an operation when there is no token", async () => {
        const bearerToken = "Bearer";

        const isLoggedIn = await protect({
          userRepository,
          tokenGenerator,
          bearerToken,
        });

        expect(isLoggedIn).toEqual({ user: null, hasToken: false });
      });

      it("should not enable the user to do an operation when there is a non valid token", async () => {
        const user = await buildUser({ id: "abc", email, password });
        await userRepository.add(user);
        const bearerToken = "Bearer FAKE_TOKEN_NOT_VALID";
        const isLoggedIn = await protect({
          userRepository,
          tokenGenerator,
          bearerToken,
        });
        expect(isLoggedIn).toEqual({ user: null, hasToken: true });
      });
    });
  });
});
