
import React, { useState } from 'react';
import BlogManagement from './BlogManagement';
import GalleryManagement from './GalleryManagement';
import UserManagement from './UserManagement';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            aria-current="page"
            className={`bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
              currentPage === index + 1 ? 'bg-stiga-orange text-white' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

const AdminDashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('blog');

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option value="blog">Blog</option>
          <option value="gallery">Gallery</option>
          <option value="users">Users</option>
        </select>
      </div>
      <div className="hidden sm:block mt-4">
        <nav className="flex justify-center rounded-lg overflow-hidden" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 font-medium text-sm rounded-l-lg ${
              activeTab === 'blog'
                ? 'bg-stiga-orange text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-stiga-orange focus:z-10`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Blog
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-3 font-medium text-sm  ${
              activeTab === 'gallery'
                ? 'bg-stiga-orange text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-stiga-orange focus:z-10`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Gallery
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-medium text-sm rounded-r-lg ${
              activeTab === 'users'
                ? 'bg-stiga-orange text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-stiga-orange focus:z-10`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Users
          </button>
        </nav>
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          {activeTab === 'blog' && <BlogManagement />}
          {activeTab === 'gallery' && <GalleryManagement />}
          {activeTab === 'users' && <UserManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardTabs;