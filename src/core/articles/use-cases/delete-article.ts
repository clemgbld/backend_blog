import { ArticlesRepository } from "../domain/repositories/articles-repository";

type DeleteArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const deleteArticle = async ({
  id,
  articlesRepository,
}: DeleteArticle) => {
  const isSuccess = await articlesRepository.delete(id);

  if (!isSuccess) {
    throw new Error(`${id} id does not exist`);
  }
};
