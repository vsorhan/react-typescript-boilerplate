import * as React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import reduxProvider from '../store';

import App from './app';

const { store, history } = reduxProvider(true);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
