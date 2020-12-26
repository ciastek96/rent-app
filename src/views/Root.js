import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { routes } from '../routes/routes';
import DashboardView from './DashboardView';
import LoginView from './LoginView';
import ProductsView from './ProductsView';
import HistoryView from './HistoryView';
import ClientsView from './ClientsView';
import NotFoundView from './NotFoundView';
import NewClientView from './NewClientView';
import SettingsView from './SettingsView';
import NewProductView from './NewProductView';
import EditClientView from './EditClientView';
import EditProductView from './EditProductView';
import NewRentView from './NewRentView';
import EditRentView from './EditRentView';
import RentsView from './RentsView';
import UpdatePasswordView from './UpdatePasswordView';
import { getClients, getProducts, getRents, getAccounts } from '../actions';
import setAuthToken from '../utils/setAuthToken';
import ProtectedRoute from '../routes/ProtectedRoute/ProtectedRoute';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      dispatch({ type: 'SET_CURRENT_USER', payload: jwt.decode(localStorage.jwtToken) });
      dispatch(getClients());
      dispatch(getProducts());
      dispatch(getRents());
      dispatch(getAccounts());
    }
  });

  return (
    <Router>
      <Switch>
        <Route path={routes.login} component={LoginView} />
        <Route path={routes.register} component={LoginView} />
        <Route path={routes.logout} component={LoginView} />
        <ProtectedRoute exact path={routes.home} component={DashboardView} />
        <ProtectedRoute path={routes.products} exact component={ProductsView} />
        <ProtectedRoute path={routes.newProduct} component={NewProductView} />
        <ProtectedRoute path={routes.product} component={EditProductView} />
        <ProtectedRoute path={routes.clients} exact component={ClientsView} />
        <ProtectedRoute path={routes.newClient} component={NewClientView} />
        <ProtectedRoute path={routes.client} component={EditClientView} />
        <ProtectedRoute path={routes.newRent} component={NewRentView} />
        <ProtectedRoute path={routes.rents} exact component={RentsView} />
        <ProtectedRoute path={routes.rent} exact component={EditRentView} />
        <ProtectedRoute path={routes.settings} exact component={SettingsView} />
        <ProtectedRoute path={routes.updatePassword} component={UpdatePasswordView} />
        <ProtectedRoute path={routes.finances} component={HistoryView} />
        <Route path="*" component={NotFoundView} />
      </Switch>
    </Router>
  );
};

export default Root;
