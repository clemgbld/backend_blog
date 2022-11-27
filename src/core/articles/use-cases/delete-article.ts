import { ArticlesRepository } from "../../../infrastructure/articles/in-memory-articles-repository";

type DeleteArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const deleteArticle = async ({
  id,
  articlesRepository,
}: DeleteArticle) => {
  await articlesRepository.delete(id);
};
