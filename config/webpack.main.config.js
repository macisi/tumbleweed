const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname, '../'),
  target: 'electron-main',
  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, '../app/'),
    filename: './[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeExternals(),
  ],
  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: 'none',
};
