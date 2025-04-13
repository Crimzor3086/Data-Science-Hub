import { useState, useEffect } from 'react';
import { healthCheck } from '@/lib/api';

export const HealthCheck = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await healthCheck();
        if (response.status === 'ok') {
          setStatus('connected');
          setError(null);
        } else {
          setStatus('error');
          setError('Unexpected response from server');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to connect to server');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
      <div
        className={`w-3 h-3 rounded-full ${
          status === 'checking'
            ? 'bg-yellow-400 animate-pulse'
            : status === 'connected'
            ? 'bg-green-500'
            : 'bg-red-500'
        }`}
      />
      <span className="text-sm font-medium">
        {status === 'checking'
          ? 'Checking connection...'
          : status === 'connected'
          ? 'Connected to API'
          : 'Connection failed'}
      </span>
      {error && (
        <span className="text-sm text-red-500 ml-2" title={error}>
          {error}
        </span>
      )}
    </div>
  );
}; 