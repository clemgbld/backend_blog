import { buildInMemoryArticlesRepository } from "../../../../infrastructure/in-memory-articles-repository";
import { buildArticle } from "../../entites/articles";
import { addArticleToBlog } from "../test-helper/test-helper";
import { retrieveArticle } from "../retrieve-article";

describe("retrieve article", () => {
  it("should retrieve the expected article from the blog", async () => {
    const article = buildArticle({
      id: "abc",
      title: "title 1",
      date: 1234,
      content: [{ type: "h1", id: "1", children: [{ text: "text" }] }],
    });

    const articlesRepository = buildInMemoryArticlesRepository();

    await addArticleToBlog(article, articlesRepository);

    expect(await retrieveArticle({ id: "abc", articlesRepository })).toEqual(
      article
    );
  });
});
