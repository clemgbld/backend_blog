import { buildArticle } from "../../domain/articles";
import { buildInMemoryArticlesRepository } from "../../../../infrastructure/articles/in-memory-articles-repository";

export const addArticleToBlog = async (
  article: ReturnType<typeof buildArticle>,
  articlesRepository: ReturnType<typeof buildInMemoryArticlesRepository>
) =>
  articlesRepository.add({
    ...article,
    content: JSON.stringify(article.content),
  });
