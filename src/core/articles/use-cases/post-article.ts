import { Article } from "../domain/articles";
import { buildArticle } from "../domain/articles";
import { ArticleIn } from "../../../app/articles/dto/article-in";
import { IdGenerator } from "../../id/repositories/id-generator";
import { Time } from "../../time/repositories/time";
import { ArticlesRepository } from "../domain/repositories/articles-repository";
import { stringifyArticleContent } from "../domain/services/stringify-article-content";
import { pipe } from "ramda";

type PostArticle = {
  articleIn: ArticleIn;
  articlesRepository: ArticlesRepository;
  time: Time;
  idGenerator: IdGenerator;
};

export const postArticle = async ({
  articleIn,
  articlesRepository,
  time,
  idGenerator,
}: PostArticle) => {
  const article: Article = buildArticle({
    ...articleIn,
    date: time.now(),
    id: idGenerator.makeId(),
  });

  const addArticle = pipe(stringifyArticleContent, articlesRepository.add);

  await addArticle(article);

  return article;
};
