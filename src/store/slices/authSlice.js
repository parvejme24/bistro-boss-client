import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Configuration
const BASE_URL = 'https://bistro-boss-server-tau-three.vercel.app/api/v1';

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

// Helper function to extract token from response
const extractToken = (response) => {
  console.log('Response from backend:', response);
  console.log('Response data:', response.data);
  
  // Handle different possible token formats from backend
  const token = response.data.token || 
         response.data.accessToken || 
         response.data.access_token || 
         response.token || 
         response.accessToken || 
         response.access_token;
  
  console.log('Extracted token:', token);
  return token;
};

// Helper function to store token
const storeToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    return token;
  }
  return null;
};

// Helper function to get token
const getToken = (getState) => {
  const { auth } = getState();
  const token = auth?.user?.token || localStorage.getItem('token');
  console.log('Getting token:', token);
  console.log('Auth state:', auth);
  console.log('LocalStorage token:', localStorage.getItem('token'));
  return token;
};

// Async thunks for authentication
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Extract and store token if present
      const token = extractToken(response);
      if (token) {
        storeToken(token);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Extract and store token
      const token = extractToken(response);
      if (token) {
        storeToken(token);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getToken(getState);
      
      if (token) {
        await axios.post(`${BASE_URL}/logout`, {}, {
          headers: getAuthHeaders(token),
        });
      }
      
      // Clear localStorage
      localStorage.removeItem('token');
      return null;
    } catch (error) {
      // Even if logout fails, clear local storage
      localStorage.removeItem('token');
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/refresh-token`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const token = extractToken(response);
      if (token) {
        storeToken(token);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Token refresh failed');
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        return rejectWithValue('No token available');
      }
      
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to get profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        return rejectWithValue('No token available');
      }
      
      const response = await axios.put(`${BASE_URL}/profile`, profileData, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update profile');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData, { rejectWithValue, getState }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        return rejectWithValue('No token available');
      }
      
      const response = await axios.put(`${BASE_URL}/password`, passwordData, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update password');
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        return rejectWithValue('No token available');
      }
      
      const response = await axios.get(`${BASE_URL}/all`, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to get users');
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'auth/updateUserRole',
  async ({ userId, role }, { rejectWithValue, getState }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        return rejectWithValue('No token available');
      }
      
      const response = await axios.put(`${BASE_URL}/${userId}/role`, { role }, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update user role');
    }
  }
);

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        // Store user with token
        const userData = action.payload.user || action.payload;
        const token = action.payload.accessToken || action.payload.token || action.payload.access_token;
        state.user = { ...userData, token };
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        // Store user with token
        const userData = action.payload.user || action.payload;
        const token = action.payload.accessToken || action.payload.token || action.payload.access_token;
        state.user = { ...userData, token };
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.success = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        // Update user with new token
        const userData = action.payload.user || action.payload;
        const token = action.payload.accessToken || action.payload.token || action.payload.access_token;
        state.user = { ...userData, token };
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Update user data but keep existing token
        const userData = action.payload.user || action.payload;
        const existingToken = state.user?.token || localStorage.getItem('token');
        state.user = { ...userData, token: existingToken };
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Update user data but keep existing token
        const userData = action.payload.user || action.payload;
        const existingToken = state.user?.token || localStorage.getItem('token');
        state.user = { ...userData, token: existingToken };
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || action.payload;
        state.success = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user in the users array
        const index = state.users.findIndex(user => user._id === action.payload.user._id);
        if (index !== -1) {
          state.users[index] = action.payload.user;
        }
        state.success = true;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  setUser,
  clearUser,
} = authSlice.actions;

export default authSlice.reducer; 