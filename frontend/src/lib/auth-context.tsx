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

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
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
      
      // In a real app, this would be an API call
      // For demo, we'll simulate a login with mock data
      const mockUsers = {
        'admin@example.com': {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: UserRole.ADMIN,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
        },
        'client@example.com': {
          id: '2',
          name: 'Client User',
          email: 'client@example.com',
          role: UserRole.CLIENT,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=client'
        },
        'student@example.com': {
          id: '3',
          name: 'Student User',
          email: 'student@example.com',
          role: UserRole.STUDENT,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student'
        }
      };

      const userData = mockUsers[email as keyof typeof mockUsers];
      
      if (userData && password === 'password') {
        localStorage.setItem('auth_token', 'mock_token');
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading, error }}>
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