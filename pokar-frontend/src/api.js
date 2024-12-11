import axios from 'axios';
import { refreshToken, logout } from './services/auth';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach the token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Add response interceptor for token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await refreshToken();
        return API(error.config);
      } catch (refreshError) {
        logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Add debug interceptor
if (process.env.NODE_ENV === 'development') {
  API.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
  });

  API.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  });
}

// Base HTTP methods
export const get = (url) => API.get(url);
export const post = (url, data) => API.post(url, data);
export const put = (url, data) => API.put(url, data);
export const del = (url) => API.delete(url);

// Auth API methods
export const register = (userData) => post('/auth/register', userData);
export const login = (credentials) => post('/auth/login', credentials);

export default API;
