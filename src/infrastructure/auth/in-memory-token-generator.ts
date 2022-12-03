export const inMemoryTokenGenerator = () => ({
  generate: (id?: string) => ({
    token: `fake-token${id}`,
    expirationDate: 7776000000,
  }),

  decode: async (token: string) => ({
    id: token === "FAKE_TOKEN" ? "abc" : "",
  }),
});
