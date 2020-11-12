import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootSaga from './src/redux/sagas';
import rootReducer from './src/redux/reducers';

export const configureStore = () => {
  // Redux configurations
  const middleware = [];
  const enhancers = [];

  // Saga Middleware
  const sagaMiddleware= createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // Assemble Middleware
  enhancers.push(applyMiddleware(...middleware));
  const createAppropriateStore = createStore;
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  // Kick off root saga
  sagaMiddleware.run(rootSaga);

  return store;
};
