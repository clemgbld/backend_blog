import { andThen, pipe } from "ramda";
import { buildArticle } from "../domain/articles";
import { ArticlesRepository } from "../domain/repositories/articles-repository";
import { stringifyArticleContent } from "../domain/services/stringify-article-content";
import { buildThrowOrParseContent } from "../domain/services/parse-article-content";
import { ArticleIn } from "../../../app/articles/dto/article-in";

type UpdateArticle = {
  articleIn: ArticleIn;
  articlesRepository: ArticlesRepository;
};

export const updateArticle = async ({
  articleIn,
  articlesRepository,
}: UpdateArticle) =>
  pipe(
    buildArticle,
    stringifyArticleContent,
    articlesRepository.update,
    andThen(buildThrowOrParseContent(`${articleIn.id} id does not exist`))
  )(articleIn);
