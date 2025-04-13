import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from './api';
import { toast } from '@/hooks/use-toast';
import { UserRole, getRolePermissions } from './roles';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'client';
  company?: string;
  position?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // In a real app, validate token with backend
          const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
          if (userData.id) {
            setUser(userData);
          }
        }
      } catch (err) {
        setError('Authentication error');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.post('/auth/login', { email, password });
      const userData = response.data;
      
      if (!userData.token || !userData.user) {
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem('auth_token', userData.token);
      localStorage.setItem('user_data', JSON.stringify(userData.user));
      setUser(userData.user);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate required fields
      if (!data.email || !data.password || !data.name) {
        throw new Error('All fields are required');
      }
      
      // Validate email format
      if (!/\S+@\S+\.\S+/.test(data.email)) {
        throw new Error('Invalid email format');
      }
      
      // Validate password strength
      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const response = await api.post('/auth/register', data);
      const userData = response.data;
      
      if (!userData.token || !userData.user) {
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem('auth_token', userData.token);
      localStorage.setItem('user_data', JSON.stringify(userData.user));
      setUser(userData.user);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 