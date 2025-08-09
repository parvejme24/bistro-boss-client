import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://bistro-boss-server-tau-three.vercel.app/api/v1';

// Async thunks for API calls
export const fetchBlogReviews = createAsyncThunk(
  'blogReview/fetchBlogReviews',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-reviews/${blogId}`);
      return response.data.reviews || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blog reviews');
    }
  }
);

export const createBlogReview = createAsyncThunk(
  'blogReview/createBlogReview',
  async ({ blogId, reviewData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      const response = await axios.post(`${BASE_URL}/blog-reviews`, {
        blog: blogId,
        ...reviewData
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.review || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create blog review');
    }
  }
);

export const updateBlogReview = createAsyncThunk(
  'blogReview/updateBlogReview',
  async ({ reviewId, reviewData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      const response = await axios.put(`${BASE_URL}/blog-reviews/${reviewId}`, reviewData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.review || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update blog review');
    }
  }
);

export const deleteBlogReview = createAsyncThunk(
  'blogReview/deleteBlogReview',
  async (reviewId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      await axios.delete(`${BASE_URL}/blog-reviews/${reviewId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete blog review');
    }
  }
);

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  success: false,
};

const blogReviewSlice = createSlice({
  name: 'blogReview',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blog reviews
      .addCase(fetchBlogReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.success = true;
      })
      .addCase(fetchBlogReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create blog review
      .addCase(createBlogReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload);
        state.success = true;
      })
      .addCase(createBlogReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update blog review
      .addCase(updateBlogReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex(review => review._id === action.payload._id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateBlogReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete blog review
      .addCase(deleteBlogReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(review => review._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteBlogReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  clearReviews,
} = blogReviewSlice.actions;

export default blogReviewSlice.reducer;
