import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading, isInitialized } = useContext(AuthContext);
  const location = useLocation();

  // Show loading spinner while checking authentication or during initialization
  if (loading && !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D1A054] mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0) {
    // Normalize role to lowercase to match backend enum
    const normalizedUserRole = (user.role || "customer").toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
    
    if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
      // Redirect to appropriate dashboard based on user role
      const roleRoutes = {
        admin: '/dashboard/admin',
        chef: '/dashboard/chef',
        customer: '/dashboard/customer'
      };
      
      const redirectPath = roleRoutes[normalizedUserRole] || '/dashboard/customer';
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 