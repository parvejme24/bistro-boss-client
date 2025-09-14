// Store tokens and user data in localStorage for persistence
const ACCESS_TOKEN_KEY = 'bistro_access_token';
const REFRESH_TOKEN_KEY = 'bistro_refresh_token';
const USER_DATA_KEY = 'bistro_user_data';

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

export const setUserData = (userData) => {
  if (userData) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const removeUserData = () => {
  localStorage.removeItem(USER_DATA_KEY);
};

export const clearAllTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};
