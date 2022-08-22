export const getQueryArray = (query: string | string[]): string[] => {
  if (Array.isArray(query)) return query;

  return [query];
};
