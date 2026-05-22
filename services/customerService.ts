import apiClient from './apiClient';
import { ApiResponse, Customer } from '@/types';

export const customerService = {
  async getProfile(): Promise<ApiResponse<Customer>> {
    const response = await apiClient.get('/customers/profile');
    return response.data;
  },

  async updateProfile(customerId: string, data: Partial<Customer>): Promise<ApiResponse<Customer>> {
    const response = await apiClient.put(`/customers/${customerId}`, data);
    return response.data;
  },

  async uploadDocument(
    customerId: string,
    formData: FormData
  ): Promise<ApiResponse<{ documentId: string }>> {
    const response = await apiClient.post(`/customers/${customerId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async getDocuments(customerId: string): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get(`/customers/${customerId}/documents`);
    return response.data;
  },

  async deleteDocument(customerId: string, documentId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/customers/${customerId}/documents/${documentId}`);
    return response.data;
  },
};
