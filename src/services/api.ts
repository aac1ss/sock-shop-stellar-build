
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured'),
  getByCategory: (categoryId: string) => api.get(`/products/category/${categoryId}`),
  getByBrand: (brandId: string) => api.get(`/products/brand/${brandId}`),
  create: (product: any) => api.post('/products', product),
  update: (id: string, product: any) => api.put(`/products/${id}`, product),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (order: any) => api.post('/orders', order),
  update: (id: string, order: any) => api.put(`/orders/${id}`, order),
  delete: (id: string) => api.delete(`/orders/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (item: any) => api.post('/cart', item),
  updateItem: (itemId: string, quantity: number) => api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: string) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id: string) => api.get(`/categories/${id}`),
  create: (category: any) => api.post('/categories', category),
  update: (id: string, category: any) => api.put(`/categories/${id}`, category),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Brands API
export const brandsAPI = {
  getAll: () => api.get('/brands'),
  getById: (id: string) => api.get(`/brands/${id}`),
  create: (brand: any) => api.post('/brands', brand),
  update: (id: string, brand: any) => api.put(`/brands/${id}`, brand),
  delete: (id: string) => api.delete(`/brands/${id}`),
};

export default api;
