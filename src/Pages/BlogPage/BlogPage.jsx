import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlogs } from "../../hooks/useBlogs";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import BlogCard from "../../Components/BlogCard/BlogCard";
import BlogCardSkeleton from "../../Components/BlogCardSkeleton/BlogCardSkeleton";

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  // Debug logging
  console.log("BlogPage State:", {
    blogs,
    loading,
    error,
    success,
    useMockData,
    searchTerm,
  });

  useEffect(() => {
    console.log("BlogPage: Fetching blogs...");
    // Fetch all blogs when component mounts
    getAllBlogs();

    // Clean up success message when component unmounts
    return () => {
      clearBlogSuccess();
    };
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => {
        clearBlogError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearBlogError]);

  // Filter blogs based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [blogs, searchTerm]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ search: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setSearchParams({});
    }
  };

  // Calculate pagination for filtered blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div>
      <PageHeader title="Our Blog" />

      <div className="container mx-auto pb-8">
        {/* Search Section */}
        <div className="mt-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs by title, description, or author..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 pl-12 pr-20 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EB0029] focus:border-transparent transition-all duration-200 text-lg"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#EB0029] text-white px-4 py-2 rounded-lg hover:bg-[#D10024] transition-colors duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
            
            {/* Search Results Info */}
            {searchTerm && (
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  {filteredBlogs.length === 0 
                    ? `No results found for "${searchTerm}"`
                    : `Found ${filteredBlogs.length} result${filteredBlogs.length === 1 ? '' : 's'} for "${searchTerm}"`
                  }
                </p>
                {filteredBlogs.length > 0 && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSearchParams({});
                    }}
                    className="mt-2 text-[#EB0029] hover:text-[#D10024] transition-colors duration-200 underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }, (_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? "bg-[#EB0029] text-white shadow-lg"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:border-[#EB0029]"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}

        {/* No blogs message */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              {searchTerm ? `No blogs found matching "${searchTerm}"` : "No blogs found."}
            </p>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSearchParams({});
                }}
                className="mt-4 text-[#EB0029] hover:text-[#D10024] transition-colors duration-200 underline"
              >
                View all blogs
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
