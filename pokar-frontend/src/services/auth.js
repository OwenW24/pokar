import * as api from '../api';

export const login = async (credentials) => {
  try {
    const { data } = await api.login(credentials);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    const { data } = await api.register(userData);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const verifyToken = async () => {
  try {
    const { data } = await api.get('/auth/verify');
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.post('/auth/refresh', { token });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    logout();
    throw error.response?.data || error.message;
  }
};