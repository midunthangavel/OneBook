import { createClient } from '@supabase/supabase-js';
import { env } from '../utils/config/env';

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseAuth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }
    });
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  signOut: async () => {
    return await supabase.auth.signOut();
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  }
};

export const databaseService = {
  getUserProfile: async (userId: string) => {
    return await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  },

  updateUserProfile: async (userId: string, data: any) => {
    return await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId)
      .select()
      .single();
  },

  getVenues: async () => {
    return await supabase
      .from('venues')
      .select('*');
  },

  getBookings: async (userId: string) => {
    return await supabase
      .from('bookings')
      .select('*, venues(*)')
      .eq('user_id', userId);
  },

  getFavorites: async (userId: string) => {
    return await supabase
      .from('favorites')
      .select('*, venues(*)')
      .eq('user_id', userId);
  }
};