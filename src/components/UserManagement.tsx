tsx
import React, { useState, useEffect } from 'react';

interface User {
  _id: string;
  username: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const dummyUsers: User[] = [
    { _id: '1', username: 'dummyUser1' },
    { _id: '2', username: 'dummyUser2' },
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
        setUsers(data.length > 0 ? data : dummyUsers);
      } catch (err) {
        setError('Error fetching users. Using dummy data.');
        setUsers(dummyUsers);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);


  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError('Error deleting user');
    }
  };

  return (
      <div>
        <h2>User Management</h2>
        {error && <div className="error">{error}</div>}
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

export default UserManagement;