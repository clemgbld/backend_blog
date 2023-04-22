export type ArticleWithStringifyContent = {
  id: string;
  title: string;
  summary: string;
  date: number;
  content: string;
  hide: boolean;
  lightMode: boolean;
};

export type ArticlesRepository = {
  add: (article: ArticleWithStringifyContent) => Promise<void>;
  delete: (id: string) => Promise<boolean>;
  all: () => Promise<ArticleWithStringifyContent[]>;
  update: (
    article: ArticleWithStringifyContent
  ) => Promise<ArticleWithStringifyContent | undefined>;
  one: (id: string) => Promise<ArticleWithStringifyContent | undefined>;
  allPublished: () => Promise<ArticleWithStringifyContent[]>;
};
