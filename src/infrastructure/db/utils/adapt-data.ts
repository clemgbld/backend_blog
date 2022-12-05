export const adaptDataForMongoDb = (data: any) => {
  const id = data.id;
  const adaptedData = { ...data };
  delete adaptedData.id;
  return { _id: id, ...adaptedData };
};

export const adaptDataForApp = (data: any) => {
  const id = data._id.toString();
  const adaptedData = { ...data };
  delete adaptedData._id;
  return { id, ...adaptedData };
};
