
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogManagement from './BlogManagement';
import GalleryManagement from './GalleryManagement';
import UserManagement from './UserManagement';
import { useAuth } from '../AuthContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('blog');
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        const user = data.find((user: { isAdmin: boolean; }) => user.isAdmin === true);

        if (!user) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      }
    };

    checkAdminStatus();
  }, [token, navigate]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background-50 p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-primary-700 mb-8">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row mb-6">
        <button
          className={`px-4 py-2 rounded-md mr-4 mb-2 md:mb-0 ${
            activeTab === 'blog'
              ? 'bg-primary-500 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
          onClick={() => handleTabClick('blog')}
        >
          Blog Management
        </button>
        <button
          className={`px-4 py-2 rounded-md mr-4 mb-2 md:mb-0 ${
            activeTab === 'gallery'
              ? 'bg-primary-500 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
          onClick={() => handleTabClick('gallery')}
        >
          Gallery Management
        </button>
        <button
          className={`px-4 py-2 rounded-md mb-2 md:mb-0 ${
            activeTab === 'user'
              ? 'bg-primary-500 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
          onClick={() => handleTabClick('user')}
        >
          User Management
        </button>
      </div>

      <div className="flex-grow">
        {activeTab === 'blog' && <BlogManagement />}
        {activeTab === 'gallery' && <GalleryManagement />}
        {activeTab === 'user' && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;