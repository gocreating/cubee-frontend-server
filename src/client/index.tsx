import { History } from 'history';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Loadable from 'react-loadable';
import configureStore from '../common/store/configureStore';
import App from '../common/components/App';

const preloadedState = window.__PRELOADED_STATE__;
const { store, history } = configureStore(preloadedState);

delete window.__PRELOADED_STATE__;

Loadable.preloadReady().then(() => {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history as History}>
        <Router history={history as History}>
          <App />
        </Router>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}
