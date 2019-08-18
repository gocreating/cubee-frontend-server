import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import { createLogger } from 'redux-logger';
import env from '../utils/env';
import rootReducer from '../reducers';
import sagas from '../sagas';

const configureStore = initialState => {
  const sagaMiddleware = (
    env.isProduction
      ? createSagaMiddleware()
      : createSagaMiddleware({ sagaMonitor })
  );
  const logger = createLogger({
    diff: true,
    collapsed: true,
  });
  const middlewares = (
    (!env.isProduction && env.isBrowser)
    ? [
      logger,
      sagaMiddleware,
    ]
    : [
      sagaMiddleware,
    ]
  );
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  for (let duckName in sagas) {
    const sagasOfDuck = sagas[duckName];
    for (let sagaName in sagasOfDuck) {
      sagaMiddleware.run(sagasOfDuck[sagaName]);
    }
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
