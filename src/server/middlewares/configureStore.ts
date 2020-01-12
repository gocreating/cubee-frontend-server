import { RequestHandler } from 'express';
import configureStore from '../../common/store/configureStore';

const configureStoreMiddleware: RequestHandler = (req, res, next) => {
  const initialState = {};
  const { store, history } = configureStore(initialState, req.url);
  res.locals.store = store;
  res.locals.history = history;
  next();
};

export default configureStoreMiddleware;
