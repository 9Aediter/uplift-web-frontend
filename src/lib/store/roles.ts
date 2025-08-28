// Roles Store using Zustand
import { create } from 'zustand';
import { toast } from 'sonner';
import { rolesApi, Role, SimpleRole, CreateRoleRequest, UpdateRoleRequest, RolesQueryParams } from '@/lib/api/roles';

export interface StoreRole {
  id: string;
  name: string;
  description: string;
  pathRoles: string;
  active: string; // "ACTIVE" | "INACTIVE" for table display
  createdAt: string;
  updatedAt: string;
  // Keep permissions as object in store, don't display in table
  permissions: string[];
}

interface RolesState {
  roles: StoreRole[];
  simpleRoles: SimpleRole[];
  total: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
}

interface RolesActions {
  // Fetch operations
  fetchRoles: (params?: RolesQueryParams) => Promise<void>;
  fetchSimpleRoles: () => Promise<void>;
  fetchRole: (id: string) => Promise<Role | null>;
  
  // CRUD operations
  createRole: (roleData: CreateRoleRequest) => Promise<void>;
  updateRole: (id: string, roleData: UpdateRoleRequest) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  
  // UI state management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type RolesStore = RolesState & RolesActions;

// Transform backend role to store role
const transformBackendRole = (backendRole: Role): StoreRole => ({
  id: backendRole.id,
  name: backendRole.name,
  description: backendRole.description || '',
  pathRoles: backendRole.pathRoles,
  active: backendRole.active ? 'ACTIVE' : 'INACTIVE',
  createdAt: backendRole.createdAt,
  updatedAt: backendRole.updatedAt,
  // Keep permissions as object in store, but don't display in table
  permissions: backendRole.permissions,
});

export const useRolesStore = create<RolesStore>((set) => ({
  // Initial state
  roles: [],
  simpleRoles: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
  error: null,

  // Fetch roles with pagination
  fetchRoles: async (params) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await rolesApi.getRoles(params);
      
      if (response.data) {
        const transformedRoles = response.data.roles.map(transformBackendRole);
        
        set({
          roles: transformedRoles,
          total: response.data.total,
          currentPage: response.data.page,
          pageSize: response.data.limit,
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch roles';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  // Fetch simple roles for dropdowns
  fetchSimpleRoles: async () => {
    try {
      const response = await rolesApi.getSimpleRoles();
      
      if (response.data) {
        set({ simpleRoles: response.data.roles });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch simple roles';
      set({ error: errorMessage });
      toast.error(errorMessage);
    }
  },

  // Fetch single role
  fetchRole: async (id) => {
    try {
      const response = await rolesApi.getRole(id);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch role';
      toast.error(errorMessage);
      return null;
    }
  },

  // Create role
  createRole: async (roleData) => {
    try {
      const response = await rolesApi.createRole(roleData);
      
      if (response.data) {
        const transformedRole = transformBackendRole(response.data);
        
        // Add to current roles list
        set((state) => ({
          roles: [...state.roles, transformedRole],
          total: state.total + 1,
        }));
        
        toast.success('Role created successfully');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create role';
      toast.error(errorMessage);
      throw error;
    }
  },

  // Update role
  updateRole: async (id, roleData) => {
    try {
      const response = await rolesApi.updateRole(id, roleData);
      
      if (response.data) {
        const transformedRole = transformBackendRole(response.data);
        
        // Update role in current list
        set((state) => ({
          roles: state.roles.map(role => 
            role.id === id ? transformedRole : role
          ),
        }));
        
        toast.success('Role updated successfully');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update role';
      toast.error(errorMessage);
      throw error;
    }
  },

  // Delete role
  deleteRole: async (id) => {
    try {
      await rolesApi.deleteRole(id);
      
      // Remove from current roles list
      set((state) => ({
        roles: state.roles.filter(role => role.id !== id),
        total: state.total - 1,
      }));
      
      toast.success('Role deleted successfully');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete role';
      toast.error(errorMessage);
      throw error;
    }
  },

  // UI state management
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

// Helper hooks
export const useRoles = () => {
  const store = useRolesStore();
  return {
    roles: store.roles,
    total: store.total,
    currentPage: store.currentPage,
    pageSize: store.pageSize,
    isLoading: store.isLoading,
    error: store.error,
  };
};

export const useSimpleRoles = () => {
  const store = useRolesStore();
  return {
    simpleRoles: store.simpleRoles,
    fetchSimpleRoles: store.fetchSimpleRoles,
  };
};

export const useRolesActions = () => {
  const store = useRolesStore();
  return {
    fetchRoles: store.fetchRoles,
    fetchSimpleRoles: store.fetchSimpleRoles,
    fetchRole: store.fetchRole,
    createRole: store.createRole,
    updateRole: store.updateRole,
    deleteRole: store.deleteRole,
    setLoading: store.setLoading,
    setError: store.setError,
    clearError: store.clearError,
  };
};