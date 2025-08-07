import React, { useEffect } from "react";
import { useBlogs } from "../../hooks/useBlogs";
import { handleImageError, getOptimizedImageUrl } from "../../utils/imageUtils";

export default function BlogPage() {
  const {
    blogs,
    loading,
    error,
    success,
    useMockData,
    getAllBlogs,
    clearBlogError,
    clearBlogSuccess,
    toggleMockData,
    setMockData,
  } = useBlogs();

  // Debug logging
  console.log("BlogPage State:", {
    blogs,
    loading,
    error,
    success,
    useMockData,
  });

  useEffect(() => {
    console.log("BlogPage: Fetching blogs...");
    // Fetch all blogs when component mounts
    getAllBlogs();

    // Clean up success message when component unmounts
    return () => {
      clearBlogSuccess();
    };
  }, [getAllBlogs, clearBlogSuccess]);

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => {
        clearBlogError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearBlogError]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Blog</h1>

      {/* Debug Panel */}
      <div className="bg-gray-100 border border-gray-300 rounded p-4 mb-6">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <strong>Loading:</strong> {loading ? "Yes" : "No"}
          </div>
          <div>
            <strong>Error:</strong> {error ? "Yes" : "No"}
          </div>
          <div>
            <strong>Success:</strong> {success ? "Yes" : "No"}
          </div>
          <div>
            <strong>Blogs Count:</strong> {blogs?.length || 0}
          </div>
          <div>
            <strong>Mock Data:</strong> {useMockData ? "Enabled" : "Disabled"}
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setMockData(!useMockData)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            {useMockData ? "Disable" : "Enable"} Mock Data
          </button>
          <button
            onClick={() => getAllBlogs()}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
          >
            Refresh Blogs
          </button>
        </div>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Blogs loaded successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {blogs.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* <img
                src={getOptimizedImageUrl(blog.image)}
                alt={blog.title}
                className="w-full h-48 object-cover"
                onError={(e) => handleImageError(e, "blog")}
              /> */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {blog.description || blog.content?.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <div>By: {blog.author?.name || "Unknown"}</div>
                    <div>{new Date(blog.createdAt).toLocaleDateString()}</div>
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
