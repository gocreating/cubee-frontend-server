import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import config from './config';
import env from '../common/utils/env';
import userSubdomainRedirection from './middlewares/userSubdomainRedirection';
import configureStore from './middlewares/configureStore';
import syncStoreWithClientSide from './middlewares/syncStoreWithClientSide';
import getStatus from './middlewares/getStatus';
import renderMarkup from './middlewares/renderMarkup';

const server = express();

server.use(userSubdomainRedirection);
server.use(cookieParser());

server.get('/error', () => {
  throw new Error('error on purpose');
});

server.get('/info', (_req, res) => {
  res.json({
    repoName: process.env.repoName,
    commitSHA1: process.env.commitSHA1,
    buildDate: process.env.buildDate,
    imageTag: process.env.imageTag,
  });
});

server.get('/config', (req, res) => {
  res.json({
    subdomains: req.subdomains,
    foo: config.secretFoo,
    bar: config.secretBar,
  });
});

server.get('/*', configureStore, syncStoreWithClientSide);

server.get('/test', getStatus);

server
  .disable('x-powered-by')
  // hack to serve production asset server in docker container
  // ref: <https://github.com/jaredpalmer/razzle/issues/389>
  .use(express.static(env.isProduction ? path.join(__dirname, '../build/public') : process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', renderMarkup);

export default server;
