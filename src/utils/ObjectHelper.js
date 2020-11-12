export const isOfType = (type, val) => {
  return !!(val.constructor && val.constructor.name.toLowerCase() === type.toLowerCase());
};
