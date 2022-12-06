export const adaptDataForMongoDb = (data: any) => {
  const id = data.id;
  const adaptedData = { ...data };
  delete adaptedData.id;
  return { _id: id, ...adaptedData };
};

export const adaptDataForApp = (data: any) => {
  if (!data) return undefined;
  const id = data._id.toString();
  const adaptedData = { ...data };
  delete adaptedData._id;
  return { id, ...adaptedData };
};

export const adaptDataListForApp = (dataList: any[]) =>
  dataList.map((data) => adaptDataForApp(data));
