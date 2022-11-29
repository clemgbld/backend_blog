import { User } from "../entities/user";

type Token = {
  token: string;
  expirationDate: number;
};

export type TokenGenerator = {
  generate: (id?: string) => Token;
};

export type UserRepository = {
  add: (user: User) => Promise<void>;
  one: (email: string) => Promise<User | undefined>;
};
