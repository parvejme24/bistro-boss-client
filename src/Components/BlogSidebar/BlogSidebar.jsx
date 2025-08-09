import React from "react";
import { useNavigate } from "react-router-dom";
import { getOptimizedImageUrl, handleImageError } from "../../utils/imageUtils";

const BlogSidebar = ({ 
  searchTerm, 
  setSearchTerm, 
  handleSearch, 
  topCategories, 
  handleCategoryClick, 
  recentPosts, 
  formatDate 
}) => {
  const navigate = useNavigate();

  return (
    <aside className="space-y-6">
      {/* Enhanced Search Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-[#EB0029]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
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
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="w-full bg-[#EB0029] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#D10024] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Search
          </button>
        </form>
      </div>

      {/* Enhanced Categories Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-[#EB0029]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
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
          <svg
            className="w-5 h-5 mr-2 text-[#EB0029]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
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
                  src={getOptimizedImageUrl(post.image)}
                  alt={post.title}
                  className="w-16 h-16 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={handleImageError}
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
  );
};

export default BlogSidebar;
