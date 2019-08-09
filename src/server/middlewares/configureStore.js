import configureStore from '../../common/store/configureStore';

const configureStoreMiddleware = (req, res, next) => {
  const initialState = {};
  const store = configureStore(initialState);
  res.locals.store = store;
  next();
};

export default configureStoreMiddleware;
