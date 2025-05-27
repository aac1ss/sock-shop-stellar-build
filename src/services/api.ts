
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6969/api';

console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method, config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    
    const { status } = error.response || {};
    
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) => 
    api.post('/auth/register', userData),
  
  getCurrentUser: () => 
    api.get('/auth/user'),
};

export const productsAPI = {
  getAll: (params?: any) => 
    api.get('/products', { params }),
  
  getById: (id: string) => 
    api.get(`/products/${id}`),
    
  getByCategory: (categoryId: string) => 
    api.get(`/products/category/${categoryId}`),

  create: (productData: any) =>
    api.post('/products', productData),

  update: (id: string, productData: any) =>
    api.put(`/products/${id}`, productData),

  delete: (id: string) =>
    api.delete(`/products/${id}`),
};

export const categoriesAPI = {
  getAll: () => 
    api.get('/categories'),
  
  getById: (id: string) => 
    api.get(`/categories/${id}`),

  create: (categoryData: any) =>
    api.post('/categories', categoryData),

  update: (id: string, categoryData: any) =>
    api.put(`/categories/${id}`, categoryData),

  delete: (id: string) =>
    api.delete(`/categories/${id}`),
};

export const brandsAPI = {
  getAll: () => 
    api.get('/brands'),
  
  getById: (id: string) => 
    api.get(`/brands/${id}`),

  create: (brandData: any) =>
    api.post('/brands', brandData),

  update: (id: string, brandData: any) =>
    api.put(`/brands/${id}`, brandData),

  delete: (id: string) =>
    api.delete(`/brands/${id}`),
};

export const cartAPI = {
  getCart: () =>
    api.get('/cart'),

  addItem: (item: any) =>
    api.post('/cart', item),

  updateItem: (itemId: string, data: any) =>
    api.put(`/cart/items/${itemId}`, data),

  removeItem: (itemId: string) =>
    api.delete(`/cart/items/${itemId}`),

  clearCart: () =>
    api.delete('/cart'),
};

export const ordersAPI = {
  getAll: () =>
    api.get('/orders'),

  getById: (id: string) =>
    api.get(`/orders/${id}`),

  create: (orderData: any) =>
    api.post('/orders', orderData),

  updateStatus: (id: string, status: string) =>
    api.put(`/orders/${id}/status`, { status }),
};

export const adminAPI = {
  getAnalytics: () =>
    api.get('/admin/analytics'),

  getCustomers: () =>
    api.get('/admin/customers'),

  updateCustomer: (id: string, data: any) =>
    api.put(`/admin/customers/${id}`, data),
};

export default api;
