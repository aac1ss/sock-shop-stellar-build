
import axios from 'axios';

// Set default base URL from environment variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token with every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    
    // Handle authentication errors
    if (status === 401) {
      localStorage.removeItem('token');
      // Optionally, redirect to login
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Export all API endpoints
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
  
  getCurrentUser: () => 
    api.get('/auth/user'),
};

export const productsAPI = {
  getAll: (params?: any) => 
    api.get('/products', { params }),
  
  getById: (id: string) => 
    api.get(`/products/${id}`),
};

// Add more API endpoints as needed...

export default api;
