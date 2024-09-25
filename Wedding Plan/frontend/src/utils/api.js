import axios from 'axios';

// Base API URL (backend server)
const API_URL = 'http://localhost:5000/api';

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;  // Returns user data and token
  } catch (error) {
    throw error.response.data;  // Handle errors
  }
};

// Login the user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;  // Returns token and user data
  } catch (error) {
    throw error.response.data;  // Handle errors
  }
};

// Fetch user profile (protected route)
export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  // Returns the user profile data
  } catch (error) {
    throw error.response.data;  // Handle errors
  }
};
