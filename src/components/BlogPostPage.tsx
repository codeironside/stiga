
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '../api/blog';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (id) {
        try {
          setLoading(true);
          const blogPost = await getBlogPostById(id);
          setPost(blogPost);
        } catch (err: any) {
          setError(err.message || 'Failed to load blog post');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <div className="text-center">Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <div className="mb-4">
        <img
          src={post.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
      <div className="mb-4 text-gray-600">
        <p>Author: {post.author}</p>
        <p>Date: {new Date(post.date).toLocaleDateString()}</p>
      </div>
      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default BlogPostPage;