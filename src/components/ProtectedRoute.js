import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Protected route for authenticated users
export function ProtectedRoute({ children, requireAuth = true, allowedRoles = [] }) {
  const { currentUser, userRole } = useAuth();
  const location = useLocation();

  // If authentication is required but user is not logged in
  if (requireAuth && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required but user doesn't have the role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in but trying to access login page, redirect to home
  if (currentUser && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Route that's only accessible when NOT authenticated
export function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
} 