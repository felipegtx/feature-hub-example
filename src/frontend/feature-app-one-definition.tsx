import { ReactFeatureApp } from '@feature-hub/react';
import * as React from 'react';
import AppComponent from './components/app-component';

export default {
  id: 'my-app-one:simple-component',

  dependencies: {
    featureServices: {
      'my-services:my-service-one': '^1.0.0',
    },
  },

  create(env: any): ReactFeatureApp {
    const myServiceV1 = env.featureServices['my-services:my-service-one'];
		console.log(`Are we on the server for the first app? ${myServiceV1.isServer()}`);

    return {
      render: () => (
        <>
          <p>This is my first app</p>
          <AppComponent serviceRef={myServiceV1} />       
        </>
      ),
    };
  },
};
