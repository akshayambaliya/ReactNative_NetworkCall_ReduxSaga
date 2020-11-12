import { combineReducers } from 'redux';

import {categoriesReducer} from './home/reducers'

const appReducer = combineReducers({
   categories: categoriesReducer,
});

// to clear redux after user triggers logout
export default (state, action) => {
  return appReducer(state, action);
};

