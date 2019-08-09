import { setAuth } from '../../common/ducks/auth';

const fetchStateMiddleware = (req, res, next) => {
  res.locals.store.dispatch(setAuth(
    'accessToken', 3600, Date.now(), {
      id: 123,
      username: 'test',
    },
  ));
  next();
};

export default fetchStateMiddleware;
