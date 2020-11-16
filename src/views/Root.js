import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../routes/routes';

const Root = () => (
  <Router>
    <Switch>
      <Route path={routes.home} />
    </Switch>
  </Router>
);

export default Root;
