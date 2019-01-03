import {FeatureAppManager, FeatureServiceRegistry} from '@feature-hub/core';
import {loadAmdModule} from '@feature-hub/module-loader';
import {FeatureAppContainer} from '@feature-hub/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/// Counter
import counterDefinition from './counter/counter';
import counterControlDefinition from './counter/counter-control';
import counterDisplayDefinition from './counter/counter-display';

/// Todo List
import todoDefinition from './todo/todo-list';
import todoListAdd from './todo/todo-list-add';
import todoListItems from './todo/todo-list-items';
import './style.scss';

const registry = new FeatureServiceRegistry({});

registry.registerProviders([counterDefinition], 'counter-web-app');
registry.registerProviders([todoDefinition], 'todo-list-web-app');

const manager = new FeatureAppManager(registry, loadAmdModule);

ReactDOM.render(
  <div>
    <FeatureAppContainer
      manager={manager}
      featureAppDefinition={counterControlDefinition}
    />
    <FeatureAppContainer
      manager={manager}
      featureAppDefinition={counterDisplayDefinition}
    />
    <hr />
    <FeatureAppContainer
      manager={manager}
      featureAppDefinition={todoListItems}
    />
    <FeatureAppContainer
      manager={manager}
      featureAppDefinition={todoListAdd}
      // css={[{href: todoListCss}]}
    />
  </div>,
  document.getElementById('app')
);
