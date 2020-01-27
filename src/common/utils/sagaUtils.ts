import { ApiFailActionPayload } from 'cubee';
import { fromJS } from 'immutable';

interface RequestFailAction {
  type: string;
  payload: ApiFailActionPayload;
}

export const handleRequestFail = (action: RequestFailAction) => {
  const { res, error } = action.payload;
  if (res) {
    alert(fromJS(res).getIn(['data', 'message'], 'Some remote error happened.'));
  } else if (error) {
    alert('Some local error happened.');
  }
}
