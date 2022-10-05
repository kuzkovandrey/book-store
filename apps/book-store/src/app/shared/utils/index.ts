import { Model } from '@book-store/shared';
export const takeFirstByCount =
  (take: number) =>
  <T>(array: Array<T>): Array<T> =>
    array.slice(0, take);

export const getIdArrayFromModel = (models: Model<unknown>[]) => {
  return models.map(({ id }) => id);
};
