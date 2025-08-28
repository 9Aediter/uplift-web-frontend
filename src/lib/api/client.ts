// API Client for NestJS Backend
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

console.log("🌐 API Base URL:", API_BASE_URL);

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Send cookies with requests (including httpOnly cookies)
  headers: {
    "Content-Type": "application/json",
  },
});


// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    console.log("📤 Request data:", config.data)
    console.log("🍪 Cookies will be sent:", document.cookie)
    console.log("🔧 WithCredentials:", config.withCredentials)
    
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error)
    return Promise.reject(error);
  }
);

// No auto refresh logic - handled by useAuthInit flow

// Simple response interceptor - no auto refresh (handled by useAuthInit)
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`)
    return response;
  },
  async (error) => {
    // Just pass through errors - let useAuthInit handle authentication flow
    console.log(`❌ API Error: ${error.response?.status} ${error.config?.method?.toUpperCase()} ${error.config?.url}`)
    return Promise.reject(error);
  }
);

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Helper function to format error message
const formatErrorMessage = (error: any): string => {
  if (error.response) {
    const status = error.response.status;
    const statusText = error.response.statusText;
    const message = error.response.data?.message || error.response.data?.error || statusText;
    
    return `Error ${status} ${statusText} - ${message}`;
  }
  return error.message;
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
    } catch (error: any) {
      return {
        success: false,
        error: formatErrorMessage(error),
      };
    }
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: formatErrorMessage(error),
      };
    }
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
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
    } catch (error: any) {
      return {
        success: false,
        error: formatErrorMessage(error),
      };
    }
  },
};

export default api;
