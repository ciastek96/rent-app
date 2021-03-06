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
import ClientFormView from './ClientFormView';
import SettingsView from './SettingsView';
import ProductFormView from './ProductFormView';
import RentFormView from './RentFormView';
import RentsView from './RentsView';
import UpdatePasswordView from './UpdatePasswordView';
import { getClients, getProducts, getRents, getAccount, setCurrentUser } from '../actions';
import setAuthToken from '../utils/setAuthToken';
import ProtectedRoute from '../routes/ProtectedRoute/ProtectedRoute';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.jwtToken) {
      const user = jwt.decode(localStorage.jwtToken);
      setAuthToken(localStorage.jwtToken);
      dispatch(setCurrentUser(user));
      dispatch(getClients());
      dispatch(getProducts());
      dispatch(getRents());
      dispatch(getAccount());
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path={routes.login} component={LoginView} />
        <Route path={routes.register} component={LoginView} />
        <Route path={routes.logout} component={LoginView} />
        <ProtectedRoute exact path={routes.home} component={DashboardView} />
        <ProtectedRoute exact path={routes.products} component={ProductsView} />
        <ProtectedRoute path={routes.newProduct} component={ProductFormView} />
        <ProtectedRoute path={routes.product} component={ProductFormView} />
        <ProtectedRoute exact path={routes.clients} component={ClientsView} />
        <ProtectedRoute path={routes.newClient} component={ClientFormView} />
        <ProtectedRoute path={routes.client} component={ClientFormView} />
        <ProtectedRoute path={routes.newRent} component={RentFormView} />
        <ProtectedRoute exact path={routes.rents} component={RentsView} />
        <ProtectedRoute exact path={routes.rent} component={RentFormView} />
        <ProtectedRoute exact path={routes.settings} component={SettingsView} />
        <ProtectedRoute path={routes.updatePassword} component={UpdatePasswordView} />
        <ProtectedRoute path={routes.finances} component={HistoryView} />
        <ProtectedRoute path="*" component={NotFoundView} />
      </Switch>
    </Router>
  );
};

export default Root;
