import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { userFromCookie } from '../services/cookie';
import reduxProvider from '../../store';
import App from '../../client/app';

const normalizeAssets = (assets: any) => {
  if (typeof assets === 'object') {
    return Object.values(assets).flat();
  }

  return Array.isArray(assets) ? assets : [assets];
};

const getAuthenticatedPreloadedState = (req: any) => {
  const user = userFromCookie(req.cookies);
  if (!user) return {};
  return {
    account: {
      data: {
        id: user.id,
        email: user.email,
        isLoggedIn: true,
      },
    },
  };
};

export default (req: any, res: any, next: any) => {
  if (/^\/favico/.test(req.url)) {
    next();
  } else {
    const { webpackStats } = res.locals;
    const { assetsByChunkName } = webpackStats.toJson();
    const preloadedState = getAuthenticatedPreloadedState(req);
    const { store } = reduxProvider(false, req.url, preloadedState);
    const initialState = store.getState();
    const context = {};

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>,
    );

    res.render('index', {
      markup,
      script: normalizeAssets(assetsByChunkName)
        .filter((path) => path.endsWith('.js'))
        .map((path) => `<script src="${path}"></script>`)
        .join('\n'),
    });
  }
};
