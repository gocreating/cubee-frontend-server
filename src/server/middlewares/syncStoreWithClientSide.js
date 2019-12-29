import jwtDecode from 'jwt-decode';
import { setAuth } from '../../common/ducks/auth';

const syncStoreWithClientSideMiddleware = (req, res, next) => {
  const { access_token_cookie } = req.cookies;
  if (access_token_cookie) {
    const { identity } = jwtDecode(access_token_cookie);
    res.locals.store.dispatch(setAuth(access_token_cookie, identity));
  }
  next();
};

export default syncStoreWithClientSideMiddleware;
