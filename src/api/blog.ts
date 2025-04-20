import axios from "axios";

const API_URL = "http://localhost:5000/api/blog";

export const getAllBlogPosts = async (page: number = 1, limit: number = 5) => {
  try {
    const response = await axios.get(API_URL, { params: { page, limit } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    throw error;
  }
};

export const createBlogPost = async (formData: FormData) => {
  try {
    console.log(`blog posts ${JSON.stringify(formData)}`)
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};

export const updateBlogPost = async (
  blogPostId: string,
  formData: FormData
) => {
  try {
    const response = await axios.put(`${API_URL}/${blogPostId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
};

export const deleteBlogPost = async (blogPostId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${blogPostId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};

export const getBlogPostById = async (blogPostId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${blogPostId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting blog post by ID:", error);
    throw error;
  }
};
