import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export const HealthCheck = () => {
  const [status, setStatus] = useState<string>('Checking...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get('/health');
        setStatus(response.data.status);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to API');
        setStatus('Error');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">API Health Check</h2>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`} />
        <span>{status === 'ok' ? 'Connected to API' : 'Not connected'}</span>
      </div>
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}; 