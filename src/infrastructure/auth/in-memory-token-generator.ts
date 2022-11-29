export const inMemoryTokenGenerator = () => ({
  generate: (id?: string) => ({
    token: `fake-token${id}`,
    expirationDate: 7776000000,
  }),
});
