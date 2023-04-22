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
    "Please provide an email address and a password.": 400,
    "The user belonging to this token does no longer exist.": 401,
    "You are not logged in ! Please log in to get access.": 401,
    "You are not logged in !": 401,
    "Please provide a valid email address and password.": 401,
  };
};

export const mapErrorToHttpStatus = (errorMessage: string, id = "") => {
  const errorToStatusMapping = buildErrorToStatusMapping(id);
  return errorToStatusMapping[errorMessage]
    ? errorToStatusMapping[errorMessage]
    : DEFAUL_HTTP_ERRO_CODE;
};
