
import React, { useState, useEffect } from 'react';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const dummyUsers: User[] = [
    { _id: '1', username: 'dummyUser1', isAdmin: false },
    { _id: '2', username: 'dummyUser2', isAdmin: true },
    { _id: '3', username: 'adminUser', isAdmin: true },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched users:", data); // Log the fetched data
        const usersWithAdminStatus = data.map((user: any) => ({
          ...user,
          isAdmin: user.isAdmin || false, // Ensure isAdmin is always present
        }));
      } catch (err) {
        setError('Error fetching users. Using dummy data.');
        setUsers(dummyUsers);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    setError(null); // Clear previous errors
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message || 'Error deleting user');
      console.error("Delete user error:", err); // Log the error for debugging
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
      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-700">Username</th>
                <th className="px-4 py-2 text-left text-gray-700">Is Admin</th>
                <th className="px-4 py-2 text-right text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 text-right">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    );
  };

export default UserManagement;