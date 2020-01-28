import { ApiFailActionPayload } from 'cubee';
import { fromJS } from 'immutable';
import { put } from 'redux-saga/effects';
import { MessageType, pushMessage } from '../ducks/message';

interface RequestFailAction {
  type: string;
  payload: ApiFailActionPayload;
}

export const handleRequestFail = function* (action: RequestFailAction) {
  const { res, error } = action.payload;
  let message = '';
  if (res) {
    message = fromJS(res)
      .getIn(['data', 'message'], 'Some remote error happened.');
  } else if (error) {
    message = 'Some local error happened.';
  }
  yield put(pushMessage(MessageType.ERROR, message));
}
