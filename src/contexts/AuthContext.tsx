
import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { User } from '@supabase/supabase-js';
// import { supabase } from '../services/supabaseService';
// import { AuthService } from '../services/authService';

// Mock user interface for development
interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    phone?: string;
  };
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock user for development
  const [user, setUser] = useState<MockUser | null>({
    id: 'mock-user-id',
    email: 'demo@example.com',
    user_metadata: {
      full_name: 'Demo User',
      phone: '+1234567890'
    }
  });
  const [loading, setLoading] = useState(false);

  // Mock authentication functions
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        id: 'mock-user-id',
        email,
        user_metadata: {
          full_name: 'Demo User',
          phone: '+1234567890'
        }
      });
      setLoading(false);
    }, 1000);
    return { success: true };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        id: 'mock-user-id',
        email,
        user_metadata: {
          full_name: userData.fullName || 'Demo User',
          phone: userData.phone || '+1234567890'
        }
      });
      setLoading(false);
    }, 1000);
    return { success: true };
  };

  const signOut = async () => {
    setUser(null);
  };

  const updateProfile = async (data: any) => {
    if (user) {
      setUser({
        ...user,
        user_metadata: {
          ...user.user_metadata,
          ...data
        }
      });
    }
    return { success: true };
  };

  /* COMMENTED OUT - AUTHENTICATION CODE
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await authService.login({ email, password });
    return result;
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const result = await authService.signUp({
      email,
      password,
      fullName: userData.fullName,
      phone: userData.phone
    });
    return result;
  };

  const signOut = async () => {
    await authService.logout();
  };

  const updateProfile = async (data: any) => {
    const result = await authService.updateProfile(data);
    return result;
  };
  */

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
