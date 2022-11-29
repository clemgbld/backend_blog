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
  delete: (id: string) => Promise<void>;
  all: () => Promise<ArticleWithStringifyContent[]>;
  update: (article: ArticleWithStringifyContent) => Promise<void>;
  one: (id: string) => Promise<ArticleWithStringifyContent | undefined>;
  allPuplished: () => Promise<ArticleWithStringifyContent[]>;
};
