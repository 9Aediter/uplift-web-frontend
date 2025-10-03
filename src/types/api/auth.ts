/**
 * Auth API Types
 * Backend API response types for authentication endpoints
 */

import { ApiResponse } from './response';

export interface AuthUserApiData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: Array<{
    id: string;
    name: string;
    pathRoles: string;
    type: string;
  }>;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUserApiData;
  token: string;
  refreshToken: string;
  message?: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface AuthStatusResponse {
  authenticated: boolean;
  needsRefresh?: boolean;
  user?: AuthUserApiData;
}

// Response types
export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;
export type MeResponse = ApiResponse<AuthUserApiData>;
export type CheckStatusResponse = ApiResponse<AuthStatusResponse>;
