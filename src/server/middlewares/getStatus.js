import { race, take } from 'redux-saga/effects';
import { getStatus, GET_STATUS_SUCCESS, GET_STATUS_FAIL } from '../../common/ducks/status';

const getStatusMiddleware = (req, res, next) => {
  const { store } = res.locals;
  store.runSaga(function*() {
    yield race([
      take(GET_STATUS_SUCCESS),
      take(GET_STATUS_FAIL),
    ]);
    next();
  });
  store.dispatch(getStatus());
};

export default getStatusMiddleware;
