import { andThen, pipe } from "ramda";
import { ArticlesRepository } from "../domain/repositories/articles-repository";
import { buildThrowOrParseContent } from "../domain/services/parse-article-content";

type RetrieveArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const retrieveArticle = async ({
  id,
  articlesRepository,
}: RetrieveArticle) =>
  pipe(
    articlesRepository.one,
    andThen(buildThrowOrParseContent(`${id} id does not exist`))
  )(id);
