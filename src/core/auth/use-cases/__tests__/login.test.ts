import { buildInMemoryUserRepository } from "../../../../infrastructure/auth/in-memory-user-repository";
import { inMemoryTokenGenerator } from "../../../../infrastructure/auth/in-memory-token-generator";
import { buildUser } from "../../entities/user";
import { login } from "../login";

let userRepository: ReturnType<typeof buildInMemoryUserRepository>;
let tokenGenerator: ReturnType<typeof inMemoryTokenGenerator>;

beforeEach(() => {
  userRepository = buildInMemoryUserRepository();
  tokenGenerator = inMemoryTokenGenerator();
});

const email = "exemple@gmail.com";
const password = "password";

describe("login user", () => {
  it("should not login login the user when the user does not have an account", async () => {
    expect(
      await login({
        email,
        password,
        userRepository,
        tokenGenerator,
      })
    ).toBe(null);
  });

  it("should login the user when the the user exist and the recieved password match the user password", async () => {
    const user = await buildUser({ id: "abc", email, password });
    await userRepository.add(user);
    expect(
      await login({
        email,
        password,
        userRepository,
        tokenGenerator,
      })
    ).toEqual({ token: "fake-tokenabc", expirationDate: 7776000000 });
  });

  it("should not login the user exist but the password does not match with the already existing user account", async () => {
    const user = await buildUser({ id: "abc", email, password });
    await userRepository.add(user);
    expect(
      await login({
        email,
        password: "non-matching-password",
        userRepository,
        tokenGenerator,
      })
    ).toBe(null);
  });
});
