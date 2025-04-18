import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ScrollToTop from './components/ScrollToTop';
import ContactPage from './pages/contactPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './components/Login';
import { getAuthenticatedUser } from "./api/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const auth = await isAuthenticated();
        setIsLoggedIn(auth.isAuthenticated);
        if (auth.isAuthenticated) {
          setIsAdmin(auth.isAdmin);
        }
      } else {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);
  // Smooth scroll behavior for the entire app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Or a more visually appealing loading indicator
  }

  return (<Router>
    <ScrollToTop />
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 w-full">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          {/* Protected Admin Route */}
          <Route path="/admin" element={
            isLoggedIn && isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to={isLoggedIn ? "/" : "/login"} />
            )
          } />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={
            <div className="flex h-screen items-center justify-center">
              <h1 className="text-4xl font-bold">404 Not Found</h1>
            </div>
          } />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  </Router>);
}

async function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return { isAuthenticated: false, isAdmin: false };

  try {
    const user = await getAuthenticatedUser();
    return { isAuthenticated: true, isAdmin: user?.isAdmin || false };
  } catch {
    return { isAuthenticated: false, isAdmin: false };
  }
}
export default App;