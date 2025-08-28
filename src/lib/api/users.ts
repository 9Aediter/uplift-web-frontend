// Users API functions with full CRUD operations
import { api } from './client';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  roles: Array<{
    id: string;
    name: string;
    pathRole: string;
    type: string;
    active: boolean;
  }>;
  credentials?: Array<{
    id: string;
    type: string;
    providerId?: string;
    email: string;
    phone?: string;
    createdAt: string;
  }>;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface CreateUserRequest {
  name: string;
  email?: string;
  avatarUrl?: string;
  phone?: string;
  password?: string;
  roleIds?: string[];
  userTypes?: string[];
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  roleIds?: string[];
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface UsersListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export const usersApi = {
  // GET /v1/users - List all users (Admin only)
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: 'ACTIVE' | 'INACTIVE';
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);

    const url = `/v1/users${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return api.get<UsersListResponse>(url);
  },

  // GET /v1/users/:id - Get user by ID
  getUserById: async (id: string) => {
    return api.get<User>(`/v1/users/${id}`);
  },

  // POST /v1/users - Create new user (Admin only)
  createUser: async (userData: CreateUserRequest) => {
    return api.post<User>('/v1/users', userData);
  },

  // PATCH /v1/users/:id - Update user (Admin can update any, User can update self)
  updateUser: async (id: string, userData: UpdateUserRequest) => {
    return api.put<User>(`/v1/users/${id}`, userData);
  },

  // DELETE /v1/users/:id - Delete user (Admin only)
  deleteUser: async (id: string) => {
    return api.delete(`/v1/users/${id}`);
  },

  // POST /v1/users/:id/roles - Assign roles to user (Admin only)
  assignRoles: async (id: string, roleIds: string[]) => {
    return api.post<User>(`/v1/users/${id}/roles`, { roleIds });
  },

  // DELETE /v1/users/:id/roles/:roleId - Remove role from user (Admin only)
  removeRole: async (id: string, roleId: string) => {
    return api.delete<User>(`/v1/users/${id}/roles/${roleId}`);
  },

  // Update user status
  updateUserStatus: async (id: string, status: 'ACTIVE' | 'INACTIVE') => {
    return api.put<User>(`/v1/users/${id}`, { status });
  },

  // POST /v1/users/:id/reset-password - Reset user password (Admin only)
  resetPassword: async (id: string) => {
    return api.post<{ temporaryPassword: string }>(`/v1/users/${id}/reset-password`);
  },

  // GET /v1/users/me - Get current user profile (Any authenticated user)
  getCurrentUser: async () => {
    return api.get<User>('/v1/users/me');
  },

  // PATCH /v1/users/me - Update current user profile (Any authenticated user)
  updateCurrentUser: async (userData: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    return api.put<User>('/v1/users/me', userData);
  },

  // GET /v1/users/profile/:id - Get user profile (Public info only)
  getUserProfile: async (id: string) => {
    return api.get<Partial<User>>(`/v1/users/profile/${id}`);
  },
};

// Roles API for dropdowns
export interface SimpleRole {
  id: string;
  name: string;
}

export interface RolesListResponse {
  roles: SimpleRole[];
}

export const rolesApi = {
  // GET /v1/roles/list/simple - Get simple roles list for dropdowns
  getSimpleRoles: async () => {
    return api.get<RolesListResponse>('/v1/roles/list/simple');
  },
};

export default usersApi;