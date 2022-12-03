import { ArticlesRepository } from "../repositories/articles-repository";
import { parseArticleContent } from "../utils/parse-article-content";

type DeleteArticle = {
  id: string;
  articlesRepository: ArticlesRepository;
};

export const deleteArticle = async ({
  id,
  articlesRepository,
}: DeleteArticle) => {
  const deletedArticle = await articlesRepository.delete(id);

  return deletedArticle ? parseArticleContent(deletedArticle) : null;
};
