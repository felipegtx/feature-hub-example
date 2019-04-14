import { ReactFeatureApp } from '@feature-hub/react';
import * as React from 'react';
import AppComponent from './components/app-component';

export default {
  id: 'my-app:simple-component',

  dependencies: {
    featureServices: {
      'my-app:my-service': '^1.0.0',
    },
  },

  create(env: any): ReactFeatureApp {
    const myServiceV1 = env.featureServices['my-app:my-service'];
		console.log(`Are we on the server? ${myServiceV1.isServer()}`);

    return {
      render: () => (
        <AppComponent serviceRef={myServiceV1} />       
      ),
    };
  },
};
