import apiClient from './apiClient';
import { ApiResponse } from '@/types';
import Cookie from 'js-cookie';

/**
 * Auth Service - Handles all authentication API calls
 */
export const authService = {
  // Register new user - sends OTP to email
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }): Promise<any> {
    try {
      const response = await apiClient.post('/v1/auth/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phoneNumber: data.phoneNumber || '',
        dateOfBirth: data.dateOfBirth,
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zipCode || '',
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Verify OTP and complete registration
  async verifyOtp(data: {
    email: string;
    otp: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  }): Promise<any> {
    try {
      const response = await apiClient.post('/v1/auth/verify-otp', {
        email: data.email,
        otp: data.otp,
        type: 'registration',
        registerData: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
      });

      if (response.data?.accessToken) {
        Cookie.set('auth_token', response.data.accessToken, { expires: 7 });
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Send OTP for email verification
  async sendOtp(email: string, type: string = 'registration'): Promise<any> {
    try {
      const response = await apiClient.post('/v1/auth/send-otp', { email, type });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Login user
  async login(data: { email: string; password: string; rememberMe?: boolean }): Promise<any> {
    try {
      const response = await apiClient.post('/v1/auth/login', {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false,
      });

      if (response.data?.accessToken) {
        Cookie.set('auth_token', response.data.accessToken, { 
          expires: data.rememberMe ? 30 : 7 
        });
        if (data.rememberMe) {
          localStorage.setItem('rememberedEmail', data.email);
        }
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Forgot password - send OTP
  async forgotPassword(email: string): Promise<any> {
    try {
      const response = await apiClient.post('/v1/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Reset password with OTP
  async resetPassword(data: {
    email: string;
    token: string;
    newPassword: string;
  }): Promise<any> {
    try {
      const response = await apiClient.post('/v1/auth/reset-password', {
        email: data.email,
        token: data.token,
        newPassword: data.newPassword,
      });

      if (response.data?.accessToken) {
        Cookie.set('auth_token', response.data.accessToken, { expires: 7 });
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Change password (authenticated)
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<any> {
    try {
      const response = await apiClient.post('/v1/auth/change-password', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await apiClient.post('/v1/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookie.remove('auth_token');
      localStorage.removeItem('rememberedEmail');
    }
  },

  // Get current user
  async getCurrentUser(): Promise<any> {
    try {
      const response = await apiClient.get('/v1/auth/me');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Refresh token
  async refreshToken(): Promise<any> {
    try {
      const response = await apiClient.post('/v1/auth/refresh', {});
      if (response.data?.accessToken) {
        Cookie.set('auth_token', response.data.accessToken, { expires: 7 });
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // Get stored token
  getToken(): string | null {
    return Cookie.get('auth_token') || null;
  },

  // Check if token exists
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Get remembered email
  getRememberedEmail(): string | null {
    return localStorage.getItem('rememberedEmail');
  },
};
