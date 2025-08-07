import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://bistro-boss-server-tau-three.vercel.app/api/v1';

// Mock data for testing when API is down
const mockBlogs = [
  {
    "_id": "6892b02a9685019990f6a646",
    "title": "The Spice Routes: How Global Trade Shaped Modern Cuisine",
    "category": "6892aea3170e41d2f1419b90",
    "description": "Journey through history to discover how ancient spice routes influenced culinary traditions and created the diverse flavors we enjoy today.",
    "image": "placeholder",
    "quote": "Every spice tells a story of adventure, discovery, and the human desire to explore new flavors.",
    "content": [
      {
        "heading": "The Silk Road's Culinary Legacy",
        "description": "Explore how the ancient Silk Road connected East and West, bringing spices like cinnamon, cardamom, and black pepper to European kitchens and forever changing their culinary landscape.",
        "image": "placeholder",
        "_id": "6892b02a9685019990f6a647"
      }
    ],
    "author": {
      "_id": "68928b4135daeb8e1a9dd3e8",
      "name": "Md Emon"
    },
    "createdAt": "2025-08-06T01:30:18.237Z",
    "updatedAt": "2025-08-06T01:30:18.237Z"
  },
  {
    "_id": "6892b0239685019990f6a63c",
    "title": "The Art of Italian Pasta Making: From Dough to Dish",
    "category": "6892aeb3170e41d2f1419b9c",
    "description": "Explore the traditional methods of making authentic Italian pasta from scratch, including different shapes, sauces, and regional variations.",
    "image": "placeholder",
    "quote": "Pasta is not just food; it's a celebration of Italian culture, tradition, and the simple joy of sharing a meal.",
    "content": [
      {
        "heading": "The Perfect Dough",
        "description": "Learn the traditional 00 flour and egg ratio, proper kneading techniques, and the importance of resting the dough. The texture should be smooth, elastic, and slightly tacky.",
        "image": "placeholder",
        "_id": "6892b0239685019990f6a63d"
      }
    ],
    "author": {
      "_id": "68928b4135daeb8e1a9dd3e8",
      "name": "Md Emon"
    },
    "createdAt": "2025-08-06T01:30:11.591Z",
    "updatedAt": "2025-08-06T01:30:11.591Z"
  }
];

// Async thunks for API calls
export const fetchAllBlogs = createAsyncThunk(
  'blog/fetchAllBlogs',
  async (_, { rejectWithValue, getState }) => {
    const { blog } = getState();
    
    // If mock data is enabled, return mock data immediately
    if (blog.useMockData) {
      console.log('Using mock data (enabled)');
      return mockBlogs;
    }
    
    try {
      console.log('Fetching blogs from:', `${BASE_URL}/blogs`);
      const response = await axios.get(`${BASE_URL}/blogs`);
      console.log('API Response:', response.data);
      
      // Check if the response has an error message
      if (response.data.message && response.data.message.includes('Failed')) {
        console.log('API returned error, using mock data as fallback');
        return mockBlogs; // Use mock data as fallback
      }
      
      // Handle both response formats
      const blogs = response.data.blogs || response.data;
      console.log('Extracted blogs:', blogs);
      return blogs;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      console.log('Using mock data as fallback due to API error');
      return mockBlogs; // Use mock data as fallback instead of rejecting
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs/${blogId}`);
      return response.data.blog || response.data; // Handle both formats
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blog');
    }
  }
);

export const fetchBlogsByCategory = createAsyncThunk(
  'blog/fetchBlogsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs/category/${categoryId}`);
      return response.data.blogs || response.data; // Handle both formats
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blogs by category');
    }
  }
);

export const fetchBlogsByAuthor = createAsyncThunk(
  'blog/fetchBlogsByAuthor',
  async (authorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs/author/${authorId}`);
      return response.data.blogs || response.data; // Handle both formats
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blogs by author');
    }
  }
);

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      const response = await axios.post(`${BASE_URL}/blogs`, blogData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.blog || response.data; // Handle both formats
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create blog');
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ blogId, blogData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      const response = await axios.put(`${BASE_URL}/blogs/${blogId}`, blogData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.blog || response.data; // Handle both formats
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update blog');
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (blogId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token || localStorage.getItem('token');
      
      await axios.delete(`${BASE_URL}/blogs/${blogId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return blogId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete blog');
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
  blogsByCategory: [],
  blogsByAuthor: [],
  loading: false,
  error: null,
  success: false,
  useMockData: false, // Toggle for using mock data
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    clearBlogsByCategory: (state) => {
      state.blogsByCategory = [];
    },
    clearBlogsByAuthor: (state) => {
      state.blogsByAuthor = [];
    },
    toggleMockData: (state) => {
      state.useMockData = !state.useMockData;
    },
    setMockData: (state, action) => {
      state.useMockData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.success = true;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch blog by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
        state.success = true;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch blogs by category
      .addCase(fetchBlogsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.blogsByCategory = action.payload;
        state.success = true;
      })
      .addCase(fetchBlogsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch blogs by author
      .addCase(fetchBlogsByAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsByAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.blogsByAuthor = action.payload;
        state.success = true;
      })
      .addCase(fetchBlogsByAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        if (state.currentBlog && state.currentBlog._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
        state.success = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
        if (state.currentBlog && state.currentBlog._id === action.payload) {
          state.currentBlog = null;
        }
        state.success = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  clearCurrentBlog,
  clearBlogsByCategory,
  clearBlogsByAuthor,
  toggleMockData,
  setMockData,
} = blogSlice.actions;

export default blogSlice.reducer; 