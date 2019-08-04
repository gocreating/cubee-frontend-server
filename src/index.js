import http from 'http';
import Loadable from 'react-loadable';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

Loadable.preloadAll().then(() => {
  server.listen(process.env.PORT || 3000, error => {
    if (error) {
      console.log(error);
    }

    console.log('🚀 started');
  });
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
