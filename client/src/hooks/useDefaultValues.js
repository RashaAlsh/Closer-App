export const useDefaultValues = (user, fields) => {
  const defaults = {};
  fields.forEach((field) => {
    defaults[field.name] = user[field.name];
  });

  return defaults;
};
