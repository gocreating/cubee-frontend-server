const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  modify: (config, { target, dev }) => {
    const newConfig = { ...config };
    if (target === 'web') {
      newConfig.plugins.push(new ReactLoadablePlugin({
        filename: './build/react-loadable.json',
      }));
    }

    if (!dev) {
      /**
       * Disable webpack file size limit to prevent build fail on CI server or in environments with variable CI=true.
       * You can reproduce the error by running the command: `CI=true yarn build`.
       *
       * ref:
       *   - https://github.com/jaredpalmer/razzle/issues/671
       *   - https://github.com/jaredpalmer/razzle/issues/931
       *   - https://webpack.js.org/configuration/performance/
       */
      newConfig.performance = Object.assign({}, {
        maxAssetSize: 250000,
        maxEntrypointSize: 250000,
        hints: false,
      })
    }

    newConfig.resolve.extensions.push('.ts', '.tsx');
    newConfig.module.rules.push({
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    });
    return newConfig;
  },
};
