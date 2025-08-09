import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BlogReviewList = ({ reviews, loading, onEdit, onDelete, currentUserId }) => {
  const [expandedReview, setExpandedReview] = useState(null);

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

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 animate-pulse">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">No reviews yet. Be the first to review this blog!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          {/* Review Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#EB0029] rounded-full flex items-center justify-center text-white font-semibold">
                {review.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {review.user?.name || 'Anonymous User'}
                </h4>
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating)}
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons for Review Owner */}
            {currentUserId === review.user?._id && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(review)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(review._id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Review Content */}
          <div className="text-gray-700 leading-relaxed">
            {review.comment.length > 200 && expandedReview !== review._id ? (
              <div>
                <p>{review.comment.substring(0, 200)}...</p>
                <button
                  onClick={() => setExpandedReview(review._id)}
                  className="text-[#EB0029] hover:text-[#D10024] font-medium mt-2 transition-colors duration-200"
                >
                  Read more
                </button>
              </div>
            ) : (
              <div>
                <p>{review.comment}</p>
                {review.comment.length > 200 && expandedReview === review._id && (
                  <button
                    onClick={() => setExpandedReview(null)}
                    className="text-[#EB0029] hover:text-[#D10024] font-medium mt-2 transition-colors duration-200"
                  >
                    Show less
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogReviewList;
