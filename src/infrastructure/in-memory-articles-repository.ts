import { ArticleWithStringifyContent } from "../core/articles/repository/articles-repository";

export const buildInMemoryArticlesRepository = () => {
  const db: Set<{ key: string; value: ArticleWithStringifyContent }> =
    new Set();

  const add = async (article: ArticleWithStringifyContent) => {
    db.add({ key: article.id, value: article });
  };

  const deleteArticle = async (id: string) => {
    const articleToDelete: any = [...db].find(({ key }) => key === id);
    db.delete(articleToDelete);
  };

  return {
    add,
    all: async () => [...db].map((db) => db.value),
    delete: deleteArticle,
    update: async (article: ArticleWithStringifyContent) => {
      await deleteArticle(article.id);
      await add(article);
    },
    one: async (id: string) =>
      [...db].find(({ key, value }) => key === id && !value.hide)?.value,
  };
};

export type ArticlesRepository = ReturnType<
  typeof buildInMemoryArticlesRepository
>;
