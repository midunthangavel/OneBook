import { useCallback } from 'react';
import { useAppStore } from '../store/AppStore';

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
}

export const useAuthActions = (): AuthActions => {
  const { state, dispatch } = useAppStore();
  const { supabase } = state;

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not initialized');
    
    dispatch({ type: 'AUTH_LOADING', payload: { loading: true } });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: { user: data.user } });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign in failed';
      dispatch({ type: 'AUTH_ERROR', payload: { error: message } });
      throw error;
    }
  }, [supabase, dispatch]);

  const signUp = useCallback(async (email: string, password: string, userData?: any) => {
    if (!supabase) throw new Error('Supabase not initialized');
    
    dispatch({ type: 'AUTH_LOADING', payload: { loading: true } });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: { user: data.user } });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign up failed';
      dispatch({ type: 'AUTH_ERROR', payload: { error: message } });
      throw error;
    }
  }, [supabase, dispatch]);

  const signOut = useCallback(async () => {
    if (!supabase) throw new Error('Supabase not initialized');
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign out failed';
      dispatch({ type: 'AUTH_ERROR', payload: { error: message } });
      throw error;
    }
  }, [supabase, dispatch]);

  const resetPassword = useCallback(async (email: string) => {
    if (!supabase) throw new Error('Supabase not initialized');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Password reset failed';
      dispatch({ type: 'AUTH_ERROR', payload: { error: message } });
      throw error;
    }
  }, [supabase, dispatch]);

  const updateProfile = useCallback(async (updates: any) => {
    if (!supabase) throw new Error('Supabase not initialized');
    
    try {
      const { data, error } = await supabase.auth.updateUser(updates);
      if (error) throw error;
      
      if (data.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: { user: data.user } });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile update failed';
      dispatch({ type: 'AUTH_ERROR', payload: { error: message } });
      throw error;
    }
  }, [supabase, dispatch]);

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };
};
