import { Article } from "../entites/articles";

export const stringifyArticleContent = (article: Article) => ({
  ...article,
  content: JSON.stringify(article.content),
});
