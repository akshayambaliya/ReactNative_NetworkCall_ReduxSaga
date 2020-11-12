import {call, put, takeLatest} from 'redux-saga/effects';
import {EmployeesRepository} from '../../domain/repositories/employeesRepository';
import {
  CategoriesActions,
  fetchEmployeeListSuccess,fetchEmployeeListFailure
} from './actions';

export function* getEmployeeListSaga(action) {
  try {
    const result = yield call(EmployeesRepository.getEmployees);
    yield put(fetchEmployeeListSuccess(result.data));
  } catch (error) {
    console.log("ErrorAPiCall",error)
    yield put(fetchEmployeeListFailure(error));
  }
}

export function* watchCategories() {
  yield takeLatest(
    CategoriesActions.FETCH_EMPLOYEES_LIST,
    getEmployeeListSaga,
  );
}
