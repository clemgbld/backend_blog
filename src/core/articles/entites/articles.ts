/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipe } from "ramda";

const WORD_READ_PER_MIN = 238;

const splitBySpace = (allWords: string): string[] => allWords.split(" ");

const calcRawReadingTime = (allWordsArr: string[]): number =>
  allWordsArr.length / WORD_READ_PER_MIN;

const insertReadingTimeInTemplate = (readingTime: number): string =>
  `${readingTime} min read`;

const extractAllWordsFromContent = (
  content: Record<
    string,
    string | number | Record<string, string | number>[]
  >[],
  articlesText = ""
): string =>
  content.reduce(
    (acc: string, el) => acc + extractWordFromContent(el),
    articlesText
  );

function extractWordFromContent(content: Record<string, any>) {
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

export const calcReadingTime = (
  content: Record<string, string | number | Record<string, string | number>[]>[]
) => calcReadingTimeOperations(content);

type ArticleProps = {
  id: string;
  title: string;
  summary?: string;
  date: number;
  hide?: boolean;
  content: Record<string, any>[];
  lightMode?: boolean;
};

export const buildArticle = ({
  id,
  title,
  summary = "",
  date,
  hide = false,
  content,
  lightMode = false,
}: ArticleProps) => ({
  id,
  title,
  summary,
  date,
  hide,
  content,
  lightMode,
  timeToRead: calcReadingTime(content),
});
