import { combineReducers } from 'redux';
import auth from '../ducks/auth';
import status from '../ducks/status';

const rootReducer = combineReducers({
  auth,
  status,
});

export default rootReducer;
