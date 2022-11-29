import { ArticlesRepository } from "../repositories/articles-repository";
import { parseArticleContent } from "../utils/parse-article-content";

type RetrievePuplishedArticles = {
  articlesRepository: ArticlesRepository;
};

export const retrievePuplishedArticles = async ({
  articlesRepository,
}: RetrievePuplishedArticles) => {
  const articlesFromRepo = await articlesRepository.allPuplished();
  return articlesFromRepo.map(parseArticleContent);
};
