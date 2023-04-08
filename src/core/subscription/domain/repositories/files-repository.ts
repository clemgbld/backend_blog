export type FilesRepository = {
  readFile: (path: string, unicode: string) => Promise<string>;
};
