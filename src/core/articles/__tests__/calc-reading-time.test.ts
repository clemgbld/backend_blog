import { calcReadingTime } from "../calc-reading-time";

const content = [{ id: "1", type: "h1", children: [{ text: "word" }] }];

const buildPhrase = (numberOfWord: number) => "word ".repeat(numberOfWord);

const buildSimpleContent = (text: string) => [
  { id: "1", type: "h1", children: [{ text }] },
];

describe("calculate the reading time of an article", () => {
  it("should be 1 min to read an article when there is less than 238 words in the article", () => {
    expect(calcReadingTime(content)).toBe("1 min read");
  });

  it("should be 2 min to read an article when there is 476 words in an article", () => {
    expect(calcReadingTime(buildSimpleContent(buildPhrase(475)))).toBe(
      "2 min read"
    );
  });
});
