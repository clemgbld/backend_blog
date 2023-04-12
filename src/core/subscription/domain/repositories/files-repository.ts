export type FilesRepository = {
  readFile: (path: string, unicode: BufferEncoding) => Promise<string>;
};
