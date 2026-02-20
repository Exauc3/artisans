import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function DemoDataInitializer() {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeDemoData();
  }, []);

  const initializeDemoData = async () => {
    try {
      const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-c2122655`;
      
      const response = await fetch(`${API_BASE}/init-demo-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      console.log('Demo data initialization:', data);
      setInitialized(true);
    } catch (error) {
      console.error('Error initializing demo data:', error);
      // Don't block the app if demo data init fails
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-blue-50 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4"></div>
          <p className="text-gray-700 text-lg">Initialisation...</p>
        </div>
      </div>
    );
  }

  return null;
}
