import { buildArticle } from "../../entites/articles";
import { buildInMemoryArticlesRepository } from "../../../../infrastructure/in-memory-articles-repository";
import { addArticleToBlog } from "../test-helper/test-helper";
import { updateArticle } from "../update-article";

describe("update article", () => {
  it("should the corresponding article in the blog", async () => {
    const article = buildArticle({
      id: "abc",
      title: "title 1",
      date: 12345,
      content: [{ tyqpe: "h1", id: "1", text: "hello" }],
    });

    const modifiedArticle = { ...article, title: "title 2" };
    const articlesRepository = buildInMemoryArticlesRepository();
    await addArticleToBlog(article, articlesRepository);

    const articleUpdated = await updateArticle({
      article: modifiedArticle,
      articlesRepository,
    });

    expect(await articlesRepository.all()).toEqual([
      { ...modifiedArticle, content: JSON.stringify(modifiedArticle.content) },
    ]);

    expect(articleUpdated).toEqual(modifiedArticle);
  });
});
