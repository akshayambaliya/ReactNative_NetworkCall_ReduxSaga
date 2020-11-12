import {all} from 'redux-saga/effects';
import {watchCategories} from './home/sagas';
export default function* rootSaga() {
  yield all([watchCategories()]);
}
