
import Constants from 'expo-constants';

interface EnvConfig {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  API_URL?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class EnvironmentConfig implements EnvConfig {
  public readonly SUPABASE_URL: string;
  public readonly SUPABASE_ANON_KEY: string;
  public readonly API_URL?: string;

  constructor() {
    // COMMENTED OUT: Authentication disabled - use mock values
    // this.SUPABASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
    // this.SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
    
    // Mock values for demo mode
    this.SUPABASE_URL = 'https://demo.supabase.co';
    this.SUPABASE_ANON_KEY = 'demo-key';
    this.API_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL;
  }

  validate(): ValidationResult {
    // COMMENTED OUT: Authentication disabled - always return valid
    // const errors: string[] = [];

    // if (!this.SUPABASE_URL) {
    //   errors.push('EXPO_PUBLIC_SUPABASE_URL is required');
    // }

    // if (!this.SUPABASE_ANON_KEY) {
    //   errors.push('EXPO_PUBLIC_SUPABASE_ANON_KEY is required');
    // }

    // return {
    //   isValid: errors.length === 0,
    //   errors
    // };

    // Always return valid for demo mode
    return {
      isValid: true,
      errors: []
    };
  }
}

export const env = new EnvironmentConfig();
