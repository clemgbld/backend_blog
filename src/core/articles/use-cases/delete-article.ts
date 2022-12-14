import { ArticlesRepository } from "../repositories/articles-repository";

type DeleteArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const deleteArticle = async ({
  id,
  articlesRepository,
}: DeleteArticle) => {
  const deletedArticle = await articlesRepository.delete(id);

  return deletedArticle ? deletedArticle : null;
};
