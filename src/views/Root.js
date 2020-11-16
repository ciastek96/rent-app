import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../routes/routes';
import DashboardView from './DashboardView';

const Root = () => (
  <Router>
    <Switch>
      <Route path={routes.home} component={DashboardView} />
    </Switch>
  </Router>
);

export default Root;
