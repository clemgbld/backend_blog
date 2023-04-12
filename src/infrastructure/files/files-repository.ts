import { promises as fs } from "fs";
import { FilesRepository } from "../../core/subscription/domain/repositories/files-repository";

export const buildFilesRepository = (): FilesRepository => ({
  readFile: async (path: string, unicode: BufferEncoding) => {
    try {
      return await fs.readFile(path, unicode);
    } catch (err) {
      throw new Error("Reading file operation failed");
    }
  },
});
