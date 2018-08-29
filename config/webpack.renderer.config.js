const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development': 'production',
  context: path.resolve(__dirname, '../'),
  target: 'electron-renderer',
  entry: {
    renderer: [
      'webpack-hot-client/client',
      './public/index'
    ],
  },
  output: {
    path: path.resolve(__dirname, '../app/'),
    filename: './[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: false,
                babelrc: true,
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            use: {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[ext]',
              }
            },
          },
        ],
      }
    ],
  },
  resolve: {
    alias: {
      pouchdb: path.resolve(__dirname, '../node_modules/pouchdb/lib/index-browser.es'),
    },
  },
  devtool: process.env.WEBPACK_SERVE ? 'cheap-module-source-map' : 'none',
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  serve: {
    port: 8000,
    hotClient: {
      allEntries: true,
      autoConfigure: true,
      hot: true,
    },
  },
};
