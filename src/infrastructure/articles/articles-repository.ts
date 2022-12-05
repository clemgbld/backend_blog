import { Db } from "mongodb";
import { ArticleWithStringifyContent } from "../../core/articles/repositories/articles-repository";
import { Article } from "../../core/articles/entites/articles";
import { adaptDataForApp, adaptDataForMongoDb } from "../db/utils/adapt-data";

export const buildArticlesRepository = (db: Db) => {
  const collection = db.collection("articles");
  return {
    add: async (article: ArticleWithStringifyContent) => {
      await collection.insertOne(adaptDataForMongoDb(article));
    },
    one: async (id: string): Promise<Article | undefined> =>
      adaptDataForApp(await collection.findOne({ _id: id })),
    delete: async (id: string) => {},
  };
};
