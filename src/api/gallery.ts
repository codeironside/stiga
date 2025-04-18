
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/gallery';

// export const getAllGalleryItems = async () => {
export const getAllGalleryItems = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`)
    return response.data // Assuming the backend returns { items: [], totalItems: number }
  } catch (error) {
    console.error('Error getting gallery items:', error);
    throw error;
  }
};

export const createGalleryItem = async (formData: FormData) => {
  try {
    const response = await axios.post(BASE_URL, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw error;
  }
};

export const deleteGalleryItem = async (itemId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};