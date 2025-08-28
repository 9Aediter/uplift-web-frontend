// Authentication types based on backend API requirements

export interface Role {
  name: string;
  pathRoles: string;
  type: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
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
  user: User;
  token: string;           // JWT access token
  refreshToken: string;    // Refresh token
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;           // New JWT access token
  refreshToken: string;    // New refresh token
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: string | null;
}

export interface SocialAuthProvider {
  google: string;
  facebook: string;
  github: string;
  line: string;
}

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isValid: boolean;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}