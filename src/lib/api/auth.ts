// Authentication API functions
import { apiClient as api } from './client';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User 
} from '@/types/auth';

export const authApi = {
  // Check auth status - ตรวจสอบสถานะ authentication
  checkStatus: async (): Promise<{ data: { authenticated: boolean; needsRefresh?: boolean } }> => {
    return api.get<{ authenticated: boolean; needsRefresh?: boolean }>('/v1/auth/status');
  },

  // Login - สมัครสมาชิก
  login: async (credentials: LoginRequest): Promise<{ data: AuthResponse }> => {
    return api.post<AuthResponse>('/v1/auth/login', credentials);
  },

  // Register - เข้าสู่ระบบ
  register: async (userData: RegisterRequest): Promise<{ data: AuthResponse }> => {
    return api.post<AuthResponse>('/v1/auth/register', userData);
  },

  // Refresh Token - ต่ออายุ token (ใช้ refreshToken จาก httpOnly cookie)
  refreshToken: async (): Promise<{ data: RefreshTokenResponse }> => {
    return api.post<RefreshTokenResponse>('/v1/auth/refresh');
  },

  // Logout - ออกจากระบบ
  logout: async (): Promise<void> => {
    return api.post('/v1/auth/logout');
  },

  // Get current user profile - ดูข้อมูล user ปัจจุบัน
  me: async (): Promise<{ data: User }> => {
    return api.get<User>('/v1/auth/me');
  },

  // OAuth URLs - Social Login
  getOAuthUrl: (provider: 'google' | 'facebook' | 'github' | 'line') => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return `${baseUrl}/v1/auth/${provider}`;
  },

  // LINE LIFF Authentication - send LIFF token to backend
  lineAuth: async (accessToken: string, profile: any): Promise<{ data: AuthResponse }> => {
    return api.post<AuthResponse>('/v1/auth/line/liff', {
      accessToken,
      profile
    });
  },

  // OAuth Callback endpoints (handled by backend redirects)
  // GET /v1/auth/google/callback
  // GET /v1/auth/facebook/callback  
  // GET /v1/auth/github/callback
  // GET /v1/auth/line/callback
  // POST /v1/auth/line/liff (for LIFF token auth)
};

export default authApi;