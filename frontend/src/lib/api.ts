import { API_BASE_URL } from './config';

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}

// API methods
export const api = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) => 
      fetchAPI('/login', { method: 'POST', body: JSON.stringify(data) }),
    signup: (data: { name: string; email: string; password: string }) => 
      fetchAPI('/signup', { method: 'POST', body: JSON.stringify(data) }),
    logout: () => fetchAPI('/logout', { method: 'POST' }),
  },
  
  // Courses endpoints
  courses: {
    getAll: () => fetchAPI('/courses'),
    getById: (id: number) => fetchAPI(`/courses/${id}`),
  },
  
  // Add more API methods as needed
}; 