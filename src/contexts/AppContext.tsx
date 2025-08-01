import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../utils/config/env';

interface AppContextType {
  supabase: SupabaseClient | null;
  isLoading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType>({
  supabase: null,
  isLoading: true,
  error: null,
});

export const useAppContext = () => useContext(AppContext);
export const useApp = useAppContext; // Alias for backward compatibility

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const validation = env.validate();
      if (!validation.isValid) {
        setError(`Configuration error: ${validation.errors.join(', ')}`);
        setIsLoading(false);
        return;
      }

      const client = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
      setSupabase(client);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize Supabase');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider value={{ supabase, isLoading, error }}>
      {children}
    </AppContext.Provider>
  );
};