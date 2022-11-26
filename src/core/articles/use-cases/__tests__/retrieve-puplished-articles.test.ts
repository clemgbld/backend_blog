import { buildInMemoryArticlesRepository } from "../../../../infrastructure/in-memory-articles-repository";
import { buildArticle } from "../../entites/articles";
import { addArticleToBlog } from "../test-helper/test-helper";
import { retrievePuplishedArticles } from "../retrieve-puplished-articles";

describe("retrieve all published articles", () => {
  it("should retieve all published articles from the blog", async () => {
    const article1 = buildArticle({
      id: "abc",
      title: "title 1",
      date: 1234,
      content: [{ type: "h1", id: "1", children: [{ text: "text" }] }],
    });

    const article2 = buildArticle({
      id: "defg",
      title: "title 2",
      date: 12345,
      hide: true,
      content: [{ type: "h1", id: "1", children: [{ text: "text" }] }],
    });

    const articlesRepository = buildInMemoryArticlesRepository();

    await addArticleToBlog(article1, articlesRepository);
    await addArticleToBlog(article2, articlesRepository);

    expect(await retrievePuplishedArticles({ articlesRepository })).toEqual([
      article1,
    ]);
  });
});
