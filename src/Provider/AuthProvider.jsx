// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { setAccessToken, setRefreshToken, setUserData, removeAccessToken, removeRefreshToken, removeUserData, clearAllTokens, getAccessToken, getRefreshToken, getUserData } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();

  // On mount try to rehydrate from stored tokens and fetch user profile
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        
        // First try to get user data from localStorage
        const storedUserData = getUserData();
        const storedAccessToken = getAccessToken();
        const storedRefreshToken = getRefreshToken();
        
        // If we have stored user data and tokens, set user immediately
        if (storedUserData && storedAccessToken && storedRefreshToken) {
          // Normalize stored user role to lowercase
          const normalizedStoredUserData = {
            ...storedUserData,
            role: (storedUserData.role || "customer").toLowerCase()
          };
          setUser(normalizedStoredUserData);
          
          // Set loading to false immediately for better UX
          setLoading(false);
          
          // Don't make profile API call immediately to avoid 403 errors
          // User can still use the stored data, and profile will be fetched when needed
          
          return; // Exit early since we have stored data
        }
        
        // If no stored data but we have tokens, try to fetch profile
        if (storedAccessToken && storedRefreshToken) {
          // Don't make profile API call immediately to avoid 403 errors
          // User will need to log in again or refresh tokens when needed
          setLoading(false);
          return;
        }
      } catch (err) {
        // not logged in - this is normal, don't log as error
        if (err.response?.status !== 401) {
          console.error("Auth initialization error:", err);
        }
        clearAllTokens();
        setUser(null);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };
    
    init();
  }, []);

  // Periodic user data refresh (every 5 minutes) - Commented out to prevent 403 errors
  // useEffect(() => {
  //   if (!user || !getAccessToken()) return;

  //   const interval = setInterval(async () => {
  //     try {
  //       const profileRes = await api.get("/profile");
  //       const freshUserData = profileRes.data.user;
        
  //       // Normalize user role to lowercase to match backend enum
  //       const normalizedUserData = {
  //         ...freshUserData,
  //         role: (freshUserData.role || "customer").toLowerCase()
  //       };
        
  //       setUser(normalizedUserData);
  //       setUserData(normalizedUserData);
  //     } catch (error) {
  //       if (error.response?.status === 401) {
  //         // Token expired, try to refresh
  //         await handleTokenExpiration();
  //       }
  //     }
  //   }, 5 * 60 * 1000); // 5 minutes

  //   return () => clearInterval(interval);
  // }, [user]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const res = await api.post("/login", credentials);
      
      const { accessToken, refreshToken, user: userData } = res.data;
      
      // Store tokens in localStorage
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      
      // Normalize user role to lowercase to match backend enum
      const normalizedUserData = {
        ...userData,
        role: (userData.role || "customer").toLowerCase()
      };
      
      // Set user data
      setUser(normalizedUserData);
      setUserData(normalizedUserData); // Store in localStorage
      
      // Invalidate react-query caches if needed
      queryClient.invalidateQueries();
      return res;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh user profile data
  const refreshUserProfile = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setUser(null);
        return;
      }

      const profileRes = await api.get("/profile");
      const freshUserData = profileRes.data.user;
      
      // Normalize user role to lowercase to match backend enum
      const normalizedUserData = {
        ...freshUserData,
        role: (freshUserData.role || "customer").toLowerCase()
      };
      
      setUser(normalizedUserData);
      setUserData(normalizedUserData); // Store in localStorage
    } catch (error) {
      if (error.response?.status === 401) {
        // Token expired, try to refresh
        try {
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            const refreshRes = await api.post("/refresh-token", {
              refreshToken: refreshToken
            });
            
            const { accessToken: newAccessToken } = refreshRes.data;
            setAccessToken(newAccessToken);
            
            // Fetch profile with new token
            const profileRes = await api.get("/profile");
            const freshUserData = profileRes.data.user;
            
            // Normalize user role to lowercase to match backend enum
            const normalizedUserData = {
              ...freshUserData,
              role: (freshUserData.role || "customer").toLowerCase()
            };
            
            setUser(normalizedUserData);
            setUserData(normalizedUserData); // Store in localStorage
          } else {
            clearAllTokens();
            setUser(null);
          }
        } catch (refreshError) {
          clearAllTokens();
          setUser(null);
        }
      } else {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  const register = async (payload) => {
    try {
      setLoading(true);
      const res = await api.post("/register", payload);
      
      // If registration returns tokens, store them
      if (res.data.accessToken && res.data.refreshToken) {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        
        // Normalize user role to lowercase to match backend enum
        const normalizedUserData = {
          ...res.data.user,
          role: (res.data.user.role || "customer").toLowerCase()
        };
        
        setUser(normalizedUserData);
        setUserData(normalizedUserData); // Store in localStorage
      }
      
      return res;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Get refresh token for logout
      const refreshToken = getRefreshToken();
      
      if (refreshToken) {
        await api.post("/logout", { refreshToken });
      }
      
      // Clear all tokens and user data
      clearAllTokens();
      setUser(null);
      queryClient.clear();
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local data
      clearAllTokens();
      setUser(null);
      queryClient.clear();
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!user && !!getAccessToken();

  // Function to handle token expiration
  const handleTokenExpiration = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        const refreshRes = await api.post("/refresh-token", {
          refreshToken: refreshToken
        });
        
        const { accessToken: newAccessToken } = refreshRes.data;
        setAccessToken(newAccessToken);
        
        // Fetch fresh user profile
        const profileRes = await api.get("/profile");
        const freshUserData = profileRes.data.user;
        
        // Normalize user role to lowercase to match backend enum
        const normalizedUserData = {
          ...freshUserData,
          role: (freshUserData.role || "customer").toLowerCase()
        };
        
        setUser(normalizedUserData);
        setUserData(normalizedUserData);
        
        return true;
      }
    } catch (error) {
      clearAllTokens();
      setUser(null);
      return false;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      register, 
      loading, 
      isInitialized,
      refreshUserProfile,
      isAuthenticated,
      handleTokenExpiration
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
