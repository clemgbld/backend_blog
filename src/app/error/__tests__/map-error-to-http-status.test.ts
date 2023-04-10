import { mapErrorToHttpStatus } from "../map-error-to-https-status";

describe("map error to http status code", () => {
  it("should map the known error message to his expected status code", () => {
    expect(mapErrorToHttpStatus("id is mandatory")).toBe(404);
  });

  it("should be the 500 status code when the error is not known", () => {
    expect(mapErrorToHttpStatus("Internal error")).toBe(500);
  });
});
