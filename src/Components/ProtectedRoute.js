import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to the default page if not authenticated
  }

  return <Outlet />; // Render the protected component if authenticated
};

export default ProtectedRoute;