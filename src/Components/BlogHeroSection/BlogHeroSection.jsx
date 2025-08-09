import React from "react";
import { getOptimizedImageUrl, handleImageError } from "../../utils/imageUtils";

const BlogHeroSection = ({ blog, blogCategories }) => {
  return (
    <div className="relative mb-8 group">
      <div className="overflow-hidden rounded-xl shadow-2xl">
        <img
          src={getOptimizedImageUrl(blog.image)}
          alt={blog.title}
          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
          onError={handleImageError}
        />
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      {/* Category Badge with Animation */}
      <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
        <span className="bg-[#EB0029]/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/20">
          {blogCategories.find(
            (cat) => cat._id === blog.category
          )?.name || "Food & Culture"}
        </span>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors duration-200 shadow-lg hover:scale-110 transform">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        </button>
        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors duration-200 shadow-lg hover:scale-110 transform">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlogHeroSection;
