import { ArticlesRepository } from "../domain/repositories/articles-repository";
import { parseArticleContent } from "../domain/services/parse-article-content";

type RetrieveArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const retrieveArticle = async ({
  id,
  articlesRepository,
}: RetrieveArticle) => {
  const articleFromRepo = await articlesRepository.one(id);
  if (!articleFromRepo) {
    throw new Error(`${id} id does not exist`);
  }
  return parseArticleContent(articleFromRepo);
};
