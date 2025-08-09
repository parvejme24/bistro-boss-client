import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBlogReviews,
  createBlogReview,
  updateBlogReview,
  deleteBlogReview,
  clearError,
  clearSuccess
} from '../store/slices/blogReviewSlice';

export const useBlogReviews = (blogId) => {
  const dispatch = useDispatch();
  const { reviews, loading, error, success } = useSelector((state) => state.blogReview);

  // Fetch reviews for a specific blog
  const getBlogReviews = () => {
    if (blogId) {
      dispatch(fetchBlogReviews(blogId));
    }
  };

  // Create a new review
  const addReview = (reviewData) => {
    if (blogId) {
      dispatch(createBlogReview({ blogId, reviewData }));
    }
  };

  // Update an existing review
  const editReview = (reviewId, reviewData) => {
    dispatch(updateBlogReview({ reviewId, reviewData }));
  };

  // Delete a review
  const removeReview = (reviewId) => {
    dispatch(deleteBlogReview(reviewId));
  };

  // Clear error message
  const clearError = () => {
    dispatch(clearError());
  };

  // Clear success message
  const clearSuccess = () => {
    dispatch(clearSuccess());
  };

  // Auto-fetch reviews when blogId changes
  useEffect(() => {
    if (blogId) {
      getBlogReviews();
    }
  }, [blogId]);

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Auto-clear success after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return {
    reviews,
    loading,
    error,
    success,
    getBlogReviews,
    addReview,
    editReview,
    removeReview,
    clearError,
    clearSuccess,
  };
};
