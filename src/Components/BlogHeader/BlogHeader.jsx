import React from "react";

const BlogHeader = ({ blog, reviews, formatDate }) => {
  return (
    <header className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight hover:text-[#EB0029] transition-colors duration-300">
        {blog.title}
      </h1>
      
      {/* Quote with Enhanced Styling */}
      {blog.quote && (
        <blockquote className="border-l-4 border-[#EB0029] pl-6 py-6 mb-8 bg-gradient-to-r from-gray-50 to-white rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <p className="text-xl text-gray-700 italic leading-relaxed">
            "{blog.quote}"
          </p>
        </blockquote>
      )}

      {/* Enhanced Meta Information */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-8 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 group/author">
            <div className="p-2 rounded-full bg-purple-100 group-hover/author:bg-purple-200 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-purple-600"
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
            <span className="font-medium group-hover/author:text-purple-600 transition-colors duration-200">
              {blog.author?.name || "Anonymous"}
            </span>
          </div>
          <div className="flex items-center space-x-2 group/date">
            <div className="p-2 rounded-full bg-green-100 group-hover/date:bg-green-200 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-green-600"
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
            <span className="group-hover/date:text-green-600 transition-colors duration-200">
              {formatDate(blog.createdAt)}
            </span>
          </div>
          <div className="flex items-center space-x-2 group/read">
            <div className="p-2 rounded-full bg-blue-100 group-hover/read:bg-blue-200 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.414L11 9.586V6z"
                  clipRule="evenodd"
                />
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
            <div className="p-2 rounded-full bg-red-100 group-hover/likes:bg-red-200 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-red-500 group-hover/likes:scale-110 transition-transform duration-200"
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
              {blog.likes || 0} likes
            </span>
          </div>
          <div className="flex items-center space-x-1 group/comments">
            <div className="p-2 rounded-full bg-blue-100 group-hover/comments:bg-blue-200 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-blue-500 group-hover/comments:scale-110 transition-transform duration-200"
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
              {reviews.length} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Description */}
      {blog.description && (
        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 border-[#EB0029]">
          <p className="text-lg text-gray-600 leading-relaxed">
            {blog.description}
          </p>
        </div>
      )}
    </header>
  );
};

export default BlogHeader;
