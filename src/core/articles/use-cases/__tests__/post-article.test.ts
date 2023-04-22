import { buildInMemoryArticlesRepository } from "../../../../infrastructure/articles/in-memory-articles-repository";
import { postArticle } from "../post-article";
import { buildInMemoryTime } from "../../../../infrastructure/time/in-memory-time";
import { buildInMemoryIdGenerator } from "../../../../infrastructure/id/in-memory-id-generator";

describe("post new article", () => {
  it("post the new article into the blog when it is ready to be published", async () => {
    const time = buildInMemoryTime();
    const idGenerator = buildInMemoryIdGenerator();

    const articleIn = {
      id: "abc",
      title: "my article",
      date: 1234354,
      content: [{ type: "h1", id: "1", children: [{ text: "my article" }] }],
    };

    const articlesRepository = buildInMemoryArticlesRepository();

    expect(
      await postArticle({ articleIn, articlesRepository, time, idGenerator })
    ).toEqual({
      id: "FAKE_ID",
      title: "my article",
      summary: "",
      date: 123456,
      hide: false,
      lightMode: false,
      timeToRead: "1 min read",
      topic: null,
      content: articleIn.content,
    });
    expect(await articlesRepository.all()).toEqual([
      {
        id: "FAKE_ID",
        title: "my article",
        summary: "",
        date: 123456,
        hide: false,
        lightMode: false,
        timeToRead: "1 min read",
        topic: null,
        content: JSON.stringify(articleIn.content),
      },
    ]);
  });
});
