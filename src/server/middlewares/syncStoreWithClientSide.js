import jwtDecode from 'jwt-decode';
import { setAuth } from '../../common/ducks/auth';

const syncStoreWithClientSideMiddleware = (req, res, next) => {
  const { access_token_cookie, csrf_access_token } = req.cookies;
  if (access_token_cookie && csrf_access_token) {
    const { identity } = jwtDecode(access_token_cookie);
    res.locals.store.dispatch(setAuth(access_token_cookie, csrf_access_token, identity));
  }
  next();
};

export default syncStoreWithClientSideMiddleware;
