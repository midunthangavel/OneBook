import { supabaseAuth, databaseService } from './supabaseService';
import { User, LoginCredentials, SignupData, ProfileUpdateData } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface AuthResponse {
  user?: any;
  token?: string;
  refreshToken?: string;
  message?: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const { data, error } = await supabaseAuth.signIn(credentials.email, credentials.password);

    if (error) {
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      data: { 
        user: data.user,
        token: data.session?.access_token,
        refreshToken: data.session?.refresh_token
      } 
    };
  }

  async signUp(signupData: SignupData): Promise<ApiResponse<AuthResponse>> {
    const { data, error } = await supabaseAuth.signUp(
      signupData.email, 
      signupData.password,
      {
        full_name: signupData.fullName,
        phone: signupData.phone
      }
    );

    if (error) {
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      data: { 
        user: data.user,
        message: 'Please check your email for verification'
      } 
    };
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    const { error } = await supabaseAuth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data: { message: 'Logged out successfully' } };
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const { user, error } = await supabaseAuth.getCurrentUser();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data: user };
  }

  async getProfile(): Promise<ApiResponse<User>> {
    const { user, error } = await supabaseAuth.getCurrentUser();
    if (error || !user) {
      return { success: false, error: error?.message || 'User not found' };
    }

    const { data, error: profileError } = await databaseService.getUserProfile(user.id);
    if (profileError) {
      return { success: false, error: profileError.message };
    }

    return { success: true, data };
  }

  async updateProfile(data: ProfileUpdateData): Promise<ApiResponse<User>> {
    const { user, error } = await supabaseAuth.getCurrentUser();
    if (error || !user) {
      return { success: false, error: error?.message || 'User not found' };
    }

    const { data: updatedProfile, error: updateError } = await databaseService.updateUserProfile(user.id, data);
    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updatedProfile };
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    const { data, error } = await supabaseAuth.resetPassword(email);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data: { message: 'Password reset email sent' } };
  }
}

export const authService = new AuthService();