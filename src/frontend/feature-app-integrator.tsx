/* eslint-disable no-console */
import { createFeatureHub } from '@feature-hub/core';
import { defineExternals, loadAmdModule } from '@feature-hub/module-loader-amd';
import { FeatureHubContextProvider } from '@feature-hub/react';
import { serializedStateManagerDefinition } from '@feature-hub/serialized-state-manager';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from '../feature-hub/feature-app-loader';
import AppService from './services/app-service';

function getSerializedStatesFromDom(): string | undefined {
  const scriptElement = document.querySelector(
    'script[type="x-feature-hub/serialized-states"]',
  );

  return (scriptElement && scriptElement.textContent) || undefined;
}

function getUrlsForHydrationFromDom(): string[] {
  const scriptElement = document.querySelector(
    'script[type="x-feature-hub/urls-for-hydration"]',
  );

  if (!scriptElement || !scriptElement.textContent) {
    return [];
  }

  return JSON.parse(scriptElement.textContent);
}

(async () => {
  defineExternals({ react: React });

  const { featureAppManager, featureServices } = createFeatureHub(
    'my-micro-frontend:integrator',
    {
      moduleLoader: loadAmdModule,
      providedExternals: { react: '16.8.0' },
      featureServiceDefinitions: [serializedStateManagerDefinition, AppService],
      featureServiceDependencies: {
        [serializedStateManagerDefinition.id]: '^1.0.0',
        [AppService.id]: '^1.0.0',
      },
    },
  );

  const serializedStateManager : any = featureServices[
    serializedStateManagerDefinition.id
  ];

  const serializedStates = getSerializedStatesFromDom();

  if (serializedStates) {
    serializedStateManager.setSerializedStates(serializedStates);
  }

  await Promise.all(
    getUrlsForHydrationFromDom().map(async url => featureAppManager.preloadFeatureApp(url)),
  );

  ReactDOM.hydrate(
    <FeatureHubContextProvider value={{ featureAppManager }}>
      <App appName='app1' />
      <hr/>
      <App appName='app2' />
    </FeatureHubContextProvider>,
    document.querySelector('#my-apps'),
  );
})().catch(console.error);
