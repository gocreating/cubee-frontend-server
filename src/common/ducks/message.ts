import shortid from 'shortid';
import { fromJS } from 'immutable';
import { RootState } from '../reducers/index';

/**
 * Actions
 */
const PUSH_MESSAGE = 'PUSH_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

/**
 * Action Creators
 */
export const pushMessage = (type: MessageType, message: string, title?: string): MessageActions => ({
  type: PUSH_MESSAGE,
  payload: { type, message, title },
});

export const removeMessage = (id: string): MessageActions => ({
  type: REMOVE_MESSAGE,
  payload: { id },
});

/**
 * Default State
 */
const defaultState: MessageState = {
  entities: {},
  ids: [],
};

/**
 * Selectors
 */
export const selectors = {
  getEntities(state: RootState): MessageMap {
    return fromJS(state.message)
      .get('entities')
      .toJS();
  },
  getMessages(state: RootState): Message[] {
    const msgState = fromJS(state.message);
    const userPosts = msgState
      .get('ids', fromJS([]))
      .map((msgId: string) => msgState.getIn(['entities', msgId]))
      .toJS();
    return userPosts;
  },
};

/**
 * Reducer
 */
export default (state = defaultState, action: MessageActions) => {
  switch (action.type) {
    case PUSH_MESSAGE: {
      const { type, title, message } = action.payload;
      const id = shortid.generate();
      const msg = {
        id,
        type,
        title,
        message,
      };
      const newIds = fromJS(state)
        .get('ids')
        .push(id);
      return fromJS(state)
        .setIn(['entities', id], msg)
        .set('ids', newIds)
        .toJS();
    }
    case REMOVE_MESSAGE: {
      const { id } = action.payload;
      const newIds = fromJS(state)
        .get('ids')
        .filter((msgId: string) => msgId !== id);
      return fromJS(state)
        .removeIn(['entities', id])
        .set('ids', newIds)
        .toJS();
    }
    default:
      return state;
  }
};

/**
 * Types
 */
export enum MessageType {
  VERBOSE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

export interface Message {
  id: string;
  type: MessageType;
  title?: string;
  message: string;
}

interface MessageMap {
  [id: string]: Message;
}

interface PushMessageAction {
  type: typeof PUSH_MESSAGE;
  payload: {
    type: MessageType;
    title?: string;
    message: string;
  };
}

interface RemoveMessageAction {
  type: typeof REMOVE_MESSAGE;
  payload: {
    id: string;
  };
}

export type MessageActions = (
  PushMessageAction |
  RemoveMessageAction
);

export type MessageState = Readonly<{
  entities: MessageMap;
  ids: string[];
}>
