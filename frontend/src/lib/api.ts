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

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error
      const status = error.response.status;
      const errorMessage = error.response.data?.error || error.response.data?.message || 'An error occurred';
      
      switch (status) {
        case 400:
          console.error('Bad Request:', errorMessage);
          break;
        case 401:
          console.error('Unauthorized:', errorMessage);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden:', errorMessage);
          break;
        case 404:
          console.error('Not Found:', errorMessage);
          break;
        case 500:
          console.error('Server Error:', errorMessage);
          break;
        default:
          console.error(`Error ${status}:`, errorMessage);
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', 'No response received from server');
    } else {
      // Error setting up request
      console.error('Request Error:', error.message);
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
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
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

export { api }; 