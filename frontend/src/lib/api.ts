import axios from 'axios';

// Types and Interfaces
interface UserData {
  name: string;
  email: string;
  password: string;
  role?: string;
  company?: string;
  position?: string;
  phone?: string;
}

interface UserUpdateData {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  company?: string;
  position?: string;
  phone?: string;
}

interface SearchParams {
  query?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface BulkOperationData {
  status?: string;
  role?: string;
  permissions?: string[];
}

interface AnalyticsParams {
  period?: 'day' | 'week' | 'month' | 'year';
  startDate?: string;
  endDate?: string;
}

interface AdminSettings {
  security?: {
    passwordPolicy?: {
      minLength?: number;
      requireSpecialChars?: boolean;
      requireNumbers?: boolean;
    };
    sessionTimeout?: number;
    maxLoginAttempts?: number;
  };
  email?: {
    smtpServer?: string;
    smtpPort?: number;
    senderEmail?: string;
  };
  notifications?: {
    emailNotifications?: boolean;
    systemAlerts?: boolean;
  };
}

// Create axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
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

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem(import.meta.env.VITE_USER_DATA_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: UserData) => 
    api.post('/auth/register', userData),
  
  getCurrentUser: () => 
    api.get('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem(import.meta.env.VITE_USER_DATA_KEY);
    return Promise.resolve();
  }
};

// User API
export const userAPI = {
  getUsers: () => 
    api.get('/users'),
  
  getUser: (id: string) => 
    api.get(`/users/${id}`),
  
  createUser: (userData: UserData) => 
    api.post('/users', userData),
  
  updateUser: (id: string, userData: UserUpdateData) => 
    api.patch(`/users/${id}`, userData),
  
  deleteUser: (id: string) => 
    api.delete(`/users/${id}`),
  
  searchUsers: (params: SearchParams) => 
    api.get('/admin/users/search', { params }),
  
  bulkUserOperation: (operation: string, userIds: string[], data?: BulkOperationData) => 
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
  
  updateSettings: (settings: AdminSettings) => 
    api.patch('/admin/settings', settings),
  
  getLogs: (type: string = 'all', limit: number = 50) => 
    api.get('/admin/logs', { params: { type, limit } })
};

// Search API
export const searchAPI = {
  search: (query: string) => 
    api.get(`/search?q=${encodeURIComponent(query)}`),
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Failed to connect to server');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem(import.meta.env.VITE_USER_DATA_KEY);
  window.location.href = '/login';
};

export { api }; 