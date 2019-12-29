import { call, put, takeEvery, select } from 'redux-saga/effects';
import { API_HOST } from '../config';
import { selectors as authSelectors } from './auth';
import apiAgent, { injectCredentials } from '../api/agent';

/**
 * Actions
 */
export const GET_STATUS = 'GET_STATUS';
export const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS';
export const GET_STATUS_FAIL = 'GET_STATUS_FAIL';

/**
 * Action Creators
 */
export const getStatus = () => ({
  type: GET_STATUS,
});

export const getStatusSuccess = (data) => ({
  type: GET_STATUS_SUCCESS,
  payload: { data },
});

export const getStatusFail = (err, res) => ({
  type: GET_STATUS_FAIL,
  payload: { err, res },
});

/**
 * Default State
 */
const defaultState = {
  isFetching: false,
  error: null,
};

/**
 * Selectors
 */
export const selectors = {};

/**
 * Sagas
 */
export const sagas = {
  *handleGetStatus(action) {
    try {
      const { accessToken } = yield select(authSelectors.getUser);
      const res = yield call(apiAgent, `${API_HOST}/users/me`, injectCredentials({}, accessToken));
      yield put(getStatusSuccess(res));
    } catch(e) {
      console.error('Error when handling action', action, '\n', e);
      yield put(getStatusFail(e));
    }
  },
};

export const rootSaga = {
  *getStatus() {
    yield takeEvery(GET_STATUS, sagas.handleGetStatus);
  },
};

/**
 * Reducer
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_STATUS: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case GET_STATUS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload.data,
      };
    case GET_STATUS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
