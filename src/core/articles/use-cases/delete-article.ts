import { pipe, andThen } from "ramda";
import { ArticlesRepository } from "../domain/repositories/articles-repository";
import { buildThrowWhenFalse } from "../domain/services/throwWhenFalse";

type DeleteArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const deleteArticle = async ({
  id,
  articlesRepository,
}: DeleteArticle) =>
  pipe(
    articlesRepository.delete,
    andThen(buildThrowWhenFalse(`${id} id does not exist`))
  )(id);
