import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import jwt from 'jsonwebtoken';
import { signOut } from '../../actions';
import { routes } from '../routes';

function ProtectedRoute({ component: Component, ...children }) {
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem('jwtToken');
  const user = jwt.decode(isAuthenticated);
  if (!!isAuthenticated === true) {
    return <Route {...children} render={(props) => <Component {...props} user={user} />} />;
  }
  return <Redirect to={routes.login} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.element, PropTypes.elementType]).isRequired,
};

export default ProtectedRoute;
