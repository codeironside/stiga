
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogManagement from "../components/BlogManagement";
import GalleryManagement from "../components/GalleryManagement";
import UserManagement from "../components/UserManagement";

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}


import { getUser } from '../api/user'; // Assuming you have a getUser function

const AdminDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        if (userData) {
          setIsAdmin(userData.isAdmin ?? false); // Default to false if undefined
        } else {
          console.error('User data is null or undefined :',userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md md:p-8 lg:p-10">
      <div>
        <button {...a11yProps(0)} onClick={(event) => handleChange(event, 0)}>Blog Management</button>
        <button {...a11yProps(1)} onClick={(event) => handleChange(event, 1)}>Gallery Management</button>
        <button {...a11yProps(2)} onClick={(event) => handleChange(event, 2)}>User Management</button>
      </div>
      <TabPanel value={value} index={0}>
        <BlogManagement/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GalleryManagement/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserManagement  />
      </TabPanel>
    </div>
  );
}

export default AdminDashboard;