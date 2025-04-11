import { API_BASE_URL } from './config';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Add auth token to headers if available
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}

// API methods
export const api = {
  // Courses endpoints
  courses: {
    getAll: () => fetchAPI('/courses'),
    getById: (id: number) => fetchAPI(`/courses/${id}`),
  },
  
  // Profile endpoints
  profile: {
    get: (userId: string) => fetchAPI(`/profile?user_id=${userId}`),
    update: (userId: string, data: any) =>
      fetchAPI(`/profile?user_id=${userId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    create: (data: any) =>
      fetchAPI('/profile', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  
  // Add more API methods as needed
}; 