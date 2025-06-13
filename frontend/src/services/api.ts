import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8888',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('loggedin') || 'null');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
