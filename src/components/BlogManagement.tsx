
import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}
import { getAllBlogPosts, createBlogPost, deleteBlogPost } from '../api/blog';

const BlogManagement: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        setLoading(true);
        const result = await getAllBlogPosts(currentPage, itemsPerPage)
        setBlogPosts(result.data);
        setTotalItems(result.totalItems);
        setTotalPages(Math.ceil(result.totalItems / itemsPerPage));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBlogPosts();
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBlogPost(id);
      setBlogPosts(blogPosts.filter((post) => post._id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      formData.append('author', newPost.author);
      formData.append('imageUrl', imageUrl || "");

      await createBlogPost({
        ...newPost,
        imageUrl: imageUrl || "",
      });

      // Refresh blog posts after adding
      const result = await getAllBlogPosts(currentPage, itemsPerPage)
      setBlogPosts(result.data);
      setImageUrl(null);
      setNewPost({ title: '', content: '', author: '' });
      setShowAddForm(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setImageUrl(null);
    if (showAddForm) {
      setNewPost({ title: '', content: '', author: '' })
    }
  }
  const handleImageUpload = (url: string) => {
      setImageFile(null);
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Clear any previous errors
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    } else if (file) {
      setError('Please select a valid image file.');
      setImageFile(null);
      setPreviewImageUrl(null);
      if (event.target) {
        event.target.value = '';
      }
    } else {
      setImageFile(null);
      setPreviewImageUrl(null);
      if (event.target) {
        event.target.value = '';
      }
    }
  }

  const handleEdit = (id: string) => {
    console.log(`Edit blog post with ID: ${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Blog Management</h2>

      <button
        onClick={toggleAddForm}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showAddForm ? 'Cancel' : 'Add New Blog Post'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="mb-4 p-4 border rounded">
          <div className="mb-2">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-1">
              Title:
            </label >


            <input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />

          </div>
          <div className="mb-2">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-1">
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-1">
              Author:
            </label>


            <input
              type="text"
              id="author"













              name="author"
              value={newPost.author}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-1">
                Image:
              </label>
              <ImageUpload onImageUpload={setImageUrl} />
              {imageUrl && (
                <div className="mt-2">
                  <img src={imageUrl} alt="Uploaded" className="max-h-40" />
                </div>
              )}

            </div>
          </div>

          {previewImageUrl && (
            <div className="mb-2">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Image preview"
                className="max-h-48 rounded-lg"
              />
            </div>
          )}


          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!imageUrl}
          >
            Add Post





          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-gray-500 mt-2">Author: {post.author}</p>
            <p className="text-gray-500">
              Date: {new Date(post.date).toLocaleDateString()}
            </p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(post._id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Edit
              </button>













              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-2 rounded ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;