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
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        chrome: 66,
                      },
                      useBuiltIns: 'usage',
                      modules: false,
                      shippedProposals: true,
                      debug: false,
                    },
                  ],
                  '@babel/preset-react',
                ],
                plugins: [
                  'react-hot-loader/babel',
                  'styled-components',
                ],
                cacheDirectory: true,
                babelrc: false,
              },
            },
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
  externals: [
  ],
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
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
