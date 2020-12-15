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
import NotFoundView from './NotFoundView';
import NewItemView from './NewItemView';
import NewClientView from './NewClientView';
import NewProductView from './NewProductView';
import EditClientView from './EditClientView';
import EditProductView from './EditProductView';
import NewRentView from './NewRentView';
import RentsView from './RentsView';

const Root = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={routes.home} component={DashboardView} />
        <Route path={routes.login} component={LoginView} />
        <Route path={routes.register} component={LoginView} />
        <Route path={routes.logout} component={LoginView} />
        <Route path={routes.products} exact component={ProductsView} />
        <Route path={routes.newProduct} component={NewProductView} />
        <Route path={routes.product} component={EditProductView} />
        <Route path={routes.clients} exact component={ClientsView} />
        <Route path={routes.newClient} component={NewClientView} />
        <Route path={routes.client} component={EditClientView} />
        <Route path={routes.rents} exact component={RentsView} />
        <Route path={routes.newRent} component={NewRentView} />
        <Route path={routes.settings} component={NewItemView} />
        <Route path={routes.finances} component={FinancesView} />
        <Route path="*" component={NotFoundView} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
