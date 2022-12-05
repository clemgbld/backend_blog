import { ObjectId } from "mongodb";

export const buildIdGenerator = () => ({
  makeId: () => {
    const id = new ObjectId();
    return id.toString();
  },
});
