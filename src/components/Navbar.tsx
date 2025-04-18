import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const getToken = () => localStorage.getItem('token');
const clearToken = () => localStorage.removeItem('token');

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const location = useLocation();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [location]);


  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];


  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img src="/Rectangle 1.png" className="h-8 w-8" alt="Flame Icon" />
              <span className="ml-2 text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Striga
              </span>
            </motion.div>
          </Link>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-neutral-700 hover:text-primary-500'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  clearToken();
                  setIsLoggedIn(false);
                  window.location.href = '/';
                }}
                className="px-3 py-2 font-medium text-neutral-700 hover:text-primary-500 transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-3 py-2 font-medium text-neutral-700 hover:text-primary-500 transition-colors duration-300">
                Login
              </Link>
            )}
          </nav>
          
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="ml-8 inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-primary-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-b border-neutral-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-500 hover:bg-neutral-50'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                to="/contact"
                className="block w-full text-center mt-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
              >
                Get Started
              </Link>
            </motion.div>
            {isLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
              >
                <button onClick={() => {clearToken(); setIsLoggedIn(false);window.location.href = '/'}} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-neutral-50">
                  Logout
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navLinks.length + 1) * 0.1 }}>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-neutral-50">Login</Link>
              </motion.div>)}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
