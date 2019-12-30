import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import env from '../utils/env';
import auth from '../ducks/auth';
import status from '../ducks/status';

let authReducer;
if (env.isBrowser) {
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['loginMeta'],
  };
  authReducer = persistReducer(authPersistConfig, auth);
} else {
  authReducer = auth;
}

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  status,
});

export default createRootReducer;
