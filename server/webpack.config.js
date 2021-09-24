const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { name: NAME, version: VERSION } = require('./package.json');

const environment = process.env.NODE_ENV || 'development';

const getDevTools = () => (
  environment === 'development'
    ? 'cheap-module-eval-source-map'
    : 'source-map'
);

const getPlugins = () => {
  const plugins = [
    new CleanPlugin([ './dist' ], {
      root: path.resolve('./'),
      verbose: true,
    }),
    new HtmlPlugin({
      filename: environment === 'development' ? './index.html' : `${NAME}-${VERSION}.html`,
      template: path.resolve('./index.html'),
      title: NAME,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
      openAnalyzer: process.env.NODE_ENV === 'production',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      // chunkFilename: process.env.NODE_ENV === 'production' ? '[id].[hash].css' : '[id].css',
      // filename: process.env.NODE_ENV === 'production' ? '[name].[hash].css' : '[name].css',
      chunkFilename: `${NAME}-${VERSION}.css`,
      filename: `${NAME}-${VERSION}.css`,
      ignoreOrder: false,
    }),
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new CompressionPlugin(),
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: { compress: { inline: false } },
      }),
    );
  }

  return plugins;
};

module.exports = {
  devtool: getDevTools(),
  entry: [
    'babel-polyfill',
    './src/index.js',
    './style/styles.css',
  ],
  module: {
    rules: [ {
      exclude: /node_modules/,
      test: /\.(js|jsx)$/i,
      use: [ {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      } ],
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
            // if hmr does not work, this is a forceful method.
            reloadAll: true,
          },
        },
        'css-loader',
      ],
    },
    {
      loader: 'url-loader?limit=100000',
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    },
    ],
  },
  output: {
    filename: `${NAME}-${VERSION}.js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  plugins: getPlugins(),
  profile: true,
};
