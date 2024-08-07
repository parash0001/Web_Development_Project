import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Dashboard/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If the user does not have the required role, redirect accordingly
    return <Navigate to="/" />;
  }

  // If the user is authenticated and has the required role, render the children components
  return children;
};

export default ProtectedRoute;
