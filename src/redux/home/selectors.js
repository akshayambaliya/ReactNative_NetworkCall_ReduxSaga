export const getEmployeeList = (state) => {
  const getEmployeeList = state.categories.employeeList;
  return getEmployeeList;
};

export const getEmployeeListListLoaderSelector = (state) => {
  if (state.categories.loaders.employeeList === undefined) {
    return false;
  }
  return state.categories.loaders.employeeList;
};

export const getEmployeeListErrorSelector = (state) => {
  if (state.categories.errors.employeeList === undefined) {
    return "";
  }
  return state.categories.errors.employeeList;
};
