import { fromJS } from 'immutable';
import env from '../utils/env';
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
  isUserDomain: false,
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
  getIsUserDomain(state: RootState): boolean {
    return fromJS(state.host)
      .get('isUserDomain');
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
      const parts = host.split('.');
      const firstPart = parts[0] || '';
      const isRootDomain = (
        (env.isStaging && (firstPart === 'stg' || firstPart === 'localhost')) ||
        (env.isProduction && firstPart === 'cubee')
      );
      const isUserDomain = !isRootDomain;
      return fromJS(state)
        .set('isRootDomain', isRootDomain)
        .set('isUserDomain', isUserDomain)
        .set('username', isUserDomain ? firstPart : '')
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
  isUserDomain: boolean;
  username: string;
  currentHost: string;
}>
