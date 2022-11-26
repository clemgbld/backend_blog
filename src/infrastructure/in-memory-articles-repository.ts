type ArticleWithStringifyContent = {
  id: string;
  title: string;
  summary: string;
  date: number;
  content: string;
  hide: boolean;
  lightMode: boolean;
};

export const buildInMemoryArticlesRepository = () => {
  const db: Set<{ key: string; value: ArticleWithStringifyContent }> =
    new Set();

  return {
    add: async (article: ArticleWithStringifyContent) =>
      db.add({ key: article.id, value: article }),
    all: async () => [...db].map((db) => db.value),
    delete: async (id: string) => {
      const articleToDelete: any = [...db].find(({ key }) => key === id);
      db.delete(articleToDelete);
    },
  };
};

export type ArticlesRepository = ReturnType<
  typeof buildInMemoryArticlesRepository
>;
