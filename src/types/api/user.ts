/**
 * User API Types
 * Backend API response types for user-related endpoints
 */

import { ApiResponse, PaginatedResponse } from './response';

export interface UserApiData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: RoleApiData[];
  createdAt: string;
  updatedAt: string;
}

export interface RoleApiData {
  id: string;
  name: string;
  pathRoles: string;
  type: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  roleIds?: string[];
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
  roleIds?: string[];
}

// Response types
export type GetUserResponse = ApiResponse<UserApiData>;
export type GetUsersResponse = PaginatedResponse<UserApiData>;
export type CreateUserResponse = ApiResponse<UserApiData>;
export type UpdateUserResponse = ApiResponse<UserApiData>;
export type DeleteUserResponse = ApiResponse<{ id: string }>;
