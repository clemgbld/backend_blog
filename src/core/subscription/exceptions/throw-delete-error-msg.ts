export const throwDeleteErrorMessage = (id: string) => {
  throw new Error(`Subscriber email with the id ${id} does not exist`);
};
