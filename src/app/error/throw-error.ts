import { AppError } from "./app-error";

export const throw400ErrorWhenIdDoesNotExist = (id: string) => {
  throw new AppError(`${id} id does not exist`, 400);
};
