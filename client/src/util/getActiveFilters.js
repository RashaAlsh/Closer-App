export const getActiveFilters = (filters) => {
  return Object.keys(filters).filter((key) => filters[key]);
};
