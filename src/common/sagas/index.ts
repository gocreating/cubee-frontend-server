import { rootSaga as authSagas } from '../ducks/auth';
import { rootSaga as postSagas } from '../ducks/post';
import { rootSaga as statusSagas } from '../ducks/status';

const sagas = {
  auth: authSagas,
  post: postSagas,
  status: statusSagas,
};

export default sagas;
