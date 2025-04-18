
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>{children}</div>
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

function BlogManagement() {
  return (
    <div>
      <h2>Blog Management</h2>
      {/* Add blog management content here */}
    </div>
  );
}

function GalleryManagement() {
  return (
    <div>
      <h2>Gallery Management</h2>
      {/* Add gallery management content here */}
    </div>
  );
}

function UserManagement() {
  return (
    <div>
      <h2>User Management</h2>
      {/* Add user management content here */}
    </div>
  );
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
        const userData = await getUser();
        if (userData) {
          setIsAdmin(userData.isAdmin ?? false); // Default to false if undefined
        } else {
          console.error('User data is null or undefined');
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
    <div>
      <div>
        <button {...a11yProps(0)} onClick={(event) => handleChange(event, 0)}>Blog Management</button>
        <button {...a11yProps(1)} onClick={(event) => handleChange(event, 1)}>Gallery Management</button>
        <button {...a11yProps(2)} onClick={(event) => handleChange(event, 2)}>User Management</button>
      </div>
      <TabPanel value={value} index={0}>
        <BlogManagement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GalleryManagement />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserManagement  />
      </TabPanel>
    </div>
  );
}

export default AdminDashboard;