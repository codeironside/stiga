import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-orange-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-white text-2xl font-bold">Stiga</h2>
            <p className="mt-4 text-gray-200">
              Providing innovative solutions for businesses since 2010.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white">About</a>
              </li>
              <li>
                <a href="#team" className="text-gray-300 hover:text-white">Team</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Services</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white">Web Development</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white">Data Analytics</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white">UI/UX Design</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white">Digital Marketing</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-base text-gray-300 text-center">
            &copy; {new Date().getFullYear()} Stiga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
