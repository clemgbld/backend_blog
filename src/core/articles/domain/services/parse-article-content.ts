import { ifElse } from "ramda";
import { ArticleWithStringifyContent } from "../repositories/articles-repository";

export const parseArticleContent = (article: ArticleWithStringifyContent) => ({
  ...article,
  content: JSON.parse(article.content),
});

export const buildThrowOrParseContent = (message: string) =>
  ifElse(
    (article: ArticleWithStringifyContent | undefined) => !article,
    () => {
      throw new Error(message);
    },
    (article: ArticleWithStringifyContent | undefined) =>
      parseArticleContent(article as ArticleWithStringifyContent)
  );
