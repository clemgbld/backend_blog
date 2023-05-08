export const buildThrowWhenFalse =
  (message: string) => (isSuccess: boolean) => {
    if (!isSuccess) {
      throw new Error(message);
    }
  };
