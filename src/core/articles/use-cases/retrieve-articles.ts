import { ArticlesRepository } from "../repositories/articles-repository";
import { parseArticleContent } from "../domain/services/parse-article-content";

type RetrieveArticles = {
  articlesRepository: ArticlesRepository;
};

export const retrieveArticles = async ({
  articlesRepository,
}: RetrieveArticles) => {
  const articlesFromRepo = await articlesRepository.all();
  return articlesFromRepo.map(parseArticleContent);
};
