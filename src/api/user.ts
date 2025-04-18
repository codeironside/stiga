import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getAllUsers = async (token: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      users: response.data.users,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUser = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            // Token is invalid or expired
            return null;
        }
        console.error('Error fetching user:', error);
        throw error;
    }
};


export const createUser = async (userData: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
