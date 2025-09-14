import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAllBlogs } from "../../api/useBlogs";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";

// BlogCard Component
const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

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

  const handleReadArticle = () => {
    navigate(`/blog-details/${blog._id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    handleReadArticle();
  };

  return (
    <div 
      onClick={handleReadArticle} 
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100 relative"
    >
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      
      {/* Hero Image */}
      <div className="relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-lg hover:scale-110 transform">
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-lg hover:scale-110 transform">
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Animated Title Underline */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#FC791A] transition-colors duration-300 relative">
          {blog.title}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FC791A] group-hover:w-full transition-all duration-500"></span>
        </h3>
        
        {/* Color-coded Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 group/author">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center group-hover/author:scale-110 transition-transform duration-200">
                <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="group-hover/author:text-purple-600 transition-colors duration-200">
                {blog.author?.name || "Anonymous"}
              </span>
            </div>
            <div className="flex items-center space-x-2 group/date">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover/date:scale-110 transition-transform duration-200">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="group-hover/date:text-green-600 transition-colors duration-200">
                {formatDate(blog.createdAt)}
              </span>
            </div>
          </div>
          
          {/* Engagement Stats */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 group/likes">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center group-hover/likes:scale-110 transition-transform duration-200">
                <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs group-hover/likes:text-red-600 transition-colors duration-200">
                {blog.likes || 0}
              </span>
            </div>
            <div className="flex items-center space-x-1 group/comments">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center group-hover/comments:scale-110 transition-transform duration-200">
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs group-hover/comments:text-blue-600 transition-colors duration-200">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
          {blog.description}
        </p>

        {/* Enhanced Button with Shine Effect */}
        <button 
          onClick={handleButtonClick}
          className="w-full bg-[#EB0029] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#D10024] transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/btn"
        >
          <span className="relative z-10">Read Article</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>
    </div>
  );
};

// BlogCardSkeleton Component
const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
        
        {/* Meta Info Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  // React Query hooks
  const { data: blogsData, isLoading, error } = useAllBlogs();
  const blogs = blogsData?.data || [];

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <PageHeader title="Blog" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs by title, description, or author..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-6 py-4 pl-14 pr-20 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#EB0029]/20 focus:border-[#EB0029] transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#EB0029] text-white px-6 py-2 rounded-xl hover:bg-[#D10024] transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
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

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-800">
              {error?.response?.data?.message || error?.message || "Failed to fetch blogs"}
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }, (_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {!isLoading && (
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
        {!isLoading && filteredBlogs.length === 0 && (
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
