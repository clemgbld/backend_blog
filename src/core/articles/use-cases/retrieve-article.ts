import { ArticlesRepository } from "../../../infrastructure/in-memory-articles-repository";
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

  return parseArticleContent(articleFromRepo);
};
