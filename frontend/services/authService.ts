import apiClient from './apiClient';
import { ApiResponse } from '@/types';
import Cookie from 'js-cookie';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  dateOfBirth: string;
}

interface AuthResponse {
  user: { id: string; email: string; name: string };
  token: string;
}

export const authService = {
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post('/auth/login', data);
    if (response.data.data?.token) {
      Cookie.set('auth_token', response.data.data.token, { expires: 7 });
    }
    return response.data;
  },

  async logout(): Promise<void> {
    Cookie.remove('auth_token');
    await apiClient.post('/auth/logout');
  },

  async verifyOtp(mobileNumber: string, otp: string): Promise<ApiResponse<{ verified: boolean }>> {
    const response = await apiClient.post('/auth/verify-otp', { mobileNumber, otp });
    return response.data;
  },

  async sendOtp(mobileNumber: string): Promise<ApiResponse<{ otpSent: boolean }>> {
    const response = await apiClient.post('/auth/send-otp', { mobileNumber });
    return response.data;
  },

  async resetPassword(email: string, token: string, newPassword: string): Promise<ApiResponse<void>> {
    const response = await apiClient.post('/auth/reset-password', { email, token, newPassword });
    return response.data;
  },

  getToken(): string | null {
    return Cookie.get('auth_token') || null;
  },

  isTokenValid(): boolean {
    return !!this.getToken();
  },
};
