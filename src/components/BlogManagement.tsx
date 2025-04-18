tsx
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err:any) {
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
    } catch (err:any) {
      setError(err.message);
    }
  };

  const handleEdit = (id: string) => {
    console.log(`Edit blog post with ID: ${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Blog Management</h2>
      <button>Add New Blog Post</button>
      <ul>
        {blogPosts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Date: {new Date(post.date).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(post._id)}>Edit</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogManagement;