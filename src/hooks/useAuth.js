import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
  updateProfile,
  updatePassword,
  getAllUsers,
  updateUserRole,
  clearError,
  clearSuccess,
  setUser,
  clearUser,
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    user,
    users,
    loading,
    error,
    success,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  // Authentication actions
  const registerUser = (userData) => dispatch(register(userData));
  const loginUser = (credentials) => dispatch(login(credentials));
  const logoutUser = () => dispatch(logout());
  const refreshUserToken = () => dispatch(refreshToken());
  const getUserProfile = () => dispatch(getProfile());
  const updateUserProfile = (profileData) => dispatch(updateProfile(profileData));
  const updateUserPassword = (passwordData) => dispatch(updatePassword(passwordData));

  // Admin actions
  const getAllUsersList = () => dispatch(getAllUsers());
  const updateUserRoleAction = (userId, role) => dispatch(updateUserRole({ userId, role }));

  // Utility actions
  const clearAuthError = () => dispatch(clearError());
  const clearAuthSuccess = () => dispatch(clearSuccess());
  const setUserAction = (userData) => dispatch(setUser(userData));
  const clearUserAction = () => dispatch(clearUser());

  // Helper functions
  const isAdmin = () => user?.role === 'admin';
  const isChef = () => user?.role === 'chef';
  const isCustomer = () => user?.role === 'customer';

  return {
    // State
    user,
    users,
    loading,
    error,
    success,
    isAuthenticated,
    
    // Authentication actions
    registerUser,
    loginUser,
    logoutUser,
    refreshUserToken,
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
    
    // Admin actions
    getAllUsersList,
    updateUserRoleAction,
    
    // Utility actions
    clearAuthError,
    clearAuthSuccess,
    setUserAction,
    clearUserAction,
    
    // Helper functions
    isAdmin,
    isChef,
    isCustomer,
  };
}; 