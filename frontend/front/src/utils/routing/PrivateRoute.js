import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../../components/AuthPages/Login';
import VerificationRequest from '../../components/AuthPages/VerificationRequest';

const PrivateRoute = ({ component, ...options }) => {
  const isLoading = useSelector((state) => state.register.isLoading);
  const isAuthenticated = useSelector((state) => state.register.isAuthenticated);
  const isAuthorizedRedirect = useSelector(
    (state) => isAuthenticated && state.register.user && !state.register.emailVerified
  );
  let finalComponent = !isAuthenticated && !isLoading ? Login : component;
  finalComponent = isAuthorizedRedirect ? VerificationRequest : finalComponent;
  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
