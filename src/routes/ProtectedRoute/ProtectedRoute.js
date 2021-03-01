import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import jwt from 'jsonwebtoken';
import { routes } from '../routes';

function ProtectedRoute({ component: Component, ...children }) {
  const token = localStorage.getItem('jwtToken');
  const isAuthenticated = !!token;
  const decodedToken = jwt.decode(token);
  if (isAuthenticated) {
    return <Route {...children} render={(props) => <Component {...props} user={decodedToken} />} />;
  }
  return <Redirect to={routes.logout} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.element, PropTypes.elementType]).isRequired,
};

export default ProtectedRoute;
