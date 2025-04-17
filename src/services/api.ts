// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This allows the browser to send cookies with requests
});

// Add this interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication endpoints
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const signup = async (formData: FormData) => {
  try {
    console.log("Sending signup request with data:", Object.fromEntries(formData));
    const response = await api.post('/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

// No changes to logout function
export const logout = async () => {
  try {
    const response = await api.post('/api/logout');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Error logging out', error);
    throw error;
  }
};

// No changes to event endpoints
export const getEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events', error);
    throw error;
  }
};

export const getEvent = async (eventId: string) => {
  try {
    const response = await api.get(`/api/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event', error);
    throw error;
  }
};

export const createEvent = async (eventData: FormData) => {
  try {
    const response = await api.post('/events', eventData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event', error);
    throw error;
  }
};

export default api;