import {CategoriesActions} from './actions';

const initialState = {
  employeeList:[],
  
  loaders: {
    employeeList: false,
  },

  errors: {
    employeeList: '',
  },
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CategoriesActions.FETCH_EMPLOYEES_LIST:
      console.log('CategoriesActions.FETCH_CATEGORIES_LIST , action', action);
      return {
        ...state,
        errors: {...state.errors, employeeList: ''},
        loaders: {...state.loaders, employeeList: true},
      };

    case CategoriesActions.FETCH_EMPLOYEES_LIST_SUCCESS:
      return {
        ...state,
        employeeList:action.payload,
        loaders: {...state.loaders, employeeList: false},
        errors: {...state.errors, employeeList: ''},
      };

    case CategoriesActions.FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        errors: {...state.errors, employeeList: action.payload},
        loaders: {...state.loaders, employeeList: false},
      };

    default:
      return {
        ...state,
      };
  }
};
