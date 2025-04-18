import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogPosts } from "../api/blog";

interface BlogPost {
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  _id: string;
}
const dummyBlogPosts: BlogPost[] = [
  {
    title: "Dummy Post 1",
    content: "This is the content of the first dummy post.",
    imageUrl: "https://source.unsplash.com/random/800x600",
    date: "2024-04-17",
    author: "John Doe",
    _id: "1",
  },
  {
    title: "Dummy Post 2",
    content: "This is the content of the second dummy post.",
    imageUrl: "https://source.unsplash.com/random/800x600",
    date: "2024-04-18",
    author: "Jane Smith",
    _id: "2",
  },
];

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        const result = await getAllBlogPosts(page, limit);
        if (result) {
          setPosts(result.data);
          setTotalItems(result.totalItems);
        } else {
          setPosts(dummyBlogPosts);
          setTotalItems(dummyBlogPosts.length);
        }
      } catch (error: any) {
        setError(error.message || "Failed to load blog posts");
        setPosts(dummyBlogPosts);
        setTotalItems(dummyBlogPosts.length);
      } finally {
        setLoading(false);
      }
    };
    loadBlogPosts();
  }, []);
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Our Blog
        </h2>
        <p className="mt-3 text-xl text-gray-500">
          Stay up to date with our latest news and insights.
        </p>
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {loading && <p className="text-center">Loading blog posts...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={post.imageUrl}
                  alt={post.title}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <h3 className="text-gray-900 text-xl font-medium">
                  {post.title}
                </h3>
                <p className="mt-3 text-base text-gray-500">
                  {post.content.substring(0, 100)}...
                </p>
                <Link
                  to={`/blog/${post._id}`}
                  className="mt-3 text-indigo-600 hover:text-indigo-500"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BlogPosts;
