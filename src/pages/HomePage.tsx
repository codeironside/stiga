import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Code, BarChart, Layers, Globe, Shield, Zap, CheckCircle } from 'lucide-react';

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
      staggerChildren: 0.2
    }
  }
};

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with the latest technologies to meet your specific business needs.',
    icon: Code,
  },
  {
    title: 'Data Analytics',
    description: 'Turn your data into actionable insights with our advanced analytics and reporting solutions.',
    icon: BarChart,
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that creates intuitive, engaging experiences for your customers.',
    icon: Layers,
  },
  {
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to increase your online presence and drive growth.',
    icon: Globe,
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your business with our robust security solutions and best practices implementation.',
    icon: Shield,
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and services to optimize your operations and reduce costs.',
    icon: Zap,
  },
];

const features = [
  'Over 10 years of industry experience',
  'Team of certified professionals',
  'Customized solutions for your business',
  'Ongoing support and maintenance',
  'Transparent pricing and no hidden fees',
  'Commitment to meeting deadlines',
];

const testimonials = [
  {
    content: "Working with Striga transformed our business. Their team delivered a solution that exceeded our expectations and helped us increase revenue by 40% in the first year.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "The team at Striga is exceptional. They took the time to understand our unique challenges and delivered a custom solution that perfectly addressed our needs.",
    author: "Mark Wilson",
    role: "CTO, GrowthLabs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "We've worked with several agencies before, but Striga stands out for their professionalism, expertise, and commitment to our success.",
    author: "Emily Chen",
    role: "Marketing Director, Innovate Inc.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt: "Explore the emerging trends and technologies that will shape web development in the coming years.",
    date: "Mar 15, 2025",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    title: "How Data Analytics Can Transform Your Business",
    excerpt: "Learn how leveraging data analytics can provide valuable insights and drive business growth.",
    date: "Mar 10, 2025",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    title: "Essential UI/UX Design Principles for 2025",
    excerpt: "Discover the key design principles that will help create exceptional user experiences.",
    date: "Mar 5, 2025",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

const HomePage = () => {
  // Hero section
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Services section
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // About section
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Testimonials section
  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Blog section
  const [blogRef, blogInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Carousel />
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-primary-50 to-neutral-50">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <motion.div
                ref={heroRef}
                variants={fadeIn}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="sm:text-center lg:text-left"
              >
                <h1 className="text-4xl tracking-tight font-display font-extrabold text-neutral-900 sm:text-5xl md:text-6xl">
                  <span className="block">Innovative solutions for</span>{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">your business</span>
                </h1>
                <p className="mt-4 text-base text-neutral-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We help businesses like yours grow and thrive in the digital age with cutting-edge technology and strategic solutions tailored to your needs.
                </p>
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-md shadow"
                  >
                    <Link
                      to="/contact"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      Get started
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 sm:mt-0 sm:ml-3"
                  >
                    <Link
                      to="/services"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12 lg:mt-0 relative"
              >
                <div className="relative mx-auto w-full rounded-lg shadow-xl overflow-hidden lg:max-w-md">
                  <div className="relative block w-full">
                    <img
                      className="w-full"
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                      alt="Team working on project"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 mix-blend-multiply opacity-20"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-50 to-transparent"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={servicesRef}
            variants={fadeIn}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">Services</span>
            <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-neutral-600 lg:mx-auto">
              Comprehensive solutions to help your business thrive in the digital landscape.
            </p>
          </motion.div>

          <motion.div
            ref={servicesRef}
            variants={staggerContainer}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="relative p-6 bg-white rounded-lg shadow-md transition-all duration-300"
              >
                <div>
                  <div className="absolute h-12 w-12 rounded-md bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-display font-medium text-neutral-900">{service.title}</h3>
                    <p className="mt-2 text-base text-neutral-600">{service.description}</p>
                  </div>
                </div>
                <div className="mt-6 ml-16">
                  <Link to={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-base font-medium text-primary-600 hover:text-primary-500 inline-flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <motion.div
              ref={aboutRef}
              variants={fadeIn}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">About Us</span>
              <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Your Trusted Business Partner
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                Founded in 2010, Striga has been at the forefront of digital innovation, helping businesses transform and thrive in an increasingly competitive landscape.
              </p>
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-primary-500" aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-base text-neutral-600">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 lg:mt-0"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                  alt="Team collaborating"
                  className="w-full h-full object-center object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 mix-blend-multiply opacity-20"></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Office space"
                    className="w-full h-48 object-center object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 mix-blend-multiply opacity-10"></div>
                </div>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                    alt="Team meeting"
                    className="w-full h-48 object-center object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 mix-blend-multiply opacity-10"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-primary-50 to-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={testimonialsRef}
            variants={fadeIn}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">Testimonials</span>
            <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-neutral-600 lg:mx-auto">
              Don't just take our word for it — hear from some of our satisfied clients.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            className="mt-16 grid gap-8 lg:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="bg-white rounded-lg p-8 shadow-md transition-all duration-300"
              >
                <div className="relative">
                  <svg
                    className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-primary-100"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-lg text-neutral-600">{testimonial.content}</p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full border-2 border-primary-200" src={testimonial.image} alt={testimonial.author} />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-neutral-900">{testimonial.author}</div>
                    <div className="text-sm text-primary-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={blogRef}
            variants={fadeIn}
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">Blog</span>
            <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Latest Insights
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-neutral-600 lg:mx-auto">
              Stay updated with our latest thoughts, ideas, and industry trends.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={post.image} alt={post.title} />
                  <div className="absolute top-0 left-0 m-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-white rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-neutral-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">{post.title}</h3>
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
          
          <div className="mt-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/blog"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-300"
              >
                View all posts
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
              Ready to transform your business?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Get in touch with us today and discover how Striga can help you achieve your goals.
            </p>
            <div className="mt-8 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-neutral-100 transition-all duration-300"
                >
                  Contact us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
