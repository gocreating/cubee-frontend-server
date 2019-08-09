import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import App from './App';
import stats from '../build/react-loadable.json';
import config from './config';

const isProduction = (process.env.NODE_ENV === 'production');
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

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
  .get('/*', (req, res) => {
    const context = {};
    const modules = [];
    const markup = renderToString(
      <Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Capture>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      const bundles = getBundles(stats, modules);
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));
      const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));

      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          styles
            .map(style => {
              return `<link href="${style.file}" rel="stylesheet"/>`;
            })
            .join('\n')
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        ${
          chunks
            .map(
              chunk =>
                process.env.NODE_ENV === 'production'
                  ? `<script src="/${chunk.file}"></script>`
                  : `<script src="http://${process.env.HOST}:${parseInt(
                      process.env.PORT,
                      10
                    ) + 1}/${chunk.file}"></script>`
            )
            .join('\n')
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
