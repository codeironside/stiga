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
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './components/Login';
import { isAuthenticated } from "./api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const auth = await isAuthenticated();
        setIsLoggedIn(auth.isAuthenticated);
        setIsAdmin(auth.isAdmin);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);
  // Smooth scroll behavior for the entire app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 w-full">
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/login"
              element={
                isLoggedIn === false ? (
                  <Login />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                isLoggedIn === true ? (
                  isAdmin ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/" replace />
                  )
                ) : isLoggedIn === false ? (
                  <Navigate to="/login" replace />
                ) : (
                  <div>Loading...</div>
                )
              }
            />
            {/* Catch-all route for 404 Not Found */}
            <Route
              path="*"
              element={
                <div className="flex h-screen items-center justify-center">
                  <h1 className="text-4xl font-bold">404 Not Found</h1>
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}
export default App;