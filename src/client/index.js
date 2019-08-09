import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import configureStore from '../common/store/configureStore';
import App from '../common/components/App';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

delete window.__PRELOADED_STATE__;

Loadable.preloadReady().then(() => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}
