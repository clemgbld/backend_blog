export type ArticleIn = {
  id: string | undefined;
  topic: string | undefined;
  title: string | undefined;
  summary: string | undefined;
  date: number | undefined;
  content: Record<string, any>[] | undefined;
  hide: boolean | undefined;
  lightMode: boolean | undefined;
};
