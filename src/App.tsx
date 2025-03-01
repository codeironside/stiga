import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // Smooth scroll behavior for the entire app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;