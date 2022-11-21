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

  it("should handle an article with more than one element", () => {
    const content = [
      ...buildSimpleContent(buildPhrase(475)),
      ...buildSimpleContent(buildPhrase(475)),
    ];

    expect(calcReadingTime(content)).toBe("4 min read");
  });

  it("should be able to handle article with complex data structure", () => {
    const content = [
      {
        type: "ul",
        children: [
          { type: "li", children: [{ text: buildPhrase(237) }] },
          { type: "li", children: [{ text: buildPhrase(237) }] },
          { type: "li", children: [{ text: buildPhrase(237) }] },
        ],
      },
    ];

    expect(calcReadingTime(content)).toBe("3 min read");
  });

  it("should handle when there  is an element with a type but without children", () => {
    const content = [
      ...buildSimpleContent(buildPhrase(475)),

      { type: "div", id: 1 },
      {
        type: "img",
        id: 1,
        caption: ["caption 1"],
        url: "https://my-url",
        children: [{ text: buildPhrase(475) }],
      },
    ];

    expect(calcReadingTime(content)).toBe("4 min read");
  });
});
