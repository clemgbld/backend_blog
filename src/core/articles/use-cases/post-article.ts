import { Article } from "../entites/articles";
import { ArticlesRepository } from "../repositories/articles-repository";
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
