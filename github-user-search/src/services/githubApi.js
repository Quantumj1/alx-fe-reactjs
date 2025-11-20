import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/users`, {
      params: { q: query },
      headers: {
        Authorization: `token ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${username}`, {
      headers: {
        Authorization: `token ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
