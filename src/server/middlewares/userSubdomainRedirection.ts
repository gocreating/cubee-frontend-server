import { RequestHandler } from 'express';
import { parseHost } from '../../common/utils/hostUtils';

const userSubdomainRedirection: RequestHandler = (req, res, next) => {
  const { host } = req.headers;
  const { isUserSubdomain, rootDomain, username } = parseHost(host as string);

  if (isUserSubdomain) {
    res.redirect(`${req.protocol}://${rootDomain}/${username}${req.originalUrl}`);
  } else {
    next();
  }
};

export default userSubdomainRedirection;
