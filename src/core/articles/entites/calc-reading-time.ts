/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipe } from "ramda";

const WORD_READ_PER_MIN = 238;

const splitBySpace = (allWords: string): string[] => allWords.split(" ");

const calcRawReadingTime = (allWordsArr: string[]): number =>
  allWordsArr.length / WORD_READ_PER_MIN;

const insertReadingTimeInTemplate = (readingTime: number): string =>
  `${readingTime} min read`;

const extractAllWordsFromContent = (
  content: any[],
  articlesText = ""
): string =>
  content.reduce(
    (acc: string, el) => acc + extractWordFromContent(el),
    articlesText
  );

function extractWordFromContent(content: any) {
  if (!content.type) return content.text;
  if (content.children) return extractAllWordsFromContent(content.children);
}

const calcReadingTimeOperations = pipe(
  extractAllWordsFromContent,
  splitBySpace,
  calcRawReadingTime,
  Math.ceil,
  insertReadingTimeInTemplate
);

export const calcReadingTime = (content: any[]) =>
  calcReadingTimeOperations(content);
