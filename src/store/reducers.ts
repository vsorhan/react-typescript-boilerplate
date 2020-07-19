import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { BrowserHistory, MemoryHistory } from 'history';

export default (history: BrowserHistory | MemoryHistory) =>
  combineReducers({
    router: connectRouter(history),
  });
