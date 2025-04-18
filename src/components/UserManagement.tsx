
import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser } from '../api/user';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ username: '', password: '', isAdmin: false });
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data, totalItems } = await getAllUsers(currentPage, itemsPerPage);
      setUsers(data);
      setTotalItems(totalItems);
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      setLoading(false);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch users');
      setUsers([]);
      setLoading(false);
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createUser(newUser);
      setNewUser({ username: '', password: '', isAdmin: false });
      getUsers();
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        setError('Unauthorized: You do not have permission to create users.');
      } else if (error.message === 'Conflict') {
        setError('User already exists');
      }
      else {
      setError(error.message || 'Failed to create user');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-primary-500 mb-4">User Management</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong> {error}
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Create New User</h3>
        <form onSubmit={handleCreateUser} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newUser.isAdmin}
              onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
              className="mr-2"
            />
            Is Admin
          </label>
          <button
            type="submit"
            className="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:bg-primary-600"
          >
            Create User
          </button>
        </form>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Existing Users</h3>
      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-2 p-2 bg-gray-50 rounded-lg flex justify-between items-center">
              <span className='text-primary-500'>{user.username} ({user.isAdmin ? 'Admin' : 'User'})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;

        </div>
      )}