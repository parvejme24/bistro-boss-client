// src/api/axios.js
import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
} from "./authService";

const API_BASE = "https://bistro-boss-server-tau-three.vercel.app/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  // Remove withCredentials since we're using localStorage now
});

// attach access token to requests
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// response interceptor to try refresh on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (!originalRequest) return Promise.reject(err);

    const status = err.response ? err.response.status : null;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue the request until refresh finished
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // call refresh endpoint (using raw axios to avoid interceptor loop)
        const refreshResponse = await axios.post(
          `${API_BASE}/refresh-token`,
          { refreshToken: getRefreshToken() }, // send refresh token in body
          {} // no withCredentials needed
        );

        const newAccessToken = refreshResponse.data.accessToken;
        setAccessToken(newAccessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        isRefreshing = false;
        removeAccessToken();
        
        // Don't log 401 errors as they're expected when not logged in
        if (refreshErr.response?.status !== 401) {
          console.error("Token refresh failed:", refreshErr);
        }
        
        // optionally redirect to login here
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
