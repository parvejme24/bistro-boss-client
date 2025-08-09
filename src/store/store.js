import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';
import authReducer from './slices/authSlice';
import blogCategoryReducer from './slices/blogCategorySlice';
import blogReviewReducer from './slices/blogReviewSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    blogCategory: blogCategoryReducer,
    blogReview: blogReviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 