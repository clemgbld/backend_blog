import { Article } from "../entites/articles";
import { ArticlesRepository } from "../../../infrastructure/in-memory-articles-repository";

type UpdateArticle = {
  article: Article;
  articlesRepository: ArticlesRepository;
};

export const updateArticle = async ({
  article,
  articlesRepository,
}: UpdateArticle) => {
  await articlesRepository.update({
    ...article,
    content: JSON.stringify(article.content),
  });
  return article;
};
