import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading, isInitialized } = useContext(AuthContext);
  const location = useLocation();

  // Show loading spinner while checking authentication or during initialization
  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D1A054]"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const roleRoutes = {
      admin: '/dashboard/admin',
      chef: '/dashboard/chef',
      user: '/dashboard/user',
      customer: '/dashboard/user'
    };
    
    const redirectPath = roleRoutes[user.role] || '/dashboard/user';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute; 