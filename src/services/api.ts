
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
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
  
  getCurrentUser: () => 
    api.get('/auth/user'),
};

// Products API
export const productsAPI = {
  getAll: (params?: any) => 
    api.get('/products', { params }),
  
  getById: (id: string) => 
    api.get(`/products/${id}`),
  
  getByCategory: (categoryId: string) => 
    api.get(`/products/category/${categoryId}`),
  
  getByBrand: (brandId: string) => 
    api.get(`/products/brand/${brandId}`),
  
  getFeatured: () => 
    api.get('/products/featured'),
};

// Categories API
export const categoriesAPI = {
  getAll: () => 
    api.get('/categories'),
  
  getById: (id: string) => 
    api.get(`/categories/${id}`),
};

// Brands API
export const brandsAPI = {
  getAll: () => 
    api.get('/brands'),
  
  getById: (id: string) => 
    api.get(`/brands/${id}`),
  
  getFeatured: () => 
    api.get('/brands/featured'),
};

// Cart API
export const cartAPI = {
  get: () => 
    api.get('/cart'),
  
  update: (cartItems: any[]) => 
    api.put('/cart', { items: cartItems }),
  
  addItem: (productId: string, quantity: number, color: string, size: string) => 
    api.post('/cart/items', { productId, quantity, color, size }),
  
  updateItem: (itemId: string, quantity: number) => 
    api.put(`/cart/items/${itemId}`, { quantity }),
  
  removeItem: (itemId: string) => 
    api.delete(`/cart/items/${itemId}`),
  
  clear: () => 
    api.delete('/cart'),
};

// Orders API
export const ordersAPI = {
  getAll: () => 
    api.get('/orders'),
  
  getById: (id: string) => 
    api.get(`/orders/${id}`),
  
  create: (orderData: any) => 
    api.post('/orders', orderData),
};

// Admin API
export const adminAPI = {
  getDashboardData: () => 
    api.get('/admin/dashboard'),
  
  getAnalytics: () => 
    api.get('/admin/analytics'),
  
  getCustomers: () => 
    api.get('/admin/customers'),
  
  // Product management
  createProduct: (productData: any) => 
    api.post('/products', productData),
  
  updateProduct: (id: string, productData: any) => 
    api.put(`/products/${id}`, productData),
  
  deleteProduct: (id: string) => 
    api.delete(`/products/${id}`),
  
  // Brand management
  createBrand: (brandData: any) => 
    api.post('/brands', brandData),
  
  updateBrand: (id: string, brandData: any) => 
    api.put(`/brands/${id}`, brandData),
  
  deleteBrand: (id: string) => 
    api.delete(`/brands/${id}`),
  
  // Category management
  createCategory: (categoryData: any) => 
    api.post('/categories', categoryData),
  
  updateCategory: (id: string, categoryData: any) => 
    api.put(`/categories/${id}`, categoryData),
  
  deleteCategory: (id: string) => 
    api.delete(`/categories/${id}`),
  
  // Order management
  updateOrderStatus: (id: string, status: string) => 
    api.put(`/orders/${id}/status`, { status }),
};

export default api;
