import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import { createLogger } from 'redux-logger';
import env from '../utils/env';
import createRootReducer from '../reducers';
import sagas from '../sagas';

const configureStore = (initialState, initialPath) => {
  const sagaMiddleware = (
    env.isProduction
      ? createSagaMiddleware()
      : createSagaMiddleware({ sagaMonitor })
  );
  const logger = createLogger({
    diff: true,
    collapsed: true,
  });
  let history;
  if (env.isBrowser) {
    history = createBrowserHistory();
  } else if (env.isServer) {
    // set initial path on server side
    history = createMemoryHistory({ initialEntries: [initialPath] });
  }
  let enhancer;
  if (env.isTesting) {
    const middlewares = [
      sagaMiddleware,
      routerMiddleware(history),
    ];
    enhancer = compose(applyMiddleware(...middlewares));
  } else if (!env.isProduction && env.isBrowser) {
    const middlewares = [
      logger,
      sagaMiddleware,
      routerMiddleware(history),
    ];
    const composeEnhancers = composeWithDevTools({
      trace: true,
    });
    enhancer = composeEnhancers(applyMiddleware(...middlewares));
  } else {
    const middlewares = [
      sagaMiddleware,
      routerMiddleware(history),
    ];
    enhancer = compose(applyMiddleware(...middlewares));
  }
  const store = createStore(
    createRootReducer(history),
    initialState,
    enhancer,
  );
  let persistor;
  if (env.isBrowser) {
    persistor = persistStore(store);
  }
  for (let duckName in sagas) {
    const sagasOfDuck = sagas[duckName];
    for (let sagaName in sagasOfDuck) {
      sagaMiddleware.run(sagasOfDuck[sagaName]);
    }
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return { store, persistor, history };
};

export default configureStore;
