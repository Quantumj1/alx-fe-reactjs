import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${username}`, {
      headers: {
        Authorization: `token ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const searchUsers = async (query, location = '', minRepos = '', page = 1) => {
  try {
    let searchQuery = `q=${encodeURIComponent(query)}`;
    if (location.trim()) {
      searchQuery += `+location:${encodeURIComponent(location)}`;
    }
    if (minRepos && parseInt(minRepos) > 0) {
      searchQuery += `+repos:>=${minRepos}`;
    }
    const response = await axios.get(`${API_BASE_URL}/search/users?${searchQuery}&per_page=10&page=${page}`, {
      headers: {
        Authorization: `token ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
  }
};
