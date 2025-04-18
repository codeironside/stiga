import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

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