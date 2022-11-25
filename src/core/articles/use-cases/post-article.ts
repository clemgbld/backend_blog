import { Article } from "../entites/articles";
import { ArticlesRepository } from "../../../infrastructure/in-memory-articles-repository";

type PostArticle = {
  article: Article;
  articlesRepository: ArticlesRepository;
};

export const postArticle = async ({
  article,
  articlesRepository,
}: PostArticle) => {
  return article;
};
