import { buildArticle } from "../../entites/articles";
import { buildInMemoryArticlesRepository } from "../../../../infrastructure/articles/in-memory-articles-repository";
import { postArticle } from "../post-article";

describe("post new article", () => {
  it("post the new article into the blog when it is ready to be published", async () => {
    const article = buildArticle({
      id: "abc",
      title: "my article",
      date: 1234354,
      content: [{ type: "h1", id: "1", children: [{ text: "my article" }] }],
    });

    const articlesRepository = buildInMemoryArticlesRepository();

    expect(await postArticle({ article, articlesRepository })).toEqual(article);
    expect(await articlesRepository.all()).toEqual([
      { ...article, content: JSON.stringify(article.content) },
    ]);
  });
});
