import { Article } from "../entites/articles";
import { ArticlesRepository } from "../../../infrastructure/articles/in-memory-articles-repository";
import { stringifyArticleContent } from "../utils/stringify-article-content";

type PostArticle = {
  article: Article;
  articlesRepository: ArticlesRepository;
};

export const postArticle = async ({
  article,
  articlesRepository,
}: PostArticle) => {
  await articlesRepository.add(stringifyArticleContent(article));
  return article;
};
