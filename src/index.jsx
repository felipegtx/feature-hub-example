import {FeatureAppManager, FeatureServiceRegistry} from '@feature-hub/core';
import {loadAmdModule} from '@feature-hub/module-loader';
import {FeatureAppContainer} from '@feature-hub/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/// Todo List
import todoDefinition from './todo/todo-list';
import todoListAdd from './todo/todo-list-add';
import todoListItems from './todo/todo-list-items';
import './style.scss';

const registry = new FeatureServiceRegistry({});

registry.registerProviders([todoDefinition], 'todo-list-web-app');

const manager = new FeatureAppManager(registry, loadAmdModule);

ReactDOM.render(
  <div>
    <FeatureAppContainer
      manager={manager}
      featureAppDefinition={todoListItems}
    />
    <FeatureAppContainer
      manager={manager}
      featureAppDefinition={todoListAdd}
    />
  </div>,
  document.getElementById('app')
);
