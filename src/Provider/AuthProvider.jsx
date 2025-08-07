import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  register, 
  login, 
  logout, 
  getProfile, 
  clearError, 
  clearSuccess,
  setUser 
} from "../store/slices/authSlice";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { user, loading, error, success, isAuthenticated } = useSelector((state) => state.auth);
  const [localLoading, setLocalLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check for existing token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && !user) {
          // Try to get user profile with existing token
          await dispatch(getProfile()).unwrap();
        }
      } catch (error) {
        // If token is invalid, clear it
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [dispatch, user]);

  const createUser = async (userData) => {
    setLocalLoading(true);
    try {
      await dispatch(register(userData)).unwrap();
      // No need to return anything - Redux state is updated automatically
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLocalLoading(false);
    }
  };

  const signIn = async (credentials) => {
    setLocalLoading(true);
    try {
      await dispatch(login(credentials)).unwrap();
      // Redux state is updated automatically - no return needed
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    } finally {
      setLocalLoading(false);
    }
  };

  const logOut = async () => {
    setLocalLoading(true);
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLocalLoading(true);
    try {
      // You can implement password reset functionality here
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      throw new Error('Password reset failed');
    } finally {
      setLocalLoading(false);
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const clearAuthSuccess = () => {
    dispatch(clearSuccess());
  };

  const authInfo = {
    user,
    loading: loading || localLoading,
    error,
    success,
    isAuthenticated,
    isInitialized,
    createUser,
    signIn,
    logOut,
    resetPassword,
    clearAuthError,
    clearAuthSuccess,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
