import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    // redirect to login with state to return back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
