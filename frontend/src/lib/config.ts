// API configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, use relative path
  : 'http://localhost:5000/api';  // In development, use local server

// Other configuration constants can be added here
export const APP_NAME = 'Data Science Hub';
export const APP_VERSION = '1.0.0'; 