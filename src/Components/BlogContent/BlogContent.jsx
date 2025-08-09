import React from "react";
import { getOptimizedImageUrl, handleImageError } from "../../utils/imageUtils";

const BlogContent = ({ content }) => {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {content.map((section, index) => (
        <section key={section._id || index} className="group">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-[#EB0029] transition-colors duration-300">
            {section.heading}
          </h2>
          
          {section.image && (
            <div className="mb-6 overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <img
                src={getOptimizedImageUrl(section.image)}
                alt={section.heading}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={handleImageError}
              />
            </div>
          )}
          
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-gray-700 leading-relaxed text-lg">
              {section.description}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default BlogContent;
