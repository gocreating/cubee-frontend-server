import { fromJS } from 'immutable';
import { parseHost } from '../utils/hostUtils';
import { RootState } from '../reducers/index';

/**
 * Actions
 */
const SET_HOST = 'SET_HOST';

/**
 * Action Creators
 */
export const setHost = (host: string): HostActions => ({
  type: SET_HOST,
  payload: { host },
});

/**
 * Default State
 */
const defaultState: HostState = {
  isRootDomain: false,
  isUserSubdomain: false,
  username: '',
  currentHost: '',
};

/**
 * Selectors
 */
export const selectors = {
  getIsRootDomain(state: RootState): boolean {
    return fromJS(state.host)
      .get('isRootDomain');
  },
  getIsUserSubdomain(state: RootState): boolean {
    return fromJS(state.host)
      .get('isUserSubdomain');
  },
  getUsername(state: RootState): string {
    return fromJS(state.host)
      .get('username');
  },
  getHost(state: RootState): string {
    return fromJS(state.host)
      .get('currentHost');
  },
};

/**
 * Reducer
 */
export default (state = defaultState, action: HostActions) => {
  switch (action.type) {
    case SET_HOST: {
      const { host } = action.payload;
      const { isRootDomain, isUserSubdomain, username } = parseHost(host);
      return fromJS(state)
        .set('isRootDomain', isRootDomain)
        .set('isUserSubdomain', isUserSubdomain)
        .set('username', username)
        .set('currentHost', host)
        .toJS();
    }
    default:
      return state;
  }
};

/**
 * Types
 */
interface SetHostAction {
  type: typeof SET_HOST;
  payload: {
    host: string;
  };
}

export type HostActions = (
  SetHostAction
);

export type HostState = Readonly<{
  isRootDomain: boolean;
  isUserSubdomain: boolean;
  username: string;
  currentHost: string;
}>
