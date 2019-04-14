/* eslint-disable import/no-extraneous-dependencies, no-console */
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3008;
const ssrMiddleware = require('./ssr-middleware');

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');

// DEV CONFIGURATION
const compiler = webpack(webpackConfig);
const wpkMid = require('webpack-dev-middleware')(compiler, {
	logLevel: 'warn',
});

app.use(logger('dev'));
app.use(ssrMiddleware(wpkMid, port));

// START THE APP
app.listen(port, (error) => {
	if (error) throw error;
	const url = `http://localhost:${port}`;
	console.info(`\nExpress: Serve api on ${url}/ \n`);
	const opn = require('opn');
	opn(url);
});

// STOP PROCESS
const stopHandler = (signal) => {
	console.error('\nExit process in responding to %s', signal);
	process.exit(1);
};

process.on('SIGTERM', stopHandler, 'SIGTERM');
process.on('SIGINT', stopHandler, 'SIGINT');
process.on('SIGHUP', stopHandler, 'SIGINT');