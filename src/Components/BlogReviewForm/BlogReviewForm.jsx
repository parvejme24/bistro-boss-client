import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BlogReviewForm = ({ onSubmit, loading }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && comment.trim()) {
      onSubmit({ rating, comment: comment.trim() });
      setRating(5);
      setComment('');
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  if (!user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-yellow-800 font-medium">Please log in to leave a review</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#EB0029]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleRatingHover(star)}
                onMouseLeave={handleRatingLeave}
                className="text-2xl transition-colors duration-200 focus:outline-none"
              >
                <svg
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating} out of 5 stars
            </span>
          </div>
        </div>

        {/* Comment Section */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this blog post..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB0029] focus:border-transparent transition-all duration-200 resize-none"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !comment.trim()}
          className="w-full bg-[#EB0029] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#D10024] transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </div>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  );
};

export default BlogReviewForm;
