/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilesRepository } from "../../core/subscription/domain/repositories/files-repository";

export const buildInMemoryFilesRepository = (
  fileContent: string
): FilesRepository => ({
  readFile: async (path: string, unicode: string) => "",
});
