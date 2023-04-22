const DEFAUL_HTTP_ERRO_CODE = 500;

const buildErrorToStatusMapping = (id: string) => {
  const idDoesNotExist = `${id} id does not exist`;
  const deleteSubscriberMessage = `Subscriber email with the id ${id} does not exist`;
  return {
    "id is mandatory": 400,
    "title is mandatory": 400,
    "summary is mandatory": 400,
    "img is mandatory": 400,
    "topic is mandatory": 400,
    "timeToRead is mandatory": 400,
    [deleteSubscriberMessage]: 400,
    [idDoesNotExist]: 400,
    "An article must have an id": 400,
    "An article must have a content": 400,
    "An article must have a title": 400,
    "An article must have a date": 400,
  };
};

export const mapErrorToHttpStatus = (errorMessage: string, id = "") => {
  const errorToStatusMapping = buildErrorToStatusMapping(id);
  return errorToStatusMapping[errorMessage]
    ? errorToStatusMapping[errorMessage]
    : DEFAUL_HTTP_ERRO_CODE;
};
