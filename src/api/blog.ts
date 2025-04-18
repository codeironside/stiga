
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/blog';

export const getAllBlogPosts = async (page: number = 1, limit: number = 5) => {
  try {
    const response = await axios.get(API_URL, { params: { page, limit } });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    throw error;
  }
};

export const createBlogPost = async (formData: FormData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;\n  } catch (error) {\n    console.error('Error creating blog post:', error);\n    throw error;\n  }\n};\n\nexport const updateBlogPost = async (blogPostId: string, formData: FormData) => {\n  try {\n    const response = await axios.put(`${API_URL}/${blogPostId}`, formData, {\n      headers: {\n        'Content-Type': 'multipart/form-data',\n      },\n    });\n    return response.data;\n  } catch (error) {\n    console.error('Error updating blog post:', error);\n    throw error;\n  }\n};\n
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (blogPostId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${blogPostId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export const getBlogPostById = async (blogPostId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${blogPostId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting blog post by ID:', error);
    throw error;
  }
};