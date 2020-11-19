import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../routes/routes';
import DashboardView from './DashboardView';
import LoginView from './LoginView';
import ProductsView from './ProductsView';
import FinancesView from './FinancesView';
import ClientsView from './ClientsView';
import RentalView from './RentalView';
import NotFoundView from './NotFoundView';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path={routes.home} component={DashboardView} />
      <Route path={routes.login} component={LoginView} />
      <Route path={routes.register} component={LoginView} />
      <Route path={routes.logout} component={LoginView} />
      <Route path={routes.products} component={ProductsView} />
      <Route path={routes.clients} component={ClientsView} />
      <Route path={routes.rental} component={RentalView} />
      <Route path={routes.finances} component={FinancesView} />
      <Route path="*" component={NotFoundView} />
    </Switch>
  </Router>
);

export default Root;
