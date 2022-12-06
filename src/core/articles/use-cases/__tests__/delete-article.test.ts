import { buildArticle } from "../../entites/articles";
import { buildInMemoryArticlesRepository } from "../../../../infrastructure/articles/in-memory-articles-repository";
import { addArticleToBlog } from "../test-helper/test-helper";
import { deleteArticle } from "../delete-article";

describe("delete article", () => {
  it("should delete an article from the blog and it should stay one article in the blog", async () => {
    const article1 = buildArticle({
      id: "bcd",
      title: "title 1",
      date: 12345,
      content: [{ tyqpe: "h1", id: "1", text: "hello" }],
    });

    const article2 = buildArticle({
      id: "abc",
      title: "title 1",
      date: 12345,
      content: [{ tyqpe: "h1", id: "1", text: "hello" }],
    });

    const articlesRepository = buildInMemoryArticlesRepository();

    await addArticleToBlog(article1, articlesRepository);

    await addArticleToBlog(article2, articlesRepository);

    const deletedArticle = await deleteArticle({
      id: "abc",
      articlesRepository,
    });

    expect(await articlesRepository.all()).toEqual([
      { ...article1, content: JSON.stringify(article1.content) },
    ]);

    expect(deletedArticle).toEqual({ acknowledged: true, deletedCount: 1 });
  });

  it("should be null when no article has been deleted", async () => {
    const articlesRepository = buildInMemoryArticlesRepository();
    const deletedArticle = await deleteArticle({
      id: "abc",
      articlesRepository,
    });

    expect(deletedArticle).toBe(null);
  });
});
