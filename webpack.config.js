// @ts-check
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack-base.config');

const outputDir = './src/dist';

const configMerger = {

  /**
   * Configures the build output library. 
   * @param {webpack.LibraryTarget} libraryTarget The type of the output library.
   * @param {webpack.Configuration} baseConfig Base webpack.config.
   * @param {string} appName The app name.
   */
  to : function(libraryTarget, baseConfig, appName) { 
    return merge.smart(baseConfig, {
      output: {
        filename: `${appName}.js`,
        libraryTarget,
        path: path.resolve(__dirname, outputDir),
      },
    });
  },

  /**
   * Configures the output as a UMD module.
   * @param {webpack.Configuration} baseConfig Base webpack.config.
   * @param {string} appName The app name.
   */
  toUmd: function(baseConfig, appName) { 
    return this.to('umd', baseConfig, appName);
  },

  /**
   * Configures the output as a CommonJS module.
   * @param {webpack.Configuration} baseConfig Base webpack.config.
   * @param {string} appName The app name.
   */
  toCommonjs: function(baseConfig, appName) { 
    return this.to('commonjs2', baseConfig, `${appName}.commonjs`);
  },

  /**
   * Loads the app file from disk.
   * @param {string} pathToApp Path to app file.
   */
  getReactApp: function(pathToApp) { 
    return merge.smart(webpackBaseConfig, {
      entry: path.join(__dirname, pathToApp),
      externals: {
        react: 'react',
      },
    });
  }
};

/**
 * @type {webpack.Configuration}
 */
const featureAppOneConfig = configMerger.getReactApp('./src/frontend/feature-app-one-definition.tsx');

/**
 * @type {webpack.Configuration}
 */
const featureAppTwoConfig = configMerger.getReactApp('./src/frontend/feature-app-two-definition.tsx');

/**
 * @type {webpack.Configuration[]}
 */
const configs = [
  configMerger.toUmd(featureAppOneConfig, 'app1'),
  configMerger.toCommonjs(featureAppOneConfig, 'app1'),
  configMerger.toUmd(featureAppTwoConfig, 'app2'),
  configMerger.toCommonjs(featureAppTwoConfig, 'app2'),
  merge.smart(webpackBaseConfig, {
    entry: path.join(__dirname, './src/frontend/feature-app-integrator.tsx'),
    output: {
      filename: 'integrator.js',
      path: path.resolve(__dirname, outputDir),
    },
  }),
];

module.exports = configs;
