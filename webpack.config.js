require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const sharedConfig = {
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
    }),
  ],
};

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
