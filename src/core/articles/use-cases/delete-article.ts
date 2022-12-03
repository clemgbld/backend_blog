import { ArticlesRepository } from "../repositories/articles-repository";

type DeleteArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const deleteArticle = async ({
  id,
  articlesRepository,
}: DeleteArticle) => {
  return await articlesRepository.delete(id);
};
