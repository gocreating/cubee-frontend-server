import { fromJS } from 'immutable';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_HOST } from '../config';
import apiAgent from '../api/agent';

/**
 * Actions
 */
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const SET_AUTH = 'SET_AUTH';
const CLEAR_AUTH = 'CLEAR_AUTH';

/**
 * Action Creators
 */
export const setAuth = (accessToken, user) => ({
  type: SET_AUTH,
  payload: { accessToken, user },
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

export const loginFail = (res) => ({
  type: LOGIN_FAIL,
  payload: { res },
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
  authUserId: null,
  users: {},
};

/**
 * Selectors
 */
export const selectors = {
  getUserId(state) {
    return fromJS(state.auth)
      .get('authUserId');
  },
  getUser(state) {
    const authUserId = this.getUserId(state);
    return fromJS(state.auth)
      .getIn(['users', authUserId])
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
  getIsLoading(state) {
    return fromJS(state.auth)
      .getIn(['loginMeta', 'isRequesting']);
  },
};

/**
 * Sagas
 */
export const sagas = {
  *handleLoginRequest(action) {
    const { payload } = action;
    const res = yield call(apiAgent, `${API_HOST}/auth/login`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    });
    if (res.code !== 200) {
      yield put(loginFail(res));
    } else {
      yield put(loginSuccess(res));
    }
  },
  *handleLoginSuccess(action) {
    const { res } = action.payload;
    const { data } = res;
    yield put(setAuth(data.access_token, data.user));
  },
  handleLoginFail(action) {
    const { res } = action.payload;
    alert(res.data.message);
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
    yield takeEvery(LOGIN_FAIL, sagas.handleLoginFail);
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
    case SET_AUTH: {
      const { accessToken, user } = action.payload;
      const userId = user.id;
      return {
        authUserId: userId,
        users: {
          ...state.users,
          [userId]: {
            accessToken,
            ...user,
          },
        },
      };
    }
    case CLEAR_AUTH:
      return defaultState;
    default:
      return state;
  }
};
