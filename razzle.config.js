const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  modify: (config, { target }) => {
    const newConfig = { ...config };
    if (target === 'web') {
      newConfig.plugins.push(new ReactLoadablePlugin({
        filename: './build/react-loadable.json',
      }));
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
