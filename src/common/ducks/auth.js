/**
 * Actions
 */
const SET_AUTH = 'SET_AUTH';
const CLEAR_AUTH = 'CLEAR_AUTH';

/**
 * Action Creators
 */
export const setAuth = (accessToken, ttl, tokenCreatedAt, user) => ({
  type: SET_AUTH,
  payload: { accessToken, ttl, tokenCreatedAt, user },
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

/**
 * Default State
 */
const defaultState = {
  auth: null,
  users: {},
};

/**
 * Selectors
 */
export const selectors = {
  getIsAuth: (state) => Boolean(state.auth),
  getUsers: (state) => (state.users),
  getLoggedUserId: (state) => (state.auth),
  getLoggedUser(state) {
    const userId = this.getLoggedUserId(state);

    if (!userId) {
      return {};
    }
    return this.getUsers(state)[userId];
  },
  getAccessToken(state) {
    return this.getLoggedUser(state).accessToken;
  },
};

/**
 * Reducer
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_AUTH: {
      let {
        accessToken,
        ttl,
        tokenCreatedAt,
        user,
      } = action.payload;
      let userId = user.id;
      let tokenExpiredAt = new Date((
        new Date(tokenCreatedAt)
      ).getTime() + ttl * 1000);

      return {
        auth: userId,
        users: {
          ...state.users,
          [userId]: {
            accessToken,
            ttl,
            tokenCreatedAt,
            tokenExpiredAt,
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
