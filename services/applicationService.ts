import apiClient from './apiClient';
import { ApiResponse, LoanApplication } from '@/types';

export const applicationService = {
  async createApplication(data: Partial<LoanApplication>): Promise<ApiResponse<LoanApplication>> {
    const response = await apiClient.post('/applications', data);
    return response.data;
  },

  async getApplications(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<{ applications: LoanApplication[]; totalCount: number }>> {
    const response = await apiClient.get('/applications', { params: { page, limit } });
    return response.data;
  },

  async getApplicationById(applicationId: string): Promise<ApiResponse<LoanApplication>> {
    const response = await apiClient.get(`/applications/${applicationId}`);
    return response.data;
  },

  async updateApplication(
    applicationId: string,
    data: Partial<LoanApplication>
  ): Promise<ApiResponse<LoanApplication>> {
    const response = await apiClient.put(`/applications/${applicationId}`, data);
    return response.data;
  },

  async submitApplication(applicationId: string): Promise<ApiResponse<LoanApplication>> {
    const response = await apiClient.post(`/applications/${applicationId}/submit`);
    return response.data;
  },

  async uploadApplicationDocument(
    applicationId: string,
    formData: FormData
  ): Promise<ApiResponse<{ documentId: string }>> {
    const response = await apiClient.post(`/applications/${applicationId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async getApplicationDocuments(applicationId: string): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get(`/applications/${applicationId}/documents`);
    return response.data;
  },

  async getApplicationStatus(applicationId: string): Promise<ApiResponse<{ status: string }>> {
    const response = await apiClient.get(`/applications/${applicationId}/status`);
    return response.data;
  },
};
