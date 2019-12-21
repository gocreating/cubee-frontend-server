import { rootSaga as authSagas } from '../ducks/auth';
import { rootSaga as statusSagas } from '../ducks/status';

const sagas = {
  auth: authSagas,
  status: statusSagas,
};

export default sagas;
