
import React, { useState, useEffect } from "react";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

const BlogManagement: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }
      setBlogPosts(blogPosts.filter((post) => post._id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error('Failed to add blog post');
      }
      const addedPost = await response.json();
      setBlogPosts([...blogPosts, addedPost]);
      setNewPost({ title: '', content: '', author: '' });
      setShowAddForm(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
        setNewPost({ title: '', content: '', author: '' });
    }
  }

  const handleEdit = (id: string) => {
    console.log(`Edit blog post with ID: ${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
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
            </label>
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Post
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-gray-500">Author: {post.author}</p>
            <p className="text-gray-500">Date: {new Date(post.date).toLocaleDateString()}</p>
            <div className="mt-2">
              <button onClick={() => handleEdit(post._id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(post._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;