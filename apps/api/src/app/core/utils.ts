export const getQueryArray = (
  query: number | string | Array<string | number>
): number[] => {
  if (Array.isArray(query))
    return query.map<number>((num: number | string) => +num);

  return [+query];
};

export const getArrayWithObjectId = (
  idArray: number[]
): Array<{ id: number }> => {
  if (!idArray && !idArray?.length) return [];

  return getQueryArray(idArray).map((id) => ({ id }));
};

export const getDatabaseTakeParams = (
  page: number,
  perPage: number
): [skip: number, take: number] => {
  return [(page - 1) * perPage, perPage];
};
