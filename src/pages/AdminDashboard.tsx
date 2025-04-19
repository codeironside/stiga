import React, { useState } from "react";
import BlogManagement from "../components/BlogManagement";
import GalleryManagement from "../components/GalleryManagement";
import UserManagement from "../components/UserManagement";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            aria-current={currentPage === index + 1 ? "page" : undefined}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
              currentPage === index + 1
                ? "bg-stiga-orange text-white"
                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
      )}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("blog");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // This can be dynamic based on your data

  // For the issue in AdminDashboard.tsx, we've created a proper TabPanel component above

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically fetch data for the new page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Tabs */}
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
          <nav className="flex justify-center space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("blog")}
              className={`px-6 py-3 font-semibold text-sm rounded-lg shadow-md transition-colors duration-200 ${
                activeTab === "blog"
                  ? "bg-stiga-orange text-white hover:bg-stiga-orange-dark"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-stiga-orange`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-3 font-semibold text-sm rounded-lg shadow-md transition-colors duration-200 ${
                activeTab === "gallery"
                  ? "bg-stiga-orange text-white hover:bg-stiga-orange-dark"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-stiga-orange`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 font-semibold text-sm rounded-lg shadow-md transition-colors duration-200 ${
                activeTab === "users"
                  ? "bg-stiga-orange text-white hover:bg-stiga-orange-dark"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-stiga-orange`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Users
            </button>
          </nav>

          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            {/* Tab Content */}
            {activeTab === "blog" && <BlogManagement />}
            {activeTab === "gallery" && <GalleryManagement />}
            {activeTab === "users" && <UserManagement />}

            {/* Pagination - only show when there's data to paginate */}
            {(activeTab === "blog" ||
              activeTab === "gallery" ||
              activeTab === "users") && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
