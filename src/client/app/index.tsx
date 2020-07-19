import * as React from 'react';
import { Switch, Route } from 'react-router';
import { Home, About } from './pages';

const App: React.FC = () => (
  <Switch>
    <Route exact={true} path={['/', '/home']}>
      <Home />
    </Route>
    <Route exact={true} path="/about">
      <About />
    </Route>
  </Switch>
);

export default App;
