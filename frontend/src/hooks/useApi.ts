import { useState, useEffect, useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { userAPI, analyticsAPI, adminAPI } from '../lib/api';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type ApiFunction<T, P = void> = (params?: P) => Promise<AxiosResponse<T>>;

export function useApi<T, P = void>(
  apiFunction: ApiFunction<T, P>,
  immediate = false,
  params?: P
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(
    async (requestParams?: P) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await apiFunction(requestParams || params);
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = 
          axiosError.response?.data?.error || 
          axiosError.message || 
          'An unknown error occurred';
        
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        throw error;
      }
    },
    [apiFunction, params]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
  };
}

// Specialized hooks for common API operations
export function useUsers() {
  return useApi(userAPI.getUsers, true);
}

export function useUser(id: string) {
  return useApi(() => userAPI.getUser(id), true);
}

export interface AnalyticsData {
  totalUsers: number;
  activeSessions: number;
  storageUsed: number;
  apiRequests: number;
  performance: {
    averageResponseTime: number;
    cpuUsage: number;
    memoryUsage: number;
    networkTraffic: number;
  };
  errors: Array<{
    id: string;
    timestamp: string;
    level: 'error' | 'warning';
    message: string;
  }>;
}

export function useAnalytics() {
  return useApi<AnalyticsData>(analyticsAPI.getStats, true);
}

export function useAdminSettings() {
  return useApi(adminAPI.getSettings, true);
} 