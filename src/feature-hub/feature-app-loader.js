const { FeatureAppLoader } = require('@feature-hub/react');
const propTypes = require('prop-types');
const React = require('react');

function App({ appName, port }) {
  return (
    React.createElement(FeatureAppLoader, {
      src: `${appName}.js`,
      serverSrc: port ? `http://localhost:${port}/${appName}.commonjs.js` : '',
      instanceConfig: require('./config.json')
    })
  );
}

App.propTypes = {
  port: propTypes.number,
  appName: propTypes.string,
};

App.defaultProps = {
  port: 3003,
  appName: 'app'
};

module.exports = App;
