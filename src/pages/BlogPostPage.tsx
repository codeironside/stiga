import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Facebook, Twitter, Linkedin } from 'lucide-react';

// Sample blog post data
const blogPosts = [
  {
    id: "1",
    title: "The Future of Web Development in 2025",
    content: `
      <p class="lead">The web development landscape is constantly evolving, with new technologies and methodologies emerging at a rapid pace. As we look ahead to 2025, several key trends are poised to reshape how we build and interact with web applications.</p>
      
      <h2>The Rise of WebAssembly</h2>
      <p>WebAssembly (Wasm) continues to gain momentum as a powerful complement to JavaScript. By 2025, we expect to see Wasm become a standard part of web development stacks, enabling high-performance applications that were previously only possible in native environments.</p>
      <p>The ability to compile languages like Rust, C++, and Go to run in the browser at near-native speeds opens up new possibilities for web applications, from advanced graphics processing to complex calculations that would be prohibitively slow in JavaScript.</p>
      
      <h2>AI-Assisted Development</h2>
      <p>Artificial intelligence is transforming how developers write code. Tools like GitHub Copilot are just the beginning. By 2025, we anticipate AI assistants that can:</p>
      <ul>
        <li>Generate entire components based on natural language descriptions</li>
        <li>Automatically identify and fix performance bottlenecks</li>
        <li>Suggest architectural improvements based on best practices</li>
        <li>Create and maintain documentation automatically</li>
      </ul>
      <p>These AI tools won't replace developers but will significantly enhance productivity and code quality.</p>
      
      <h2>The Maturation of Edge Computing</h2>
      <p>Edge computing is moving from a buzzword to a standard approach for delivering fast, resilient web experiences. By 2025, we expect to see sophisticated edge computing platforms that allow developers to run complex logic at the network edge, reducing latency and improving user experiences globally.</p>
      <p>This shift will blur the line between traditional CDNs and application servers, with more computation happening closer to the end user.</p>
      
      <h2>Sustainability in Web Development</h2>
      <p>As awareness of the environmental impact of digital technologies grows, sustainable web development practices will become increasingly important. By 2025, we anticipate:</p>
      <ul>
        <li>Greater emphasis on energy-efficient code and assets</li>
        <li>Tools for measuring and optimizing the carbon footprint of web applications</li>
        <li>Frameworks and libraries designed with sustainability as a core principle</li>
      </ul>
      <p>Developers will need to consider not just performance for users, but also performance for the planet.</p>
      
      <h2>The Evolution of No-Code and Low-Code</h2>
      <p>No-code and low-code platforms will continue to evolve, becoming more powerful and flexible. By 2025, we expect these platforms to be capable of creating sophisticated applications that integrate seamlessly with custom code.</p>
      <p>Rather than replacing traditional development, these tools will become part of the professional developer's toolkit, accelerating development for common patterns while allowing custom code for unique requirements.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is bright, with technologies that enable faster, more powerful, and more sustainable applications. Developers who stay ahead of these trends will be well-positioned to create exceptional web experiences in 2025 and beyond.</p>
    `,
    excerpt: "Explore the emerging trends and technologies that will shape web development in the coming years.",
    date: "Mar 15, 2025",
    readTime: "8 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Michael Foster",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Michael leads our technical team with expertise in cloud architecture and AI."
    },
    relatedPosts: [2, 3, 5]
  },
  {
    id: "2",
    title: "How Data Analytics Can Transform Your Business",
    content: `
      <p class="lead">In today's digital landscape, data is often referred to as the new oil. But like oil, raw data has little value until it's refined and processed. This is where data analytics comes in, transforming raw information into actionable insights that can drive business growth and innovation.</p>
      
      <h2>Understanding the Data Analytics Spectrum</h2>
      <p>Data analytics encompasses a range of approaches, each offering different insights and value:</p>
      <ul>
        <li><strong>Descriptive Analytics:</strong> Examines what happened in the past</li>
        <li><strong>Diagnostic Analytics:</strong> Explores why something happened</li>
        <li><strong>Predictive Analytics:</strong> Forecasts what might happen in the future</li>
        <li><strong>Prescriptive Analytics:</strong> Suggests actions to take based on predictions</li>
      </ul>
      <p>As businesses mature in their data capabilities, they typically progress through these stages, unlocking greater value at each step.</p>
      
      <h2>Key Business Areas Transformed by Data Analytics</h2>
      
      <h3>Customer Experience</h3>
      <p>Data analytics enables businesses to understand customer behavior at an unprecedented level of detail. By analyzing customer interactions across touchpoints, companies can:</p>
      <ul>
        <li>Create personalized experiences that increase engagement and loyalty</li>
        <li>Identify pain points in the customer journey</li>
        <li>Predict customer needs before they're explicitly expressed</li>
        <li>Develop products and services that better meet customer requirements</li>
      </ul>
      
      <h3>Operational Efficiency</h3>
      <p>Analytics can transform internal operations by identifying inefficiencies and opportunities for automation:</p>
      <ul>
        <li>Optimize supply chains and inventory management</li>
        <li>Reduce downtime through predictive maintenance</li>
        <li>Streamline workflows and resource allocation</li>
        <li>Identify and eliminate bottlenecks in processes</li>
      </ul>
      
      <h3>Strategic Decision Making</h3>
      <p>Perhaps the most significant impact of data analytics is on strategic decision-making. With robust analytics capabilities, leaders can:</p>
      <ul>
        <li>Base decisions on evidence rather than intuition</li>
        <li>Identify market trends and opportunities earlier</li>
        <li>Assess risks more accurately</li>
        <li>Allocate resources more effectively</li>
      </ul>
      
      <h2>Implementing Data Analytics: Key Considerations</h2>
      
      <h3>Data Quality and Governance</h3>
      <p>The value of analytics is directly tied to the quality of the underlying data. Establishing strong data governance practices is essential for ensuring that data is accurate, consistent, and secure.</p>
      
      <h3>Skills and Culture</h3>
      <p>Successful analytics implementation requires both technical skills and a data-driven culture. Organizations must invest in developing data literacy across all levels and fostering a culture where decisions are routinely informed by data.</p>
      
      <h3>Technology Infrastructure</h3>
      <p>The right technology stack is crucial for effective analytics. This includes data storage solutions, processing tools, visualization platforms, and increasingly, artificial intelligence and machine learning capabilities.</p>
      
      <h2>The Future of Business Analytics</h2>
      <p>Looking ahead, several trends are shaping the evolution of business analytics:</p>
      <ul>
        <li><strong>Democratization of Analytics:</strong> Tools becoming more accessible to non-technical users</li>
        <li><strong>Embedded Analytics:</strong> Analytics capabilities integrated directly into business applications</li>
        <li><strong>AI-Powered Analytics:</strong> Machine learning automating insight discovery</li>
        <li><strong>Real-Time Analytics:</strong> Moving from batch processing to continuous analysis</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Data analytics is no longer a nice-to-have but a must-have for businesses seeking to remain competitive. By transforming raw data into actionable insights, organizations can enhance customer experiences, optimize operations, and make better strategic decisions. The key to success lies in approaching analytics as a strategic capability, with appropriate investments in data quality, skills, and technology.</p>
    `,
    excerpt: "Learn how leveraging data analytics can provide valuable insights and drive business growth.",
    date: "Mar 10, 2025",
    readTime: "10 min read",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Lindsay Walton",
      role: "Front-end Developer",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Lindsay specializes in creating responsive, accessible, and performant web interfaces."
    },
    relatedPosts: [1, 3, 5]
  },
  {
    id: "3",
    title: "Essential UI/UX Design Principles for 2025",
    content: `
      <p class="lead">As digital experiences become increasingly central to our lives, the principles of good UI/UX design continue to evolve. Looking ahead to 2025, several key design principles will be essential for creating interfaces that are not just usable, but truly delightful and inclusive.</p>
      
      <h2>Adaptive Interfaces</h2>
      <p>The one-size-fits-all approach to interface design is becoming obsolete. By 2025, adaptive interfaces that respond to individual user preferences, behaviors, and needs will be the standard. These interfaces will:</p>
      <ul>
        <li>Adjust complexity based on user expertise</li>
        <li>Modify layouts based on usage patterns</li>
        <li>Personalize content presentation without explicit configuration</li>
        <li>Adapt to different contexts and environments</li>
      </ul>
      <p>This shift requires designers to think beyond static layouts and consider how interfaces can evolve over time for each user.</p>
      
      <h2>Inclusive Design as Standard</h2>
      <p>Inclusive design will move from being a specialized consideration to a fundamental aspect of all design work. This means:</p>
      <ul>
        <li>Designing for the full spectrum of human abilities and disabilities</li>
        <li>Considering cultural differences and global contexts</li>
        <li>Ensuring interfaces work well across varying technical capabilities and connections</li>
        <li>Creating experiences that respect different levels of digital literacy</li>
      </ul>
      <p>The most successful designs will be those that work well for everyone, not just the "average" user.</p>
      
      <h2>Ethical Design Practices</h2>
      <p>As awareness of the ethical implications of design choices grows, ethical considerations will become central to the design process:</p>
      <ul>
        <li>Transparency about how user data influences the experience</li>
        <li>Avoiding dark patterns that manipulate users</li>
        <li>Designing for genuine user benefit rather than engagement metrics alone</li>
        <li>Considering the broader societal impacts of design decisions</li>
      </ul>
      <p>Designers will increasingly be expected to advocate for user interests and ethical considerations within their organizations.</p>
      
      <h2>Multimodal Interfaces</h2>
      <p>As technology evolves, interfaces will expand beyond screens to incorporate multiple modes of interaction:</p>
      <ul>
        <li>Voice and natural language processing</li>
        <li>Gesture recognition</li>
        <li>Haptic feedback</li>
        <li>Augmented and virtual reality elements</li>
      </ul>
      <p>Designers will need to create coherent experiences that span these different modalities, ensuring users can seamlessly transition between them.</p>
      
      <h2>Minimalism with Purpose</h2>
      <p>The trend toward minimalism will continue, but with a greater emphasis on purposeful simplicity rather than aesthetic minimalism for its own sake:</p>
      <ul>
        <li>Reducing cognitive load through careful information architecture</li>
        <li>Eliminating unnecessary elements while preserving important context and affordances</li>
        <li>Using progressive disclosure to manage complexity</li>
        <li>Ensuring that simplification doesn't come at the cost of functionality or clarity</li>
      </ul>
      <p>The goal will be interfaces that feel simple and intuitive despite the growing complexity of the systems they represent.</p>
      
      <h2>Data-Informed Design</h2>
      <p>The relationship between data and design will deepen, with more sophisticated approaches to using data in the design process:</p>
      <ul>
        <li>Moving beyond simple A/B testing to more nuanced experimental approaches</li>
        <li>Using qualitative and quantitative data together to form a complete picture</li>
        <li>Leveraging AI to identify patterns and opportunities in user behavior</li>
        <li>Maintaining a balance between data-driven decisions and design intuition</li>
      </ul>
      <p>The most effective designers will be those who can work fluently with data while maintaining a strong design vision.</p>
      
      <h2>Conclusion</h2>
      <p>The UI/UX design principles of 2025 will emphasize adaptability, inclusivity, ethics, multimodal interaction, purposeful minimalism, and data-informed decision making. By embracing these principles, designers can create interfaces that not only meet the functional needs of users but also respect their autonomy, accommodate their differences, and bring genuine delight to their digital experiences.</p>
    `,
    excerpt: "Discover the key design principles that will help create exceptional user experiences.",
    date: "Mar 5, 2025",
    readTime: "7 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: {
      name: "Dries Vincent",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Dries brings creative vision and user-centered design principles to all our projects."
    },
    relatedPosts: [1, 2, 6]
  }
];

// Find related posts
const getRelatedPosts = (postId: string) => {
  const currentPost = blogPosts.find(post => post.id === postId);
  if (!currentPost || !currentPost.relatedPosts) return [];
  
  return currentPost.relatedPosts.map(id => 
    blogPosts.find(post => post.id === id.toString())
  ).filter(Boolean);
};

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(post => post.id === id);
  const relatedPosts = getRelatedPosts(id || "");
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Post not found</h1>
        <p className="mt-4 text-neutral-600">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="mt-6 inline-block text-primary-600 hover:text-primary-500">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      {/* Hero Section */}
      <div className="relative h-96 bg-neutral-900">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-70"></div>
        </div>
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-white rounded-full shadow-sm">
                {post.category}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center text-white">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full border-2 border-white"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <div className="flex items-center text-sm text-neutral-300">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to blog
          </Link>
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-neutral-200">
            <div className="flex items-center">
              <Tag className="h-5 w-5 text-neutral-500 mr-2" />
              <span className="text-neutral-600 mr-2">Tags:</span>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
                  {post.category}
                </span>
                <span className="inline-block px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
                  Web Development
                </span>
                <span className="inline-block px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
                  Trends
                </span>
              </div>
            </div>
          </div>
          
          {/* Share */}
          <div className="mt-6 flex items-center">
            <span className="text-neutral-600 mr-4">Share:</span>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Author */}
          <div className="mt-12 p-6 bg-neutral-50 rounded-lg">
            <div className="flex items-center">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="h-16 w-16 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-neutral-900">{post.author.name}</h3>
                <p className="text-sm text-primary-600">{post.author.role}</p>
                <p className="mt-1 text-neutral-600">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-neutral-50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-8">Related Articles</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost: any) => (
                  <motion.div
                    key={relatedPost.id}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300"
                  >
                    <Link to={`/blog/${relatedPost.id}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                        />
                        <div className="absolute top-0 left-0 m-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-white rounded-full shadow-sm">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <img 
                          className="h-8 w-8 rounded-full mr-2" 
                          src={relatedPost.author.image} 
                          alt={relatedPost.author.name} 
                        />
                        <span className="text-sm text-neutral-600">{relatedPost.author.name}</span>
                        <span className="mx-2 text-neutral-300">•</span>
                        <span className="text-sm text-neutral-500">{relatedPost.date}</span>
                      </div>
                      <Link to={`/blog/${relatedPost.id}`} className="block">
                        <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2 hover:text-primary-600 transition-colors duration-300">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <p className="text-neutral-600 mb-4">{relatedPost.excerpt}</p>
                      <Link 
                        to={`/blog/${relatedPost.id}`}
                        className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium"
                      >
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BlogPostPage;