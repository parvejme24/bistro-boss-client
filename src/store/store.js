import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';
import authReducer from './slices/authSlice';
import blogCategoryReducer from './slices/blogCategorySlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    blogCategory: blogCategoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 