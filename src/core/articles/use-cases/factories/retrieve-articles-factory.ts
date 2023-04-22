import { ArticlesRepository } from "../../domain/repositories/articles-repository";
import { parseArticleContent } from "../../domain/services/parse-article-content";

export const ALL = "all";

export const ALL_PUBLISHED = "allPublished";

type All = "all";

type AllPublished = "allPublished";

type ArticleRepositoryRetrieveMethod = All | AllPublished;

export const retrieveArticlesFactory =
  (articleRepositoryRetrieveMethod: ArticleRepositoryRetrieveMethod) =>
  async ({
    articlesRepository,
  }: {
    articlesRepository: ArticlesRepository;
  }) => {
    const articlesFromRepo = await articlesRepository[
      articleRepositoryRetrieveMethod
    ]();
    return articlesFromRepo.map(parseArticleContent);
  };
