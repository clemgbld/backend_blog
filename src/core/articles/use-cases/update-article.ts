import { Article } from "../entites/articles";
import { ArticlesRepository } from "../../../infrastructure/in-memory-articles-repository";
import { stringifyArticleContent } from "../utils/stringify-article-content";

type UpdateArticle = {
  article: Article;
  articlesRepository: ArticlesRepository;
};

export const updateArticle = async ({
  article,
  articlesRepository,
}: UpdateArticle) => {
  await articlesRepository.update(stringifyArticleContent(article));
  return article;
};