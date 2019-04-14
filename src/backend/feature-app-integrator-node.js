const { asyncSsrManagerDefinition } = require('@feature-hub/async-ssr-manager');
const { createFeatureHub } = require('@feature-hub/core');
const { loadCommonJsModule } = require('@feature-hub/module-loader-commonjs');
const { FeatureHubContextProvider } = require('@feature-hub/react');
const { serializedStateManagerDefinition } = require('@feature-hub/serialized-state-manager');
const React = require('react');
const ReactDOM = require('react-dom/server');
const App = require('../feature-hub/feature-app-loader');
const AppService = require('../frontend/services/app-service');

module.exports = async function renderApp({ port }) {
  const { featureAppManager, featureServices } = createFeatureHub(
    'my-app:integrator-node',
    {
      moduleLoader: loadCommonJsModule,
      providedExternals: { react: '16.8.0' },
      featureServiceDefinitions: [
        asyncSsrManagerDefinition,
        serializedStateManagerDefinition,
        AppService,
      ],
      featureServiceDependencies: {
        [asyncSsrManagerDefinition.id]: '^1.0.0',
        [serializedStateManagerDefinition.id]: '^1.0.0',
        [AppService.id]: '^1.0.0',
      },
    },
  );

  const asyncSsrManager = featureServices[
    asyncSsrManagerDefinition.id
  ];

  const urlsForHydration = [];

  const featureHubContextValue = {
    featureAppManager,
    asyncSsrManager,

    addUrlForHydration(url) {
      if (urlsForHydration.indexOf(url) > -1) { return; }
      urlsForHydration.push(url);
    },
  };

  const html = await asyncSsrManager
    .renderUntilCompleted(() => {
      const reactElement = React.createElement(FeatureHubContextProvider, {
        value: featureHubContextValue,
      }, React.createElement(App, {
        port,
      }));

      const elementStr = ReactDOM.renderToString(reactElement);

      return elementStr;
    });

  const serializedStateManager = featureServices[
    serializedStateManagerDefinition.id
  ];

  const serializedStates = serializedStateManager.serializeStates();

  return { html, serializedStates, urlsForHydration };
};
