import { User } from "../../core/auth/entities/user";

export const buildInMemoryUserRepository = () => {
  const db: Set<User> = new Set();
  return {
    add: async (user: User) => {
      db.add(user);
    },
    one: (email: string) => {
      return [...db].find((user) => user.email === email);
    },
  };
};
