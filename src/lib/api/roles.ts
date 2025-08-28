// Roles API functions
import { api } from './client';

export interface Role {
  id: string;
  name: string;
  description?: string;
  pathRoles: string;
  permissions: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SimpleRole {
  id: string;
  name: string;
}

export interface RolesListResponse {
  roles: Role[];
  total: number;
  page: number;
  limit: number;
}

export interface SimpleRolesResponse {
  roles: SimpleRole[];
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  pathRoles: string;
  permissions: string[];
  active: boolean;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  pathRoles?: string;
  permissions?: string[];
  active?: boolean;
}

export interface RolesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  active?: boolean;
}

export const rolesApi = {
  // Get simple roles list for dropdowns
  getSimpleRoles: async (): Promise<{ data: SimpleRolesResponse }> => {
    return api.get<SimpleRolesResponse>('/v1/roles/list/simple');
  },

  // Get roles with pagination and filters
  getRoles: async (params?: RolesQueryParams): Promise<{ data: RolesListResponse }> => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.active !== undefined) queryParams.append('active', params.active.toString());
    
    const queryString = queryParams.toString();
    const url = queryString ? `/v1/roles?${queryString}` : '/v1/roles';
    
    return api.get<RolesListResponse>(url);
  },

  // Get single role by ID
  getRole: async (id: string): Promise<{ data: Role }> => {
    return api.get<Role>(`/v1/roles/${id}`);
  },

  // Create new role
  createRole: async (roleData: CreateRoleRequest): Promise<{ data: Role }> => {
    return api.post<Role>('/v1/roles', roleData);
  },

  // Update role
  updateRole: async (id: string, roleData: UpdateRoleRequest): Promise<{ data: Role }> => {
    return api.put<Role>(`/v1/roles/${id}`, roleData);
  },

  // Delete role
  deleteRole: async (id: string): Promise<void> => {
    return api.delete(`/v1/roles/${id}`);
  }
};

export default rolesApi;