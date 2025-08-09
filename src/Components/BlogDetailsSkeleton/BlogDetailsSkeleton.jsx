import React from "react";
import PageHeader from "../Shared/PageHeader/PageHeader";

const BlogDetailsSkeleton = () => {
  return (
    <div>
      <PageHeader title="Blog Details" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Content Skeleton */}
          <article className="lg:col-span-2">
            {/* Hero Image Skeleton */}
            <div className="relative mb-8">
              <div className="w-full h-96 bg-gray-200 rounded-xl animate-pulse"></div>
              {/* Category Badge Skeleton */}
              <div className="absolute top-4 left-4">
                <div className="w-24 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Title Skeleton */}
            <div className="mb-8">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
              <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
            </div>

            {/* Quote Skeleton */}
            <div className="mb-8">
              <div className="border-l-4 border-gray-200 pl-6 py-6 bg-gray-50 rounded-r-lg">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>

            {/* Meta Information Skeleton */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-gray-200">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>

            {/* Content Sections Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group">
                  <div className="h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
                  <div className="mb-6 w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="p-6 bg-white rounded-lg shadow-sm">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons Skeleton */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center">
                <div className="w-24 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Reviews Section Skeleton */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="mb-6">
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
              
              {/* Review Form Skeleton */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="flex space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-24 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Reviews List Skeleton */}
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                    </div>
                    <div className="flex space-x-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar Skeleton */}
          <aside className="space-y-6">
            {/* Search Section Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Categories Section Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-1">
                {[1, 2, 3, 4, 5].map((category) => (
                  <div key={category} className="flex items-center justify-between p-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="w-8 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts Section Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((post) => (
                  <div key={post} className="flex items-start space-x-3 p-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
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
};

export default BlogDetailsSkeleton;
