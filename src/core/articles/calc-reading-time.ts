/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipe } from "ramda";

const WORD_READ_PER_MIN = 238;

const splitBySpace = (allWords: string): string[] => allWords.split(" ");

const calcRawReadingTime = (allWordsArr: string[]): number =>
  allWordsArr.length / WORD_READ_PER_MIN;

const insertReadingTimeInTemplate = (readingTime: number): string =>
  `${readingTime} min read`;

const extractAllWordsFromContent = (content: any[]): string => {
  let articlesText = "";

  content.forEach((el) => {
    articlesText += el.children[0].text;
  });

  return articlesText;
};

const calcReadingTimeOperations = pipe(
  extractAllWordsFromContent,
  splitBySpace,
  calcRawReadingTime,
  Math.ceil,
  insertReadingTimeInTemplate
);

export const calcReadingTime = (content: any[]) =>
  calcReadingTimeOperations(content);