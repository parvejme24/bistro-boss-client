import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllBlogCategories,
  fetchBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  clearError,
  clearSuccess,
  clearCurrentCategory,
} from '../store/slices/blogCategorySlice';

export const useBlogCategories = () => {
  const dispatch = useDispatch();
  const {
    categories,
    currentCategory,
    loading,
    error,
    success,
  } = useSelector((state) => state.blogCategory);

  // Public actions (no authentication required)
  const getAllCategories = () => dispatch(fetchAllBlogCategories());
  const getCategoryById = (categoryId) => dispatch(fetchBlogCategoryById(categoryId));

  // Admin actions (require authentication)
  const addCategory = (categoryData) => dispatch(createBlogCategory(categoryData));
  const editCategory = (categoryId, categoryData) => dispatch(updateBlogCategory({ categoryId, categoryData }));
  const removeCategory = (categoryId) => dispatch(deleteBlogCategory(categoryId));

  // Utility actions
  const clearCategoryError = () => dispatch(clearError());
  const clearCategorySuccess = () => dispatch(clearSuccess());
  const clearCategory = () => dispatch(clearCurrentCategory());

  return {
    // State
    categories,
    currentCategory,
    loading,
    error,
    success,
    
    // Public actions
    getAllCategories,
    getCategoryById,
    
    // Admin actions
    addCategory,
    editCategory,
    removeCategory,
    
    // Utility actions
    clearCategoryError,
    clearCategorySuccess,
    clearCategory,
  };
}; 