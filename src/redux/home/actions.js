const actionTypePrefix = 'EMPLOYEES/';

export const CategoriesActions = {
  //  To fetch my profile details - profile & accont & settings
  FETCH_EMPLOYEES_LIST: `${actionTypePrefix}FETCH_EMPLOYEES_LIST`,
  FETCH_EMPLOYEES_LIST_SUCCESS: `${actionTypePrefix}FETCH_EMPLOYEES_LIST_SUCCESS`,
  FETCH_EMPLOYEES_FAILURE: `${actionTypePrefix}FETCH_EMPLOYEES_FAILURE`,
};

export const fetchEmployeeList = (payload) => {
  return {
    type: CategoriesActions.FETCH_EMPLOYEES_LIST,
    payload: payload,
  };
};

export const fetchEmployeeListSuccess = (payload) => {
  return {
    type: CategoriesActions.FETCH_EMPLOYEES_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchEmployeeListFailure = (payload) => {
  return {
    type: CategoriesActions.FETCH_EMPLOYEES_FAILURE,
    payload: payload,
  };
};
