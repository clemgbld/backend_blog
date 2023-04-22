import { User } from "../domain/user";

type Token = {
  token: string;
  expirationDate: number;
};

export type TokenGenerator = {
  generate: (id?: string) => Token;
  decode: (token: string) => Promise<{
    id: string;
  }>;
};

export type UserRepository = {
  add: (user: User) => Promise<void>;
  one: (email: string) => Promise<User | undefined>;
  findById: (id: string) => Promise<User | undefined>;
};
