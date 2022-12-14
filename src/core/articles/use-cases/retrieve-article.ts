import { ArticlesRepository } from "../repositories/articles-repository";
import { parseArticleContent } from "../utils/parse-article-content";

type RetrieveArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const retrieveArticle = async ({
  id,
  articlesRepository,
}: RetrieveArticle) => {
  const articleFromRepo = await articlesRepository.one(id);
  if (!articleFromRepo) return null;
  return parseArticleContent(articleFromRepo);
};
