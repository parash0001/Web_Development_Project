import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../Dashboard/AuthContext';

const LoginRedirect = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (isAuthenticated) {
    if (userRole === 'Admin') {
      return <Navigate to="/dashboard" />;
    } else if (userRole === 'Staff') {
      return <Navigate to="/staff" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default LoginRedirect;
