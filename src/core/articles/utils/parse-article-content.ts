import { ArticleWithStringifyContent } from "../repository/articles-repository";

export const parseArticleContent = (article: ArticleWithStringifyContent) => ({
  ...article,
  content: JSON.parse(article.content),
});
