import { useMemo } from 'react';

export const useApi = () => {
  const BASE_URL = 'https://bistro-boss-server-tau-three.vercel.app/api/v1';

  const apiConfig = useMemo(() => ({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  }), []);

  const getAuthHeaders = (token) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  const createApiUrl = (endpoint) => {
    return `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  };

  return {
    BASE_URL,
    apiConfig,
    getAuthHeaders,
    createApiUrl,
  };
}; 