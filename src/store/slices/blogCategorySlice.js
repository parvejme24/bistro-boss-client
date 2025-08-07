import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://bistro-boss-server-tau-three.vercel.app/api/v1';

// Async thunks for blog category API calls
export const fetchAllBlogCategories = createAsyncThunk(
  'blogCategory/fetchAllBlogCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-categories`);
      return response.data.blogCategories || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blog categories');
    }
  }
);

export const fetchBlogCategoryById = createAsyncThunk(
  'blogCategory/fetchBlogCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-categories/${categoryId}`);
      return response.data.blogCategory || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blog category');
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  'blogCategory/createBlogCategory',
  async (categoryData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      const response = await axios.post(`${BASE_URL}/blog-categories`, categoryData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.blogCategory || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create blog category');
    }
  }
);

export const updateBlogCategory = createAsyncThunk(
  'blogCategory/updateBlogCategory',
  async ({ categoryId, categoryData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      const response = await axios.put(`${BASE_URL}/blog-categories/${categoryId}`, categoryData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.blogCategory || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update blog category');
    }
  }
);

export const deleteBlogCategory = createAsyncThunk(
  'blogCategory/deleteBlogCategory',
  async (categoryId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      await axios.delete(`${BASE_URL}/blog-categories/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete blog category');
    }
  }
);

const initialState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  success: false,
};

const blogCategorySlice = createSlice({
  name: 'blogCategory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchAllBlogCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.success = true;
      })
      .addCase(fetchAllBlogCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch category by ID
      .addCase(fetchBlogCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
        state.success = true;
      })
      .addCase(fetchBlogCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create category
      .addCase(createBlogCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
        state.success = true;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update category
      .addCase(updateBlogCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(category => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        if (state.currentCategory && state.currentCategory._id === action.payload._id) {
          state.currentCategory = action.payload;
        }
        state.success = true;
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete category
      .addCase(deleteBlogCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(category => category._id !== action.payload);
        if (state.currentCategory && state.currentCategory._id === action.payload) {
          state.currentCategory = null;
        }
        state.success = true;
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  clearCurrentCategory,
} = blogCategorySlice.actions;

export default blogCategorySlice.reducer; 