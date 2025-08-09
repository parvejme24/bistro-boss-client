import React from "react";
import { useNavigate } from "react-router-dom";
import { handleImageError, getOptimizedImageUrl } from "../../utils/imageUtils";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Handle read article click
  const handleReadArticle = () => {
    navigate(`/blog-details/${blog._id}`);
  };

  // Handle button click (prevent event bubbling)
  const handleButtonClick = (e) => {
    e.stopPropagation();
    handleReadArticle();
  };

  return (
    <div 
      onClick={handleReadArticle}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100 relative"
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={getOptimizedImageUrl(blog.image)}
          alt={blog.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          onError={handleImageError}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-lg">
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-lg">
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#EB0029]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            Food & Culture
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Animated Underline for Title */}
        <div className="relative">
          <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#FC791A] transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h2>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FC791A] group-hover:w-full transition-all duration-500"></div>
        </div>

        {/* Description with Fade Effect */}
        {blog.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
            {blog.description}
          </p>
        )}

        {/* Interactive Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2 group/read">
            <div className="p-1 rounded-full bg-blue-50 group-hover/read:bg-blue-100 transition-colors duration-200">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="group-hover/read:text-blue-600 transition-colors duration-200">2 min read</span>
          </div>
          <div className="flex items-center space-x-1 group/date">
            <div className="p-1 rounded-full bg-green-50 group-hover/date:bg-green-100 transition-colors duration-200">
              <svg
                className="w-4 h-4 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="group-hover/date:text-green-600 transition-colors duration-200">{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {/* Enhanced Author and Engagement Section */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2 group/author">
            <div className="p-1 rounded-full bg-purple-50 group-hover/author:bg-purple-100 transition-colors duration-200">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="group-hover/author:text-purple-600 transition-colors duration-200 font-medium">
              {blog.author?.name || "Anonymous"}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 group/likes">
              <div className="p-1 rounded-full bg-red-50 group-hover/likes:bg-red-100 transition-colors duration-200">
                <svg
                  className="w-4 h-4 text-red-500 group-hover/likes:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="group-hover/likes:text-red-600 transition-colors duration-200 font-medium">
                {blog.likes || 0}
              </span>
            </div>
            <div className="flex items-center space-x-1 group/comments">
              <div className="p-1 rounded-full bg-blue-50 group-hover/comments:bg-blue-100 transition-colors duration-200">
                <svg
                  className="w-4 h-4 text-blue-500 group-hover/comments:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="group-hover/comments:text-blue-600 transition-colors duration-200 font-medium">
                {blog.comments || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Action Button */}
        <div className="mt-4 relative">
          <button 
            onClick={handleButtonClick}
            className="w-full bg-[#EB0029] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#D10024] transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Read Article</span>
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
