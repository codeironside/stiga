
import { useState } from 'react';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: unknown) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log('Login successful', data.token);
      console.log('User data:', response.ok);
      return data;
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return { login, logout, isAuthenticated, isLoading, error };
};

export const getAuthenticatedUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await fetch("http://localhost:5000/api/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch authenticated user');
  }

  const user = await response.json();
  return user;
};

export default useAuth;
