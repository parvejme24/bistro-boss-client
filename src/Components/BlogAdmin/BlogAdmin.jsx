import React, { useState, useEffect } from 'react';
import { useBlogs } from '../../hooks/useBlogs';
import { handleImageError, getOptimizedImageUrl } from '../../utils/imageUtils';

export default function BlogAdmin() {
  const {
    blogs,
    loading,
    error,
    success,
    getAllBlogs,
    addBlog,
    editBlog,
    removeBlog,
    clearBlogError,
    clearBlogSuccess,
  } = useBlogs();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: [],
    image: '',
    category: '',
    quote: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        clearBlogSuccess();
      }, 3000);
    }
  }, [success, clearBlogSuccess]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearBlogError();
      }, 5000);
    }
  }, [error, clearBlogError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingId) {
      await editBlog(editingId, formData);
    } else {
      await addBlog(formData);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      content: [],
      image: '',
      category: '',
      quote: '',
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title || '',
      description: blog.description || '',
      content: blog.content || [],
      image: blog.image || '',
      category: blog.category || '',
      quote: blog.quote || '',
    });
    setEditingId(blog._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await removeBlog(blogId);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      content: [],
      image: '',
      category: '',
      quote: '',
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add New Blog
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Operation completed successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Blog Form */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Blog' : 'Add New Blog'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

                         <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 Description
               </label>
               <textarea
                 name="description"
                 value={formData.description}
                 onChange={handleInputChange}
                 rows="2"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                 required
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 Quote
               </label>
               <textarea
                 name="quote"
                 value={formData.quote}
                 onChange={handleInputChange}
                 rows="2"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 Content (JSON Array)
               </label>
               <textarea
                 name="content"
                 value={JSON.stringify(formData.content, null, 2)}
                 onChange={(e) => {
                   try {
                     const parsed = JSON.parse(e.target.value);
                     setFormData(prev => ({ ...prev, content: parsed }));
                   } catch (error) {
                     // Keep the string value if JSON is invalid
                     setFormData(prev => ({ ...prev, content: e.target.value }));
                   }
                 }}
                 rows="6"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                 placeholder='[{"heading": "Section 1", "description": "Description", "image": "placeholder"}]'
               />
             </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image (Use "placeholder" for diagram)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter 'placeholder' for diagram or image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : (editingId ? 'Update Blog' : 'Create Blog')}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                                 <div className="flex-1">
                   <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                   <p className="text-gray-600 mb-2">{blog.description}</p>
                   <div className="flex items-center space-x-4 text-sm text-gray-500">
                     <span>By: {blog.author?.name || 'Unknown'}</span>
                     <span>Category: {blog.category || 'Uncategorized'}</span>
                     <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                   </div>
                 </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {blogs.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-600">
          <p>No blogs found. Create your first blog!</p>
        </div>
      )}
    </div>
  );
} 