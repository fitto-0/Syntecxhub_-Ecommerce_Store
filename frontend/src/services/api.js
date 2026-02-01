import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Don't set Content-Type for FormData - let axios handle it
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  uploadProfileImage: (formData) => api.post('/auth/upload-profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Product Services
export const productService = {
  getAllProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  addReview: (id, reviewData) => api.post(`/products/${id}/review`, reviewData),
};

// Cart Services
export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (cartData) => api.post('/cart/add', cartData),
  updateCartItem: (itemId, quantity) => api.put(`/cart/item/${itemId}`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/item/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

// Order Services
export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrder: (id, orderData) => api.put(`/orders/${id}`, orderData),
  getAllOrders: () => api.get('/orders/admin/all'),
};

export default api;
