const DEFAUL_HTTP_ERRO_CODE = 500;

const buildErrorToStatusMapping = (id: string) => {
  const deleteSubscriberMessage = `Subscriber email with the id ${id} does not exist`;
  return {
    "id is mandatory": 404,
    "title is mandatory": 404,
    "summary is mandatory": 404,
    "img is mandatory": 404,
    "topic is mandatory": 404,
    "timeToRead is mandatory": 404,
    [deleteSubscriberMessage]: 404,
  };
};

export const mapErrorToHttpStatus = (errorMessage: string, id = "") => {
  const errorToStatusMapping = buildErrorToStatusMapping(id);
  return errorToStatusMapping[errorMessage]
    ? errorToStatusMapping[errorMessage]
    : DEFAUL_HTTP_ERRO_CODE;
};
