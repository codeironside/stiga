import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: 'easeOut' } 
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={footerInView ? "visible" : "hidden"}
      variants={fadeIn} 
      className="bg-gradient-to-br from-primary-900 to-primary-800 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/Rectangle2.png" className="h-8 w-8" alt="Striga Icon" />
              <span className="text-2xl font-sans font-bold text-white">Striga</span>
            </Link>
            <p className="mt-4 text-neutral-200">
              Providing innovative solutions for businesses since 2010. We help transform ideas into reality.
            </p>
            <div className="mt-6 flex space-x-4">
              {/** Social Icons with hover animations */}
              <motion.a 
                href="#" 
                className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/about#careers" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services Links */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/services#web-development" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services#data-analytics" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link to="/services#design" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/services#marketing" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-300">
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-secondary-500 mr-2 mt-0.5" />
                <span className="text-neutral-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-secondary-500 mr-2 mt-0.5" />
                <span className="text-neutral-300">info@strigalimted.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary-500 mr-2 mt-0.5" />
                <span className="text-neutral-300">
                  123 Innovation Ave, Suite 100<br />
                  Sanplot 278 sanusi gamji street kago II abuja, CA 94107
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-300">
              &copy; {currentYear} codeironside. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-sm text-neutral-400 hover:text-secondary-500 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-neutral-400 hover:text-secondary-500 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-neutral-400 hover:text-secondary-500 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
