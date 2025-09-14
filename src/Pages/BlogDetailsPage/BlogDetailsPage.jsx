import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogById, useAllBlogs, useAllBlogCategories, useBlogReviews, useCreateBlogReview, useUpdateBlogReview, useDeleteBlogReview } from "../../api/useBlogs";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // React Query hooks
  const { data: currentBlogData, isLoading, error } = useBlogById(id);
  const { data: blogsData } = useAllBlogs();
  const { data: categoriesData } = useAllBlogCategories();
  const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError } = useBlogReviews(id);
  
  // Extract data from responses
  const currentBlog = currentBlogData?.data;
  const blogs = blogsData?.data || [];
  const blogCategories = categoriesData?.data || [];
  const reviews = reviewsData?.data || [];
  
  // Review mutations
  const createReviewMutation = useCreateBlogReview();
  const updateReviewMutation = useUpdateBlogReview();
  const deleteReviewMutation = useDeleteBlogReview();
  
  // Local state for review form
  const [reviewsSuccess, setReviewsSuccess] = useState(false);

  // Format date with month name
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Handle back to blogs
  const handleBackToBlogs = () => {
    navigate("/blog");
  };

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/blog?category=${categoryId}`);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Handle review submission
  const handleReviewSubmit = (reviewData) => {
    createReviewMutation.mutate(
      { blogId: id, reviewData },
      {
        onSuccess: () => {
          setReviewsSuccess(true);
          setTimeout(() => setReviewsSuccess(false), 3000);
        },
      }
    );
  };

  // Handle review edit
  const handleReviewEdit = (review) => {
    // You can implement edit functionality here
    console.log("Edit review:", review);
  };

  // Handle review delete
  const handleReviewDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(reviewId, {
        onSuccess: () => {
          setReviewsSuccess(true);
          setTimeout(() => setReviewsSuccess(false), 3000);
        },
      });
    }
  };

  // Get top 5 categories with blog counts
  const getTopCategories = () => {
    const categoryCounts = {};
    
    // Count blogs per category
    blogs.forEach((blog) => {
      if (blog.category) {
        categoryCounts[blog.category] = (categoryCounts[blog.category] || 0) + 1;
      }
    });

    // Get category details and sort by count
    const categoriesWithCounts = blogCategories
      .map((category) => ({
        ...category,
        count: categoryCounts[category._id] || 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return categoriesWithCounts;
  };

  // Get recent posts (excluding current blog)
  const recentPosts = blogs.filter((blog) => blog._id !== id).slice(0, 5);

  // Show loading state
  if (isLoading) {
    return (
      <div>
        <PageHeader title="Blog Details" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB0029] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div>
        <PageHeader title="Blog Details" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">Blog Not Found</div>
            <p className="text-gray-600 mb-6">
              The blog you're looking for doesn't exist.
            </p>
            <button
              onClick={handleBackToBlogs}
              className="bg-[#EB0029] text-white px-6 py-2 rounded-lg hover:bg-[#D10024] transition-colors duration-200"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const topCategories = getTopCategories();

  return (
    <div>
      <PageHeader title="Blog Details" />

      <div className="container mx-auto px-4 py-8">
        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Content */}
          <article className="lg:col-span-2">
            {/* Hero Section */}
            <div className="relative mb-8 group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={currentBlog.image}
                  alt={currentBlog.title}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Category Badge with Animation */}
              <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
                <span className="bg-[#EB0029]/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/20">
                  {blogCategories.find(
                    (cat) => cat._id === currentBlog.category
                  )?.name || "Food & Culture"}
                </span>
              </div>

              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors duration-200 shadow-lg hover:scale-110 transform">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors duration-200 shadow-lg hover:scale-110 transform">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Blog Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight hover:text-[#EB0029] transition-colors duration-300">
                {currentBlog.title}
              </h1>
              
              {/* Quote with Enhanced Styling */}
              {currentBlog.quote && (
                <blockquote className="border-l-4 border-[#EB0029] pl-6 py-6 mb-8 bg-gradient-to-r from-gray-50 to-white rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <p className="text-xl text-gray-700 italic leading-relaxed">
                    "{currentBlog.quote}"
                  </p>
                </blockquote>
              )}

              {/* Enhanced Meta Information */}
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 group/author">
                    <div className="p-2 rounded-full bg-purple-100 group-hover/author:bg-purple-200 transition-colors duration-200">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium group-hover/author:text-purple-600 transition-colors duration-200">
                      {currentBlog.author?.name || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 group/date">
                    <div className="p-2 rounded-full bg-green-100 group-hover/date:bg-green-200 transition-colors duration-200">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/date:text-green-600 transition-colors duration-200">
                      {formatDate(currentBlog.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 group/read">
                    <div className="p-2 rounded-full bg-blue-100 group-hover/read:bg-blue-200 transition-colors duration-200">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.414L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/read:text-blue-600 transition-colors duration-200">
                      5 min read
                    </span>
                  </div>
                </div>
                
                {/* Enhanced Engagement Stats */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 group/likes">
                    <div className="p-2 rounded-full bg-red-100 group-hover/likes:bg-red-200 transition-transform duration-200">
                      <svg className="w-5 h-5 text-red-500 group-hover/likes:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/likes:text-red-600 transition-colors duration-200 font-medium">
                      {currentBlog.likes || 0} likes
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 group/comments">
                    <div className="p-2 rounded-full bg-blue-100 group-hover/comments:bg-blue-200 transition-transform duration-200">
                      <svg className="w-5 h-5 text-blue-500 group-hover/comments:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/comments:text-blue-600 transition-colors duration-200 font-medium">
                      {reviews.length} reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Description */}
              {currentBlog.description && (
                <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 border-[#EB0029]">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {currentBlog.description}
                  </p>
                </div>
              )}
            </header>

            {/* Blog Content Sections */}
            {currentBlog.content && currentBlog.content.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentBlog.content.map((section, index) => (
                  <section key={section._id || index} className="group">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-[#EB0029] transition-colors duration-300">
                      {section.heading}
                    </h2>
                    
                    {section.image && (
                      <div className="mb-6 overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={section.image}
                          alt={section.heading}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {section.description}
                      </p>
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Enhanced Action Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center">
                <button className="flex items-center space-x-2 bg-[#EB0029] text-white px-6 py-3 rounded-lg hover:bg-[#D10024] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>Like</span>
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-[#EB0029]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Reviews ({reviews.length})
                </h2>
                <p className="text-gray-600">
                  Share your thoughts about this blog post
                </p>
              </div>

              {/* Review Form */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const rating = parseInt(formData.get('rating'));
                  const comment = formData.get('comment');
                  
                  if (rating && comment) {
                    handleReviewSubmit({ rating, comment });
                    e.target.reset();
                  }
                }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <select name="rating" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB0029] focus:border-transparent">
                      <option value="">Select rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                    <textarea 
                      name="comment" 
                      rows="4" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB0029] focus:border-transparent"
                      placeholder="Share your thoughts..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={createReviewMutation.isLoading}
                    className="bg-[#EB0029] text-white px-4 py-2 rounded-lg hover:bg-[#D10024] transition-colors duration-200 disabled:opacity-50"
                  >
                    {createReviewMutation.isLoading ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>

              {/* Success/Error Messages */}
              {reviewsSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-800">Review submitted successfully!</p>
                  </div>
                </div>
              )}

              {reviewsError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-800">
                      {reviewsError?.response?.data?.message || reviewsError?.message || "Failed to fetch reviews"}
                    </p>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No reviews yet. Be the first to review this blog!</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="p-4 bg-white rounded-lg border">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {review.user?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{review.user?.name || 'Anonymous'}</p>
                          <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </article>

          {/* Enhanced Sidebar */}
          <aside className="space-y-6">
            {/* Enhanced Search Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#EB0029]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Search
              </h3>
              <form onSubmit={handleSearch} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB0029] focus:border-transparent transition-all duration-200"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <button type="submit" className="w-full bg-[#EB0029] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#D10024] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Search
                </button>
              </form>
            </div>

            {/* Enhanced Categories Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#EB0029]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Top Categories
              </h3>
              <div className="space-y-1">
                {topCategories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <span className="text-gray-700 group-hover:text-[#EB0029] transition-colors duration-200 font-medium">
                      {category.name}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium group-hover:bg-[#EB0029] group-hover:text-white transition-all duration-200">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Recent Posts Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#EB0029]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Recent Posts
              </h3>
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => navigate(`/blog-details/${post._id}`)}
                    className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 group-hover:text-[#EB0029] transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
