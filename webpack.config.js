// @ts-check
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack-base.config');

const outputDir = './src/dist';

/**
 * @type {webpack.Configuration}
 */
const featureAppConfig = merge.smart(webpackBaseConfig, {
  entry: path.join(__dirname, './src/frontend/feature-app-definition.tsx'),
  externals: {
    react: 'react',
  },
});

/**
 * @type {webpack.Configuration[]}
 */
const configs = [
  merge.smart(featureAppConfig, {
    output: {
      filename: 'app.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, outputDir),
    },
  }),
  merge.smart(featureAppConfig, {
    output: {
      filename: 'app.commonjs.js',
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, outputDir),
    },
    target: 'node',
  }),
  merge.smart(webpackBaseConfig, {
    entry: path.join(__dirname, './src/frontend/feature-app-integrator.tsx'),
    output: {
      filename: 'integrator.js',
      path: path.resolve(__dirname, outputDir),
    },
  }),
];

module.exports = configs;
