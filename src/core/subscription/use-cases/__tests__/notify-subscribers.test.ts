import { buildInMemoryFilesRepository } from "../../../../infrastructure/subscription/in-memory-files-repository";

describe("notify subscribers",()=>{
  it('should notify all the subscribers by email when a new article is published', async () => {
    const filesRepository = buildInMemoryFilesRepository();
  });
})