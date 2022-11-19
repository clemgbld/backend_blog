import { calcReadingTime } from "../calc-reading-time";

const content = [{ id: "1", type: "h1", children: [{ text: "word" }] }];

describe("calculate the reading time of an article", () => {
  it("should be 1 min to read an article when there is less than 238 words in the article", () => {
    expect(calcReadingTime(content)).toBe("1 min read");
  });
});
