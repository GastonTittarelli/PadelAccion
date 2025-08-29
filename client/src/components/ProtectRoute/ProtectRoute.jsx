import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/authService';

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  // Si todo está bien, renderiza el elemento pasado como prop
  return element;
};

export default ProtectedRoute;
