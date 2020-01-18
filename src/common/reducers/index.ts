import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import env from '../utils/env';
import authReducer, { AuthActions, AuthState } from '../ducks/auth';
import statusReducer, { StatusActions, StatusState } from '../ducks/status';

let auth: Reducer;
if (env.isBrowser) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['loginMeta'],
  };
  auth = persistReducer(authPersistConfig, authReducer);
} else {
  auth = authReducer;
}

const createRootReducer = (history: History): Reducer => combineReducers({
  router: connectRouter(history),
  auth,
  status: statusReducer,
});

export interface RootState {
  router: RouterState;
  auth: AuthState;
  status: StatusState;
}

export type RootAction = (
  AuthActions |
  StatusActions
);

export default createRootReducer;
