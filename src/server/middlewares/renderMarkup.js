import serialize from 'serialize-javascript';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import stats from '../../../build/react-loadable.json';
import App from '../../common/components/App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const renderMarkupMiddleware = (req, res) => {
  const { store } = res.locals;
  const context = {};
  const modules = [];
  const sheet = new ServerStyleSheet();

  let markup = '';
  let styleTags = '';

  try {
    markup = renderToString(
      sheet.collectStyles(
        <Capture report={moduleName => modules.push(moduleName)}>
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </Provider>
        </Capture>
      )
    );
    styleTags = sheet.getStyleTags();
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }

  if (context.url) {
    res.redirect(context.url);
  } else {
    const bundles = getBundles(stats, modules);
    const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));
    const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
    const helmet = Helmet.renderStatic();
    const finalState = store.getState();

    res.status(200).send(
      `<!doctype html>
<html lang="">
<head>
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
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
  ${styleTags}
</head>
<body>
  <div id="root">${markup}</div>
  <script>
    window.CUBEE_ENV = ${serialize(process.env.CUBEE_ENV)};
    window.__PRELOADED_STATE__ = ${serialize(finalState)}
  </script>
</body>
</html>`
    );
  }
};

export default renderMarkupMiddleware;
