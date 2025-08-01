
import { createClient } from '@supabase/supabase-js';
import { env } from './config/env';

export const testSupabaseConnection = async () => {
  // COMMENTED OUT: Authentication disabled - return success without testing
  // try {
  //   console.log('Testing Supabase connection...');
    
  //   const validation = env.validate();
  //   if (!validation.isValid) {
  //     console.error('Environment validation failed:', validation.errors);
  //     return false;
  //   }

  //   const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    
  //   // Test connection by trying to get session
  //   const { data, error } = await supabase.auth.getSession();
    
  //   if (error) {
  //     console.error('Supabase connection error:', error);
  //     return false;
  //   }

  //   console.log('Supabase connected successfully!');
  //   return true;
  // } catch (error) {
  //   console.error('Supabase test failed:', error);
  //   return false;
  // }

  // Return success for demo mode
  console.log('Demo mode: Supabase connection test skipped');
  return true;
};
