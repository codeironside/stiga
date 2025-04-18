
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogManagement from './BlogManagement';
import GalleryManagement from './GalleryManagement';
import UserManagement from './UserManagement';
import AdminDashboardTabs from '../components/AdminDashboardTabs';

const AdminDashboard: React.FC = () => {
  return <AdminDashboardTabs />;
};

export default AdminDashboard;