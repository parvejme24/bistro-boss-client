import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogById,
  clearCurrentBlog,
  clearError,
  fetchAllBlogs,
  fetchBlogsByCategory,
} from "../../store/slices/blogSlice";
import { fetchAllBlogCategories } from "../../store/slices/blogCategorySlice";
import { useBlogReviews } from "../../hooks/useBlogReviews";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import BlogReviewForm from "../../Components/BlogReviewForm/BlogReviewForm";
import BlogReviewList from "../../Components/BlogReviewList/BlogReviewList";
import BlogDetailsSkeleton from "../../Components/BlogDetailsSkeleton/BlogDetailsSkeleton";
import BlogHeroSection from "../../Components/BlogHeroSection/BlogHeroSection";
import BlogHeader from "../../Components/BlogHeader/BlogHeader";
import BlogContent from "../../Components/BlogContent/BlogContent";
import BlogSidebar from "../../Components/BlogSidebar/BlogSidebar";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { currentBlog, blogs, loading, error } = useSelector(
    (state) => state.blog
  );
  const { categories: blogCategories } = useSelector(
    (state) => state.blogCategory
  );
  const { user } = useSelector((state) => state.auth);

  // Blog reviews hook
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
    success: reviewsSuccess,
    addReview,
    editReview,
    removeReview,
    clearError: clearReviewError,
    clearSuccess: clearReviewSuccess,
  } = useBlogReviews(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }

    // Fetch all blogs for sidebar
    dispatch(fetchAllBlogs());

    // Fetch blog categories
    dispatch(fetchAllBlogCategories());

    // Cleanup function
    return () => {
      dispatch(clearCurrentBlog());
      dispatch(clearError());
    };
  }, [dispatch, id]);

  // Format date with month name
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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
    dispatch(fetchBlogsByCategory(categoryId));
    navigate("/blog");
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to blog page with search term
      navigate(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Handle review submission
  const handleReviewSubmit = (reviewData) => {
    addReview(reviewData);
  };

  // Handle review edit
  const handleReviewEdit = (review) => {
    // You can implement edit functionality here
    console.log("Edit review:", review);
  };

  // Handle review delete
  const handleReviewDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      removeReview(reviewId);
    }
  };

  // Get top 5 categories with blog counts
  const getTopCategories = () => {
    const categoryCounts = {};

    // Count blogs per category
    blogs.forEach((blog) => {
      if (blog.category) {
        categoryCounts[blog.category] =
          (categoryCounts[blog.category] || 0) + 1;
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

  // Show skeleton while loading
  if (loading) {
    return <BlogDetailsSkeleton />;
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
      <PageHeader title={"Blog Details"} />

      <div className="container mx-auto px-4 py-8">
        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Content */}
          <article className="lg:col-span-2">
            {/* Hero Section */}
            <BlogHeroSection blog={currentBlog} blogCategories={blogCategories} />

            {/* Blog Header */}
            <BlogHeader blog={currentBlog} reviews={reviews} formatDate={formatDate} />

            {/* Blog Content Sections */}
            <BlogContent content={currentBlog.content} />

            {/* Enhanced Action Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center">
                <button className="flex items-center space-x-2 bg-[#EB0029] text-white px-6 py-3 rounded-lg hover:bg-[#D10024] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Like</span>
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-[#EB0029]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reviews ({reviews.length})
                </h2>
                <p className="text-gray-600">
                  Share your thoughts about this blog post
                </p>
              </div>

              {/* Review Form */}
              <BlogReviewForm
                onSubmit={handleReviewSubmit}
                loading={reviewsLoading}
              />

              {/* Success/Error Messages */}
              {reviewsSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-green-800">
                      Review submitted successfully!
                    </p>
                  </div>
                </div>
              )}

              {reviewsError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-red-800">
                      {typeof reviewsError === "object"
                        ? reviewsError.message || "An error occurred"
                        : reviewsError}
                    </p>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <BlogReviewList
                reviews={reviews}
                loading={reviewsLoading}
                onEdit={handleReviewEdit}
                onDelete={handleReviewDelete}
                currentUserId={user?._id}
              />
            </div>
          </article>

          {/* Enhanced Sidebar */}
          <BlogSidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            topCategories={topCategories}
            handleCategoryClick={handleCategoryClick}
            recentPosts={recentPosts}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
}
