import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import combinedReducers from './reducers';

export default (isClient: boolean, url?: string, preloadedState?: object) => {
  const history = isClient
    ? createBrowserHistory()
    : createMemoryHistory({
        initialEntries: [url],
      });

  const routeMiddleware = routerMiddleware(history);
  // @ts-ignore
  const preloadedWindowState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : {};
  const store = configureStore({
    reducer: combinedReducers(history),
    middleware: [...getDefaultMiddleware(), routeMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: isClient ? preloadedWindowState : preloadedState,
  });

  return {
    store,
    history,
  };
};
