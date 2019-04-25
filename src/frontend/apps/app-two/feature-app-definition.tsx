import { ReactFeatureApp } from '@feature-hub/react';
import * as React from 'react';
import AppComponent from '../../components/app-component';

export default {
  id: 'my-app-two:root',

  dependencies: {
    featureServices: {
      'my-services:my-service-one': '^1.0.0',
    },
  },

  create(env: any): ReactFeatureApp {
    const myServiceV1 = env.featureServices['my-services:my-service-one'];
    const { fontColor } = env.instanceConfig;
    console.log(`Are we on the server on the second app? ${myServiceV1.isServer()}`);

    return {
      render: () => (
        <>
          <p>This is my second app</p>
          <AppComponent fontColor={fontColor} serviceRef={myServiceV1} myAppId={this.id} />
        </>
      ),
    };
  },
};
