import { Article } from "../articles";

export const stringifyArticleContent = (article: Article) => ({
  ...article,
  content: JSON.stringify(article.content),
});
