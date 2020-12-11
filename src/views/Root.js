import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../routes/routes';
import store from '../store';
import DashboardView from './DashboardView';
import LoginView from './LoginView';
import ProductsView from './ProductsView';
import FinancesView from './FinancesView';
import ClientsView from './ClientsView';
import RentalView from './RentalView';
import NotFoundView from './NotFoundView';
import NewItemView from './NewItemView';

const Root = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={routes.home} component={DashboardView} />
        <Route path={routes.login} component={LoginView} />
        <Route path={routes.register} component={LoginView} />
        <Route path={routes.logout} component={LoginView} />
        <Route path={routes.products} exact component={ProductsView} />
        <Route path={routes.newProduct} component={NewItemView} />
        <Route path={routes.clients} exact component={ClientsView} />
        <Route path={routes.newClient} exact component={NewItemView} />
        <Route path={routes.rental} component={RentalView} />
        <Route path={routes.settings} exact component={NewItemView} />
        <Route path={routes.finances} component={FinancesView} />
        <Route path="*" component={NotFoundView} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
