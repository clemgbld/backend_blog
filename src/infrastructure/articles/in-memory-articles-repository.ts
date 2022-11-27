import { ArticleWithStringifyContent } from "../../core/articles/repositories/articles-repository";

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

  const all = () => [...db].map((db) => db.value);

  return {
    add,
    all: async () => all(),
    allPuplished: async () => all().filter(({ hide }) => !hide),
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
