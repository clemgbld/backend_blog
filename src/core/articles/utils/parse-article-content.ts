import { ArticleWithStringifyContent } from "../repositories/articles-repository";

export const parseArticleContent = (article: ArticleWithStringifyContent) => ({
  ...article,
  content: JSON.parse(article.content),
});
