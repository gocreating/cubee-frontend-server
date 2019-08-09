import path from 'path';
import express from 'express';
import config from './config';
import renderMarkup from './middlewares/renderMarkup';

const isProduction = (process.env.NODE_ENV === 'production');

const server = express();

server.get('/error', (req, res) => {
  throw new Error('error on purpose');
});

server.get('/info', (req, res) => {
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

server
  .disable('x-powered-by')
  // hack to serve production asset server in docker container
  // ref: <https://github.com/jaredpalmer/razzle/issues/389>
  .use(express.static(isProduction ? path.join(__dirname, '../build/public') : process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', renderMarkup);

export default server;
