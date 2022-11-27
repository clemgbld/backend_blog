import { ArticlesRepository } from "../../../infrastructure/articles/in-memory-articles-repository";
import { parseArticleContent } from "../utils/parse-article-content";

type RetrieveArticles = {
  articlesRepository: ArticlesRepository;
};

export const retrieveArticles = async ({
  articlesRepository,
}: RetrieveArticles) => {
  const articlesFromRepo = await articlesRepository.all();
  return articlesFromRepo.map(parseArticleContent);
};
