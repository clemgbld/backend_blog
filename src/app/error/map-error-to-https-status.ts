const DEFAUL_HTTP_ERRO_CODE = 500;

const ERROR_TO_STATUS_MAPPING: Record<string, number> = {
  "id is mandatory": 404,
  "title is mandatory": 404,
  "summary is mandatory": 404,
  "img is mandatory": 404,
  "topic is mandatory": 404,
  "timeToRead is mandatory": 404,
};

export const mapErrorToHttpStatus = (errorMessage: string) =>
  ERROR_TO_STATUS_MAPPING[errorMessage]
    ? ERROR_TO_STATUS_MAPPING[errorMessage]
    : DEFAUL_HTTP_ERRO_CODE;
