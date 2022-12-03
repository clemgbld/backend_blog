import { User } from "../../core/auth/entities/user";

export const buildInMemoryUserRepository = () => {
  const db: Set<User> = new Set();
  return {
    add: async (user: User) => {
      db.add(user);
    },
    one: async (email: string) => [...db].find((user) => user.email === email),
    findById: async (id: string) => [...db].find((user) => user.id === id),
  };
};
