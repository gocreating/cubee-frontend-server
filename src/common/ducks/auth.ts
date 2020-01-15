import {
  Response,
  ApiSuccessActionPayload,
  ApiFailActionPayload,
  ApiMeta,
} from 'cubee';
import { fromJS } from 'immutable';
import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { API_HOST } from '../config';
import apiAgent, { injectCredentials } from '../api/agent';
import { State } from '../reducers/index';
/**
 * Actions
 */
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';

const SET_AUTH = 'SET_AUTH';
const CLEAR_AUTH = 'CLEAR_AUTH';

/**
 * Action Creators
 */
export const setAuth = (accessToken: string, csrfToken: string, user: User): AuthActions => ({
  type: SET_AUTH,
  payload: { accessToken, csrfToken, user },
});

export const clearAuth = (): AuthActions => ({
  type: CLEAR_AUTH,
});

export const loginRequest = (username: string, password: string): AuthActions => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const loginSuccess = (res: Response<LoginResponseData>): AuthActions => ({
  type: LOGIN_SUCCESS,
  payload: { res },
});

export const loginFail = (error: Error, res?: Response): AuthActions => ({
  type: LOGIN_FAIL,
  payload: { error, res },
});

export const logoutRequest = (): AuthActions => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (res: Response): AuthActions => ({
  type: LOGOUT_SUCCESS,
  payload: { res },
});

export const logoutFail = (error: Error, res?: Response): AuthActions => ({
  type: LOGOUT_FAIL,
  payload: { error, res },
});

/**
 * Default State
 */
const defaultState: AuthState = {
  loginMeta: {
    isRequesting: false,
    isRequested: false,
    isRequestSuccess: false,
    isRequestFail: false,
  },
  logoutMeta: {
    isRequesting: false,
    isRequested: false,
    isRequestSuccess: false,
    isRequestFail: false,
  },
  authUserId: null,
  users: {},
};

/**
 * Selectors
 */
export const selectors = {
  getUserId(state: State) {
    const authUserId = fromJS(state.auth)
      .get('authUserId');
    return authUserId ? `${authUserId}` : null;
  },
  getUser(state: State) {
    const authUserId = selectors.getUserId(state);
    return fromJS(state.auth)
      .getIn(['users', authUserId], fromJS({}))
      .toJS();
  },
  getUsers(state: State) {
    return fromJS(state.auth)
      .get('users')
      .toJS();
  },
  getIsAuth(state: State) {
    const authUserId = this.getUserId(state);
    return Boolean(authUserId);
  },
  getIsLoggingIn(state: State) {
    return fromJS(state.auth)
      .getIn(['loginMeta', 'isRequesting']);
  },
  getIsLoggingOut(state: State) {
    return fromJS(state.auth)
      .getIn(['logoutMeta', 'isRequesting']);
  },
};

/**
 * Sagas
 */
export const sagas = {
  *handleLoginRequest(action: LoginRequestAction) {
    try {
      const { payload } = action;
      const res = yield call(apiAgent, `${API_HOST}/auth/login`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      });
      if (res.code !== 200) {
        yield put(loginFail(new Error('Login fail'), res));
      } else {
        yield put(loginSuccess(res));
      }
    } catch (err) {
      yield put(loginFail(err));
    }
  },
  *handleLoginSuccess(action: LoginSuccessAction) {
    const { res } = action.payload;
    const { data } = res;
    yield put(setAuth(data.access_token, data.csrf_token, data.user));
    yield put(push('/'));
  },
  *handleLogoutRequest() {
    try {
      const { accessToken, csrfToken } = yield select(selectors.getUser);
      const res = yield call(apiAgent, `${API_HOST}/auth/logout`, injectCredentials({
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        credentials: 'include',
      }, accessToken));
      if (res.code !== 200) {
        yield put(logoutFail(new Error('Logout fail'), res));
      } else {
        yield put(logoutSuccess(res));
      }
    } catch (err) {
      yield put(logoutFail(err));
    }
  },
  *handleLogout() {
    yield put(clearAuth());
    yield put(push('/'));
  },
  handleRequestFail(action: LoginFailAction | LogoutFailAction) {
    const { res } = action.payload;
    if (res) {
      alert(fromJS(res).getIn(['data', 'message'], 'Some error happened.'));
    }
  },
};

export const rootSaga = {
  *loginRequest() {
    yield takeEvery(LOGIN_REQUEST, sagas.handleLoginRequest);
  },
  *loginSuccess() {
    yield takeEvery(LOGIN_SUCCESS, sagas.handleLoginSuccess);
  },
  *loginFail() {
    yield takeEvery(LOGIN_FAIL, sagas.handleRequestFail);
  },
  *logoutRequest() {
    yield takeEvery(LOGOUT_REQUEST, sagas.handleLogoutRequest);
  },
  *logoutSuccess() {
    yield takeEvery(LOGOUT_SUCCESS, sagas.handleLogout);
  },
  *logoutFail() {
    yield all([
      takeEvery(LOGOUT_FAIL, sagas.handleLogout),
      takeEvery(LOGOUT_FAIL, sagas.handleRequestFail),
    ]);
  },
};

/**
 * Reducer
 */
export default (state = defaultState, action: AuthActions): AuthState=> {
  switch (action.type) {
    case LOGIN_REQUEST:
      return fromJS(state)
        .setIn(['loginMeta', 'isRequesting'], true)
        .toJS();
    case LOGIN_SUCCESS:
      return fromJS(state)
        .setIn(['loginMeta', 'isRequesting'], false)
        .setIn(['loginMeta', 'isRequested'], true)
        .setIn(['loginMeta', 'isRequestSuccess'], true)
        .setIn(['loginMeta', 'isRequestFail'], false)
        .toJS();
    case LOGIN_FAIL:
      return fromJS(state)
        .setIn(['loginMeta', 'isRequesting'], false)
        .setIn(['loginMeta', 'isRequested'], true)
        .setIn(['loginMeta', 'isRequestSuccess'], false)
        .setIn(['loginMeta', 'isRequestFail'], true)
        .toJS();
    case LOGOUT_REQUEST:
      return fromJS(state)
        .setIn(['logoutMeta', 'isRequesting'], true)
        .toJS();
    case LOGOUT_SUCCESS:
      return fromJS(state)
        .setIn(['logoutMeta', 'isRequesting'], false)
        .setIn(['logoutMeta', 'isRequested'], true)
        .setIn(['logoutMeta', 'isRequestSuccess'], true)
        .setIn(['logoutMeta', 'isRequestFail'], false)
        .toJS();
    case LOGOUT_FAIL:
      return fromJS(state)
        .setIn(['logoutMeta', 'isRequesting'], false)
        .setIn(['logoutMeta', 'isRequested'], true)
        .setIn(['logoutMeta', 'isRequestSuccess'], false)
        .setIn(['logoutMeta', 'isRequestFail'], true)
        .toJS();
    case SET_AUTH: {
      const { accessToken, csrfToken, user } = action.payload;
      const userId = user.id;
      return fromJS(state)
        .set('authUserId', userId)
        .setIn(['users', userId], {
          accessToken,
          csrfToken,
          ...user,
        })
        .toJS();
    }
    case CLEAR_AUTH:
      return defaultState;
    default:
      return state;
  }
};

/**
 * Types
 */
interface User {
  id: number;
  username: string;
}

interface LoginResponseData {
  access_token: string;
  csrf_token: string;
  user: User;
}

interface SetAuthAction {
  type: typeof SET_AUTH;
  payload: {
    accessToken: string;
    csrfToken: string;
    user: User;
  };
}

interface ClearAuthAction {
  type: typeof CLEAR_AUTH;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: {
    username: string;
    password: string;
  };
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: ApiSuccessActionPayload<{
    data: LoginResponseData;
  }>;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: ApiFailActionPayload;
}

interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
  payload: ApiSuccessActionPayload;
}

interface LogoutFailAction {
  type: typeof LOGOUT_FAIL;
  payload: ApiFailActionPayload;
}

export type AuthActions = (
  SetAuthAction |
  ClearAuthAction |
  LoginRequestAction |
  LoginSuccessAction |
  LoginFailAction |
  LogoutRequestAction |
  LogoutSuccessAction |
  LogoutFailAction
);

export interface AuthState {
  loginMeta: ApiMeta;
  logoutMeta: ApiMeta;
  authUserId: string | null;
  users: {
    [id: string]: User;
  };
}
