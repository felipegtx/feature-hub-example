const { FeatureAppLoader } = require('@feature-hub/react');
const propTypes = require('prop-types');
const React = require('react');

function App({ port }) {
  return (
    React.createElement(FeatureAppLoader, {
      src: 'app.js',
      serverSrc: port ? 'http://localhost:'.concat(port, '/app.commonjs.js') : '',
    })
  );
}

App.propTypes = {
  port: propTypes.string,
};

App.defaultProps = {
  port: '3003',
};

module.exports = App;
