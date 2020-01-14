import { RequestHandler } from 'express';
import { RequestCookie } from 'cubee';
import jwtDecode from 'jwt-decode';
import { setAuth } from '../../common/ducks/auth';

const syncStoreWithClientSideMiddleware: RequestHandler = (req, res, next) => {
  const accessTokenCookie = (req.cookies as RequestCookie).access_token_cookie;
  const CSRFAccessToken = (req.cookies as RequestCookie).csrf_access_token;
  if (accessTokenCookie && CSRFAccessToken) {
    const { identity } = jwtDecode(accessTokenCookie);
    res.locals.store.dispatch(setAuth(accessTokenCookie, CSRFAccessToken, identity));
  }
  next();
};

export default syncStoreWithClientSideMiddleware;
