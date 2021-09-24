import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './routes';

const configStore = store();

const app = document.querySelector('.app');

render(
  <Provider store={configStore}>
    <Routes />
  </Provider>,
  app
);
