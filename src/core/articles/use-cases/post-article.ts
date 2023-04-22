import { Article } from "../domain/articles";
import { buildArticle } from "../domain/articles";
import { ArticleIn } from "../../../app/articles/dto/article-in";
import { IdGenerator } from "../../id/repositories/id-generator";
import { Time } from "../../time/repositories/time";
import { ArticlesRepository } from "../repositories/articles-repository";
import { stringifyArticleContent } from "../domain/services/stringify-article-content";

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
  await articlesRepository.add(
    stringifyArticleContent({
      ...article,
    })
  );
  return article;
};
