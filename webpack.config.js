require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const sharedConfig = {
  mode: process.env.IS_PROD ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GIPHY_SDK_KEY': JSON.stringify(process.env.GIPHY_SDK_KEY),
      'process.env.PROGRAM': JSON.stringify(process.env.PROGRAM),
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
    }),
  ],
};

if (process.env.IS_PROD) {
  sharedConfig.plugins.push(new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
  }));
}

module.exports = [
  {
    entry: './src/index.js',
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'public/build'),
      publicPath: '/build/',
    },
    ...sharedConfig,
  },
  {
    entry: './src/ssr.js',
    target: 'node',
    output: {
      filename: 'ssr-compiled.js',
      path: path.join(__dirname, 'src'),
      libraryTarget: 'commonjs2',
      publicPath: '/build/',
    },
    ...sharedConfig,
  },
];
