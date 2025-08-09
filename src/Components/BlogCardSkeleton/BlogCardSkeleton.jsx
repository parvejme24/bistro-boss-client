import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
        {/* Category Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <div className="bg-gray-300 h-6 w-20 rounded-full animate-pulse"></div>
        </div>
        {/* Action Buttons Skeleton */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <div className="bg-gray-300 h-8 w-8 rounded-full animate-pulse"></div>
          <div className="bg-gray-300 h-8 w-8 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
        </div>

        {/* Meta Information Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 h-6 w-6 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="bg-gray-200 h-6 w-6 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Author and Engagement Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 h-6 w-6 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="bg-gray-200 h-6 w-6 rounded-full animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-8 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="bg-gray-200 h-6 w-6 rounded-full animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-8 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-4">
          <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
