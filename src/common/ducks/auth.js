import { fromJS } from 'immutable';
import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { API_HOST } from '../config';
import apiAgent, { injectCredentials } from '../api/agent';

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
export const setAuth = (accessToken, csrfToken, user) => ({
  type: SET_AUTH,
  payload: { accessToken, csrfToken, user },
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const loginRequest = (username, password) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const loginSuccess = (res) => ({
  type: LOGIN_SUCCESS,
  payload: { res },
});

export const loginFail = (error, res) => ({
  type: LOGIN_FAIL,
  payload: { error, res },
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (res) => ({
  type: LOGOUT_SUCCESS,
  payload: { res },
});

export const logoutFail = (error, res) => ({
  type: LOGOUT_FAIL,
  payload: { error, res },
});

/**
 * Default State
 */
const defaultState = {
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
  getUserId(state) {
    const authUserId = fromJS(state.auth)
      .get('authUserId');
    return authUserId ? `${authUserId}` : null;
  },
  getUser(state) {
    const authUserId = selectors.getUserId(state);
    return fromJS(state.auth)
      .getIn(['users', authUserId], fromJS({}))
      .toJS();
  },
  getUsers(state) {
    return fromJS(state.auth)
      .get('users')
      .toJS();
  },
  getIsAuth(state) {
    const authUserId = this.getUserId(state);
    return Boolean(authUserId);
  },
  getIsLoggingIn(state) {
    return fromJS(state.auth)
      .getIn(['loginMeta', 'isRequesting']);
  },
  getIsLoggingOut(state) {
    return fromJS(state.auth)
      .getIn(['logoutMeta', 'isRequesting']);
  },
};

/**
 * Sagas
 */
export const sagas = {
  *handleLoginRequest(action) {
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
        yield put(loginFail(null, res));
      } else {
        yield put(loginSuccess(res));
      }
    } catch (err) {
      yield put(loginFail(err));
    }
  },
  *handleLoginSuccess(action) {
    const { res } = action.payload;
    const { data } = res;
    yield put(setAuth(data.access_token, data.csrf_token, data.user));
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
        yield put(logoutFail(null, res));
      } else {
        yield put(logoutSuccess(res));
      }
    } catch (err) {
      yield put(logoutFail(err));
    }
  },
  *handleLogout() {
    yield put(clearAuth());
  },
  handleRequestFail(action) {
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
export default (state = defaultState, action) => {
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
