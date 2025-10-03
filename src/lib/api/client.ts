// API Client for NestJS Backend
import axios from "axios";
import type { ApiResponse } from '@/types/models/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Send cookies with requests (including httpOnly cookies)
  headers: {
    "Content-Type": "application/json",
  },
});


// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// No auto refresh logic - handled by useAuthInit flow

// Simple response interceptor - no auto refresh (handled by useAuthInit)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Just pass through errors - let useAuthInit handle authentication flow
    return Promise.reject(error);
  }
);

// Export ApiResponse from types
export type { ApiResponse } from '@/types/models/api';

// Helper function to format error message
const formatErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { status: number; statusText: string; data?: { message?: string; error?: string } } };
    if (axiosError.response) {
      const { status, statusText, data } = axiosError.response;
      const message = data?.message || data?.error || statusText;
      return `Error ${status} ${statusText} - ${message}`;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

// Generic API methods
export const api = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: formatErrorMessage(error),
      };
    }
  },

  post: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: formatErrorMessage(error),
      };
    }
  },

  put: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: formatErrorMessage(error),
      };
    }
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: formatErrorMessage(error),
      };
    }
  },
};

export default api;
