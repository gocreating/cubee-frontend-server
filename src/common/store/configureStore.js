import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import env from '../utils/env';
import rootReducer from '../reducers';

const logger = createLogger({
  diff: true,
  collapsed: true,
});
const middlewares = (
  (!env.isProduction && env.isBrowser)
  ? [
    logger,
  ]
  : []
);
const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  return store;
};

export default configureStore;
