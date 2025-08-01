import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { env } from '../utils/config/env';

// Types
interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
  
  // App state
  supabase: SupabaseClient | null;
  isInitialized: boolean;
  initError: string | null;
  
  // UI state
  theme: 'light' | 'dark';
  isOnline: boolean;
}

type AppAction =
  | { type: 'INIT_START' }
  | { type: 'INIT_SUCCESS'; payload: { supabase: SupabaseClient } }
  | { type: 'INIT_ERROR'; payload: { error: string } }
  | { type: 'AUTH_LOADING'; payload: { loading: boolean } }
  | { type: 'AUTH_SUCCESS'; payload: { user: User } }
  | { type: 'AUTH_ERROR'; payload: { error: string } }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'SET_THEME'; payload: { theme: 'light' | 'dark' } }
  | { type: 'SET_ONLINE_STATUS'; payload: { isOnline: boolean } }
  | { type: 'CLEAR_ERROR'; payload: { errorType: 'auth' | 'init' } };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Convenience methods
  clearAuthError: () => void;
  clearInitError: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  authLoading: true,
  authError: null,
  supabase: null,
  isInitialized: false,
  initError: null,
  theme: 'light',
  isOnline: true,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'INIT_START':
      return {
        ...state,
        isInitialized: false,
        initError: null,
      };
    
    case 'INIT_SUCCESS':
      return {
        ...state,
        supabase: action.payload.supabase,
        isInitialized: true,
        initError: null,
      };
    
    case 'INIT_ERROR':
      return {
        ...state,
        supabase: null,
        isInitialized: false,
        initError: action.payload.error,
      };
    
    case 'AUTH_LOADING':
      return {
        ...state,
        authLoading: action.payload.loading,
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        authLoading: false,
        authError: null,
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authLoading: false,
        authError: action.payload.error,
      };
    
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authLoading: false,
        authError: null,
      };
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload.theme,
      };
    
    case 'SET_ONLINE_STATUS':
      return {
        ...state,
        isOnline: action.payload.isOnline,
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        ...(action.payload.errorType === 'auth' && { authError: null }),
        ...(action.payload.errorType === 'init' && { initError: null }),
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize Supabase
  useEffect(() => {
    const initializeApp = async () => {
      dispatch({ type: 'INIT_START' });
      
      try {
        const validation = env.validate();
        if (!validation.isValid) {
          throw new Error(`Configuration error: ${validation.errors.join(', ')}`);
        }

        const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
        dispatch({ type: 'INIT_SUCCESS', payload: { supabase } });

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              dispatch({ type: 'AUTH_SUCCESS', payload: { user: session.user } });
            } else if (event === 'SIGNED_OUT') {
              dispatch({ type: 'AUTH_LOGOUT' });
            }
          }
        );

        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          dispatch({ type: 'AUTH_SUCCESS', payload: { user: session.user } });
        } else {
          dispatch({ type: 'AUTH_LOADING', payload: { loading: false } });
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to initialize app';
        dispatch({ type: 'INIT_ERROR', payload: { error: errorMessage } });
      }
    };

    initializeApp();
  }, []);

  // Convenience methods
  const clearAuthError = () => {
    dispatch({ type: 'CLEAR_ERROR', payload: { errorType: 'auth' } });
  };

  const clearInitError = () => {
    dispatch({ type: 'CLEAR_ERROR', payload: { errorType: 'init' } });
  };

  const setTheme = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: { theme } });
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    clearAuthError,
    clearInitError,
    setTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useAppStore = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
