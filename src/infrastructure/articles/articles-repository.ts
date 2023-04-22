import { Db } from "mongodb";
import { ArticlesRepository } from "../../core/articles/repositories/articles-repository";
import { ArticleWithStringifyContent } from "../../core/articles/repositories/articles-repository";
import {
  adaptDataForApp,
  adaptDataForMongoDb,
  adaptDataListForApp,
  adaptIdForMongoDB,
} from "../db/utils/adapt-data";

export const buildArticlesRepository = (db: Db): ArticlesRepository => {
  const collection = db.collection("articles");
  return {
    all: async (): Promise<ArticleWithStringifyContent[]> => {
      const articlesFromDb = await collection.find().toArray();
      return adaptDataListForApp(articlesFromDb);
    },
    allPuplished: async (): Promise<ArticleWithStringifyContent[]> => {
      const articlesFromDb = await collection.find({ hide: false }).toArray();
      return adaptDataListForApp(articlesFromDb);
    },
    add: async (article: ArticleWithStringifyContent) => {
      await collection.insertOne(adaptDataForMongoDb(article));
    },
    one: async (id: string): Promise<ArticleWithStringifyContent | undefined> =>
      adaptDataForApp(
        await collection.findOne({ _id: adaptIdForMongoDB(id), hide: false })
      ),
    delete: async (id: string): Promise<boolean> => {
      const deletedArticle = await collection.deleteOne({
        _id: adaptIdForMongoDB(id),
      });
      return deletedArticle.deletedCount > 0;
    },
    update: async (
      article: ArticleWithStringifyContent
    ): Promise<ArticleWithStringifyContent | undefined> => {
      const result = await collection.findOneAndUpdate(
        { _id: adaptIdForMongoDB(article.id) },
        { $set: adaptDataForMongoDb(article) },
        { returnDocument: "after" }
      );
      return adaptDataForApp(result.value);
    },
  };
};
