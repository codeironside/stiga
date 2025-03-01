import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Search } from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt: "Explore the emerging trends and technologies that will shape web development in the coming years.",
    date: "Mar 15, 2025",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Michael Foster",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  },
  {
    id: 2,
    title: "How Data Analytics Can Transform Your Business",
    excerpt: "Learn how leveraging data analytics can provide valuable insights and drive business growth.",
    date: "Mar 10, 2025",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Lindsay Walton",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  },
  {
    id: 3,
    title: "Essential UI/UX Design Principles for 2025",
    excerpt: "Discover the key design principles that will help create exceptional user experiences.",
    date: "Mar 5, 2025",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Dries Vincent",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  },
  {
    id: 4,
    title: "Cybersecurity Best Practices for Small Businesses",
    excerpt: "Protect your business from cyber threats with these essential security practices.",
    date: "Feb 28, 2025",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Jane Cooper",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  },
  {
    id: 5,
    title: "The Rise of AI in Modern Business Applications",
    excerpt: "Explore how artificial intelligence is revolutionizing business processes and decision-making.",
    date: "Feb 20, 2025",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Michael Foster",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  },
  {
    id: 6,
    title: "Effective Digital Marketing Strategies for 2025",
    excerpt: "Stay ahead of the competition with these cutting-edge digital marketing approaches.",
    date: "Feb 15, 2025",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Lindsay Walton",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  },
];

const categories = [
  "All",
  "Technology",
  "Business",
  "Design",
  "Marketing",
  "Security",
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-display font-bold text-white sm:text-5xl"
            >
              Our Blog
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-xl text-primary-100"
            >
              Insights, thoughts and perspectives on business, technology, and design.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <motion.div
              ref={ref}
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={fadeIn}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300"
                >
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                        src={post.image} 
                        alt={post.title} 
                      />
                      <div className="absolute top-0 left-0 m-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-white rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <img 
                        className="h-8 w-8 rounded-full mr-2" 
                        src={post.author.image} 
                        alt={post.author.name} 
                      />
                      <span className="text-sm text-neutral-600">{post.author.name}</span>
                      <span className="mx-2 text-neutral-300">•</span>
                      <span className="text-sm text-neutral-500">{post.date}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="block">
                      <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2 hover:text-primary-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-neutral-600 mb-4">{post.excerpt}</p>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium"
                    >
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-600">No posts found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-neutral-100 py-16 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-neutral-900">Subscribe to our newsletter</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Get the latest insights and news delivered to your inbox.
            </p>
            <div className="mt-8">
              <form className="sm:flex justify-center">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-neutral-300 shadow-sm placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-neutral-500">
                We care about your data. Read our{' '}
                <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPage;