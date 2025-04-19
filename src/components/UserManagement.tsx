import React, { useState, useEffect } from "react";
import { getAllUsers, createUser } from "../api/user";

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { users, totalItems } = await getAllUsers(
        token,
        currentPage,
        itemsPerPage
      );

      setUsers(users);
      setTotalItems(totalItems);
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      setLoading(true);
      await createUser(newUser, token);
      setNewUser({ username: "", password: "", isAdmin: false });
      await fetchUsers();
    } catch (err: any) {
      console.error("Error creating user:", err);
      if (err.message === "Unauthorized") {
        setError("Unauthorized: You do not have permission to create users.");
      } else if (err.message === "Conflict") {
        setError("User already exists.");
      } else {
        setError(err.message || "Failed to create user.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-primary-500 mb-4">
        User Management
      </h2>

      {/* Error Message */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong> {error}
          <button
            onClick={() => setError(null)}
            className="absolute top-0 right-0 px-4 py-3 focus:outline-none"
          >
            &times;
          </button>
        </div>
      )}

      {/* Create User Form */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Create New User
        </h3>
        <form
          onSubmit={handleCreateUser}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newUser.isAdmin}
              onChange={(e) =>
                setNewUser({ ...newUser, isAdmin: e.target.checked })
              }
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

      {/* User List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Existing Users
        </h3>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-lg"
              >
                <span className="text-primary-500">
                  {user.username} ({user.isAdmin ? "Admin" : "User"})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No users found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
