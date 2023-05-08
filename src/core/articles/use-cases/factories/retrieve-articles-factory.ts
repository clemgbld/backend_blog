import { ArticlesRepository } from "../../domain/repositories/articles-repository";
import { parseArticleContent } from "../../domain/services/parse-article-content";
import { pipe, map } from "ramda";

export const ALL = "all";

export const ALL_PUBLISHED = "allPublished";

type All = "all";

type AllPublished = "allPublished";

type ArticleRepositoryRetrieveMethod = All | AllPublished;

export const retrieveArticlesFactory =
  (articleRepositoryRetrieveMethod: ArticleRepositoryRetrieveMethod) =>
  async ({ articlesRepository }: { articlesRepository: ArticlesRepository }) =>
    pipe(map(parseArticleContent))(
      await articlesRepository[articleRepositoryRetrieveMethod]()
    );
