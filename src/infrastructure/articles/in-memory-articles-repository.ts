import { ArticleWithStringifyContent } from "../../core/articles/domain/repositories/articles-repository";
import { ArticlesRepository } from "../../core/articles/domain/repositories/articles-repository";

export const buildInMemoryArticlesRepository = (): ArticlesRepository => {
  const db: Set<{ key: string; value: ArticleWithStringifyContent }> =
    new Set();

  const add = async (article: ArticleWithStringifyContent) => {
    db.add({ key: article.id, value: article });
  };

  const one = async (id: string) =>
    [...db].find(({ key, value }) => key === id && !value.hide)?.value;

  const deleteArticle = async (id: string) => {
    const deletedArticle = await one(id);
    const articleToDelete: any = [...db].find(({ key }) => key === id);
    db.delete(articleToDelete);
    return !!deletedArticle;
  };

  const all = () => [...db].map((db) => db.value);

  return {
    add,
    all: async () => all(),
    allPublished: async () => all().filter(({ hide }) => !hide),
    delete: deleteArticle,
    update: async (article: ArticleWithStringifyContent) => {
      const articleToUpdate = await one(article.id);
      if (!articleToUpdate) return undefined;
      await deleteArticle(article.id);
      await add(article);
      return article;
    },
    one,
  };
};
