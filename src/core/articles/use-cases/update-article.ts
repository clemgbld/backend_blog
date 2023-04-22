import { buildArticle } from "../domain/articles";
import { ArticlesRepository } from "../repositories/articles-repository";
import { stringifyArticleContent } from "../utils/stringify-article-content";
import { parseArticleContent } from "../utils/parse-article-content";
import { ArticleIn } from "../../../app/articles/dto/article-in";

type UpdateArticle = {
  articleIn: ArticleIn;
  articlesRepository: ArticlesRepository;
};

export const updateArticle = async ({
  articleIn,
  articlesRepository,
}: UpdateArticle) => {
  const article = buildArticle(articleIn);

  const modifiedArticle = await articlesRepository.update(
    stringifyArticleContent(article)
  );

  if (!modifiedArticle) {
    throw new Error(`${article.id} id does not exist`);
  }

  return parseArticleContent(modifiedArticle);
};
