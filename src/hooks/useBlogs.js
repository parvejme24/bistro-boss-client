import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllBlogs,
  fetchBlogById,
  fetchBlogsByCategory,
  fetchBlogsByAuthor,
  createBlog,
  updateBlog,
  deleteBlog,
  clearError,
  clearSuccess,
  clearCurrentBlog,
  clearBlogsByCategory,
  clearBlogsByAuthor,
  toggleMockData,
  setMockData,
} from '../store/slices/blogSlice';

export const useBlogs = () => {
  const dispatch = useDispatch();
  const {
    blogs,
    currentBlog,
    blogsByCategory,
    blogsByAuthor,
    loading,
    error,
    success,
    useMockData,
  } = useSelector((state) => state.blog);

  // Public actions (no authentication required)
  const getAllBlogs = () => dispatch(fetchAllBlogs());
  
  const getBlogById = (blogId) => dispatch(fetchBlogById(blogId));
  
  const getBlogsByCategory = (categoryId) => dispatch(fetchBlogsByCategory(categoryId));
  
  const getBlogsByAuthor = (authorId) => dispatch(fetchBlogsByAuthor(authorId));

  // Admin actions (require authentication)
  const addBlog = (blogData) => dispatch(createBlog(blogData));
  
  const editBlog = (blogId, blogData) => dispatch(updateBlog({ blogId, blogData }));
  
  const removeBlog = (blogId) => dispatch(deleteBlog(blogId));

  // Utility actions
  const clearBlogError = () => dispatch(clearError());
  const clearBlogSuccess = () => dispatch(clearSuccess());
  const clearBlog = () => dispatch(clearCurrentBlog());
  const clearCategoryBlogs = () => dispatch(clearBlogsByCategory());
  const clearAuthorBlogs = () => dispatch(clearBlogsByAuthor());
  
  // Mock data actions
  const toggleMockDataAction = () => dispatch(toggleMockData());
  const setMockDataAction = (value) => dispatch(setMockData(value));

  return {
    // State
    blogs,
    currentBlog,
    blogsByCategory,
    blogsByAuthor,
    loading,
    error,
    success,
    useMockData,
    
    // Public actions
    getAllBlogs,
    getBlogById,
    getBlogsByCategory,
    getBlogsByAuthor,
    
    // Admin actions
    addBlog,
    editBlog,
    removeBlog,
    
    // Utility actions
    clearBlogError,
    clearBlogSuccess,
    clearBlog,
    clearCategoryBlogs,
    clearAuthorBlogs,
    
    // Mock data actions
    toggleMockData: toggleMockDataAction,
    setMockData: setMockDataAction,
  };
}; 