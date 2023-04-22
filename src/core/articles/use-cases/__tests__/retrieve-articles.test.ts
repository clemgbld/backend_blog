import { buildInMemoryArticlesRepository } from "../../../../infrastructure/articles/in-memory-articles-repository";
import { buildArticle } from "../../domain/articles";
import { addArticleToBlog } from "../test-helper/test-helper";
import { retrieveArticles } from "../retrieve-articles";

describe("retrieve articles", () => {
  it("should retrieve all the articles from the blog", async () => {
    const article = buildArticle({
      id: "abc",
      title: "title 1",
      date: 1234,
      content: [{ type: "h1", id: "1", children: [{ text: "text" }] }],
    });

    const articlesRepository = buildInMemoryArticlesRepository();

    await addArticleToBlog(article, articlesRepository);

    expect(await retrieveArticles({ articlesRepository })).toEqual([article]);
  });
});
