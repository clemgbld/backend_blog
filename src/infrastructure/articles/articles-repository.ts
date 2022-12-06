import { Db } from "mongodb";
import {
  ArticleWithStringifyContent,
  DeletedData,
} from "../../core/articles/repositories/articles-repository";
import { adaptDataForApp, adaptDataForMongoDb } from "../db/utils/adapt-data";

export const buildArticlesRepository = (db: Db) => {
  const collection = db.collection("articles");
  return {
    add: async (article: ArticleWithStringifyContent) => {
      await collection.insertOne(adaptDataForMongoDb(article));
    },
    one: async (id: string): Promise<ArticleWithStringifyContent | undefined> =>
      adaptDataForApp(await collection.findOne({ _id: id })),
    delete: async (id: string): Promise<DeletedData | undefined> => {
      const deletedArticle = await collection.deleteOne({ _id: id });
      return deletedArticle.deletedCount > 0 ? deletedArticle : undefined;
    },
  };
};
