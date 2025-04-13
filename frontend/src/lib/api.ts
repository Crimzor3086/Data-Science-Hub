import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: { name: string; email: string; password: string; role?: string }) => 
    api.post('/auth/register', userData),
  
  getCurrentUser: () => 
    api.get('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};

// User API
export const userAPI = {
  getUsers: () => 
    api.get('/users'),
  
  getUser: (id: string) => 
    api.get(`/users/${id}`),
  
  createUser: (userData: any) => 
    api.post('/users', userData),
  
  updateUser: (id: string, userData: any) => 
    api.patch(`/users/${id}`, userData),
  
  deleteUser: (id: string) => 
    api.delete(`/users/${id}`),
  
  searchUsers: (params: any) => 
    api.get('/admin/users/search', { params }),
  
  bulkUserOperation: (operation: string, userIds: string[], data?: any) => 
    api.post('/admin/users/bulk', { operation, userIds, data }),
  
  exportUsers: (format: string = 'json') => 
    api.get('/admin/users/export', { params: { format } })
};

// Analytics API
export const analyticsAPI = {
  getStats: () => 
    api.get('/analytics/stats'),
  
  getActivity: () => 
    api.get('/analytics/activity'),
  
  getGrowth: () => 
    api.get('/analytics/growth'),
  
  getActivityByRole: () => 
    api.get('/analytics/activity-by-role'),
  
  getRegistrationTrends: (period: string = 'month') => 
    api.get('/analytics/registration-trends', { params: { period } }),
  
  getPerformance: () => 
    api.get('/analytics/performance'),
  
  getErrors: () => 
    api.get('/analytics/errors')
};

// Admin API
export const adminAPI = {
  getSettings: () => 
    api.get('/admin/settings'),
  
  updateSettings: (settings: any) => 
    api.patch('/admin/settings', settings),
  
  getLogs: (type: string = 'all', limit: number = 50) => 
    api.get('/admin/logs', { params: { type, limit } })
};

export default api; 