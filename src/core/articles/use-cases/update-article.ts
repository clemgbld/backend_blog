import { Article } from "../entites/articles";
import { ArticlesRepository } from "../repositories/articles-repository";
import { stringifyArticleContent } from "../utils/stringify-article-content";
import { parseArticleContent } from "../utils/parse-article-content";

type UpdateArticle = {
  article: Article;
  articlesRepository: ArticlesRepository;
};

export const updateArticle = async ({
  article,
  articlesRepository,
}: UpdateArticle) => {
  const modifiedArticle = await articlesRepository.update(
    stringifyArticleContent(article)
  );

  if (!modifiedArticle) {
    throw new Error(`${article.id} id does not exist`);
  }

  return parseArticleContent(modifiedArticle);
};
