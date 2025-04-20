import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import ClientLogoCarousel from "../components/ClientLogoCarousel";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Code, BarChart, Layers, Globe, Shield, Zap, CheckCircle, Calendar } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

interface GalleryImage {
  _id: string;
  url: string;
  description: string;
  category: string;
}

const HomePage = () => {
  // View refs for all sections
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [blogRef, blogInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State management
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState({
    blog: true,
    gallery: true,
  });
  const [error, setError] = useState({
    blog: "",
    gallery: "",
  });

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog?limit=3");
        if (!response.ok) throw new Error("Failed to fetch blog posts");
        const data = await response.json();
        setBlogPosts(data.items);
      } catch (err) {
        setError((prev) => ({ ...prev, blog: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, blog: false }));
      }
    };
    fetchBlogPosts();
  }, []);

  // Fetch gallery images
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gallery");
        if (!response.ok) throw new Error("Failed to fetch gallery");
        const data = await response.json();
        const randomized = data.galleryItems
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
        setGalleryImages(randomized);
      } catch (err) {
        setError((prev) => ({ ...prev, gallery: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, gallery: false }));
      }
    };
    fetchGallery();
  }, []);

  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFirstTwoWords = (description: string) => {
    if (!description) return "";
    const words = description.split(" ").slice(0, 2);
    return words.join(" ") + (words.length === 2 ? "..." : "");
  };

  // Static data for non-API sections
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites and web applications built with the latest technologies.",
      icon: Code,
    },
    {
      title: "Data Analytics",
      description:
        "Turn your data into actionable insights with our analytics solutions.",
      icon: BarChart,
    },
    {
      title: "UI/UX Design",
      description:
        "User-centered design that creates intuitive, engaging experiences.",
      icon: Layers,
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive strategies to increase your online presence.",
      icon: Globe,
    },
    {
      title: "Cybersecurity",
      description: "Protect your business with our robust security solutions.",
      icon: Shield,
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure to optimize your operations.",
      icon: Zap,
    },
  ];

  const features = [
    "Over 10 years of industry experience",
    "Team of certified professionals",
    "Customized solutions for your business",
    "Ongoing support and maintenance",
    "Transparent pricing and no hidden fees",
    "Commitment to meeting deadlines",
  ];

  const testimonials = [
    {
      content:
        "Working with Striga transformed our business. Their team delivered beyond our expectations.",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      content:
        "The team at Striga is exceptional. They delivered a custom solution that perfectly addressed our needs.",
      author: "Mark Wilson",
      role: "CTO, GrowthLabs",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      content:
        "Striga stands out for their professionalism, expertise, and commitment to our success.",
      author: "Emily Chen",
      role: "Marketing Director, Innovate Inc.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-primary-50 to-neutral-50"
      >
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="sm:text-center lg:text-left"
              >
                <h1 className="text-4xl tracking-tight font-display font-extrabold text-neutral-900 sm:text-5xl md:text-6xl">
                  <span className="block">Innovative solutions for</span>{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
                    your business
                  </span>
                </h1>
                <p className="mt-4 text-base text-neutral-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We help businesses grow and thrive with cutting-edge
                  technology and strategic solutions.
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
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={
                  heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12 lg:mt-0 relative"
              >
                <div className="relative mx-auto w-full rounded-lg shadow-xl overflow-hidden lg:max-w-md">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                    alt="Team working"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
              Services
            </span>
            <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              What We Offer
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeIn}
                className="relative p-6 bg-white rounded-lg shadow-md transition-all duration-300"
              >
                <div>
                  <div className="absolute h-12 w-12 rounded-md bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-display font-medium text-neutral-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-base text-neutral-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" ref={galleryRef} className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
              Gallery
            </span>
            <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Our Work Showcase
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {loading.gallery ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 rounded-lg animate-pulse"
                />
              ))
            ) : error.gallery ? (
              <div className="col-span-full text-center text-red-500 py-8">
                {error.gallery}
              </div>
            ) : (
              galleryImages.map((image) => (
                <motion.div
                  key={image._id}
                  variants={fadeIn}
                  className="relative group overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <p className="text-sm">
                        {getFirstTwoWords(image.description)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" ref={blogRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
              Blog
            </span>
            <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Latest Insights
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {loading.blog ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                </div>
              ))
            ) : error.blog ? (
              <div className="col-span-full text-center text-red-500 py-8">
                {error.blog}
              </div>
            ) : (
              blogPosts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={fadeIn}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <Link to={`/blog/${post._id}`} className="block">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-neutral-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 line-clamp-3">
                        {post.content}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
              Ready to transform your business?
            </h2>
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
      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className="py-20 bg-neutral-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
              Testimonials
            </span>
            <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Client Experiences
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-neutral-600 lg:mx-auto">
              Discover what our clients say about our services
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
                className="bg-white rounded-lg p-8 shadow-md transition-all duration-300"
              >
                <div className="relative">
                  <svg
                    className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-primary-100"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-lg text-neutral-600">
                    {testimonial.content}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <img
                    className="h-12 w-12 rounded-full border-2 border-primary-200"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <div className="text-base font-medium text-neutral-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-primary-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ClientLogoCarousel />

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
            >
              <h2 className="text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Our Commitment
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                Delivering exceptional results through innovation and
                collaboration
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    variants={fadeIn}
                  >
                    <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0" />
                    <p className="ml-3 text-base text-neutral-600">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.8 }}
              className="mt-10 lg:mt-0"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Our team"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="text-center"
          >
            <h2 className="text-3xl font-display font-bold text-neutral-900">
              Key Features
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="p-6 bg-white rounded-lg shadow-md"
                >
                  <CheckCircle className="h-8 w-8 text-primary-500 mb-4" />
                  <p className="text-lg text-neutral-700">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="text-center"
          >
            <h2 className="text-3xl font-display font-bold text-neutral-900">
              Our Team
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <img
                    src={`https://randomuser.me/api/portraits/men/${
                      index + 40
                    }.jpg`}
                    alt={`Team member ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="text-xl font-semibold">
                        Team Member {index + 1}
                      </h3>
                      <p className="text-sm">Position Title</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-display font-bold text-neutral-900">
              Start Your Project Today
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mt-8"
            >
              <Link
                to="/contact"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;