import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./axios";

// Fetch all blogs
export const useAllBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await api.get("/blogs");
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (cacheTime renamed to gcTime in v5)
  });
};

// Fetch blog by ID
export const useBlogById = (blogId) => {
  return useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const { data } = await api.get(`/blogs/${blogId}`);
      return data;
    },
    enabled: !!blogId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch blogs by category
export const useBlogsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["blogs", "category", categoryId],
    queryFn: async () => {
      const { data } = await api.get(`/blogs/category/${categoryId}`);
      return data;
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch all blog categories
export const useAllBlogCategories = () => {
  return useQuery({
    queryKey: ["blogCategories"],
    queryFn: async () => {
      const { data } = await api.get("/blog-categories");
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
};

// Fetch blog reviews
export const useBlogReviews = (blogId) => {
  return useQuery({
    queryKey: ["blogReviews", blogId],
    queryFn: async () => {
      const { data } = await api.get(`/blog-reviews/${blogId}`);
      return data;
    },
    enabled: !!blogId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create blog review
export const useCreateBlogReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ blogId, reviewData }) => api.post(`/blog-reviews/${blogId}`, reviewData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch reviews for the specific blog
      qc.invalidateQueries({ queryKey: ["blogReviews", variables.blogId] });
      // Also invalidate the blog data to refresh review count
      qc.invalidateQueries({ queryKey: ["blog", variables.blogId] });
    },
  });
};

// Update blog review
export const useUpdateBlogReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, reviewData }) => api.put(`/blog-reviews/${reviewId}`, reviewData),
    onSuccess: (data, variables) => {
      // Invalidate all blog reviews queries to refresh the data
      qc.invalidateQueries({ queryKey: ["blogReviews"] });
    },
  });
};

// Delete blog review
export const useDeleteBlogReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (reviewId) => api.delete(`/blog-reviews/${reviewId}`),
    onSuccess: (data, variables) => {
      // Invalidate all blog reviews queries to refresh the data
      qc.invalidateQueries({ queryKey: ["blogReviews"] });
    },
  });
};

// Search blogs
export const useSearchBlogs = (searchTerm) => {
  return useQuery({
    queryKey: ["blogs", "search", searchTerm],
    queryFn: async () => {
      const { data } = await api.get(`/blogs/search?q=${encodeURIComponent(searchTerm)}`);
      return data;
    },
    enabled: !!searchTerm && searchTerm.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
