import {
  retrieveArticlesFactory,
  ALL_PUBLISHED,
} from "./factories/retrieve-articles-factory";

export const retrievePuplishedArticles = retrieveArticlesFactory(ALL_PUBLISHED);
