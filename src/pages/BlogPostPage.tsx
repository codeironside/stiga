import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
} from "lucide-react";

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
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main post
        const postResponse = await fetch(
          `http://localhost:5000/api/blog/${id}`
        );

        if (!postResponse.ok) {
          if (postResponse.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        const postData: BlogPost = await postResponse.json();
        setPost(postData);

        // Fetch related posts (example - adjust based on your API)
        const relatedResponse = await fetch(
          `http://localhost:5000/api/blog/?limit=3`
        );
        const relatedData: { items: BlogPost[] } = await relatedResponse.json();
        setRelatedPosts(relatedData.items.filter((p) => p._id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
        console.error(`Fetch error: ${JSON.stringify(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/g).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Post
        </h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          ← Back to Blog
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Post Not Found</h1>
        <p className="text-gray-600 mt-2">
          The requested blog post could not be found.
        </p>
        <Link
          to="/blog"
          className="inline-block mt-4 text-primary-500 hover:text-primary-600 transition-colors"
        >
          ← View All Posts
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-16"
    >
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        {post.imageUrl && (
          <div className="absolute inset-0">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/fallback-image.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          </div>
        )}

        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center text-gray-200 space-x-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{calculateReadTime(post.content)} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Blog
          </Link>

          <article className="prose prose-lg max-w-none">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Social Sharing */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Share this post:</span>
              <div className="flex space-x-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-500 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-500 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    window.location.href
                  )}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-500 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Posts
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <motion.div
                  key={relatedPost._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                >
                  <Link to={`/blog/${relatedPost._id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/fallback-image.jpg";
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <span>{formatDate(relatedPost.date)}</span>
                        <span>•</span>
                        <span>
                          {calculateReadTime(relatedPost.content)} min read
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {relatedPost.content}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BlogPostPage;
