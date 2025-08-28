// Users Store using Zustand for admin user management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { usersApi } from '@/lib/api/users';

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  pathRole: string;
  type: string;
  active: boolean;
}

export interface UserCredential {
  id: string;
  type: string;
  providerId?: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface StoreUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
  roles: string; // comma-separated role names for display
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface UsersState {
  users: StoreUser[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

export interface UsersActions {
  // Fetch operations
  fetchUsers: (params?: { page?: number; limit?: number; search?: string }) => Promise<void>;
  
  // CRUD operations (optimistic updates)
  createUser: (userData: any) => Promise<{ success: boolean; data?: any; error?: string }>;
  updateUser: (userId: string, userData: any) => Promise<{ success: boolean; data?: any; error?: string }>;
  deleteUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  updateUserStatus: (userId: string, status: 'ACTIVE' | 'INACTIVE') => Promise<{ success: boolean; data?: any; error?: string }>;
  
  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Helper methods
  getUserById: (userId: string) => StoreUser | undefined;
  transformBackendUser: (backendUser: any) => StoreUser;
}

type UsersStore = UsersState & UsersActions;

export const useUsersStore = create<UsersStore>()(
  persist(
    (set, get) => ({
      // Initial state
      users: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      error: null,

      // Transform backend user format to store format (flat structure)
      transformBackendUser: (backendUser: any): StoreUser => ({
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.profile?.name || 'Unknown User',
        avatarUrl: backendUser.profile?.avatarUrl,
        phone: backendUser.profile?.phone,
        roles: backendUser.roles?.map((role: any) => role.name).join(', ') || '',
        createdAt: backendUser.createdAt,
        updatedAt: backendUser.updatedAt,
        status: backendUser.status || (backendUser.roles?.some((role: any) => role.active) ? 'ACTIVE' : 'INACTIVE'),
      }),

      // Fetch users from API
      fetchUsers: async (params = {}) => {
        try {
          set({ loading: true, error: null });

          const response = await usersApi.getUsers({
            page: params.page || 1,
            limit: params.limit || 10,
            search: params.search,
          });

          console.log('🔍 Users API response:', response);

          if (response.success && response.data) {
            const transformedUsers = response.data.users.map(get().transformBackendUser);

            set({
              users: transformedUsers,
              total: response.data.total,
              page: response.data.page,
              limit: response.data.limit,
              loading: false,
            });
          } else {
            throw new Error(response.error || 'Failed to fetch users');
          }
        } catch (error: any) {
          console.error('❌ Failed to fetch users:', error);
          set({ 
            error: error.message || 'Failed to fetch users',
            loading: false 
          });
          // Don't throw error - let UI handle via error state
        }
      },

      // Create user - no loading state, just add to list
      createUser: async (userData: any) => {
        try {
          // No loading state - keep UI responsive
          const response = await usersApi.createUser(userData);

          if (response.success && response.data) {
            const newUser = get().transformBackendUser(response.data);

            // Simply add new user to the list
            set((state) => ({
              users: [newUser, ...state.users],
              total: state.total + 1,
              error: null, // Clear any previous errors
            }));
            return { success: true, data: newUser };
          } else {
            // Don't set store error, let UI handle it
            return { success: false, error: response.error || 'Failed to create user' };
          }
        } catch (error: any) {
          console.error('❌ Failed to create user:', error);
          return { success: false, error: error.message || 'Failed to create user' };
        }
      },

      // Update user with optimistic update
      updateUser: async (userId: string, userData: any) => {
        try {
          set({ loading: true, error: null });

          // Store original user for rollback
          const originalUser = get().users.find(u => u.id === userId);
          if (!originalUser) throw new Error('User not found');

          // Optimistic update
          const optimisticUser = { ...originalUser, ...userData };
          set((state) => ({
            users: state.users.map(u => u.id === userId ? optimisticUser : u),
          }));

          // API call
          const response = await usersApi.updateUser(userId, userData);

          if (response.success && response.data) {
            const updatedUser = get().transformBackendUser(response.data);

            // Replace with real data from API
            set((state) => ({
              users: state.users.map(u => u.id === userId ? updatedUser : u),
              loading: false,
            }));
            return { success: true, data: updatedUser };
          } else {
            // Rollback on failure
            set((state) => ({
              users: state.users.map(u => u.id === userId ? originalUser : u),
            }));
            return { success: false, error: response.error || 'Failed to update user' };
          }
        } catch (error: any) {
          console.error('❌ Failed to update user:', error);
          
          // Rollback to original user
          const originalUser = get().users.find(u => u.id === userId);
          if (originalUser) {
            set((state) => ({
              users: state.users.map(u => u.id === userId ? originalUser : u),
              error: error.message || 'Failed to update user',
              loading: false,
            }));
          }
          return { success: false, error: error.message || 'Failed to update user' };
        }
      },

      // Delete user with optimistic update
      deleteUser: async (userId: string) => {
        try {
          set({ loading: true, error: null });

          // Store original user for rollback
          const originalUser = get().users.find(u => u.id === userId);
          if (!originalUser) throw new Error('User not found');

          // Optimistic delete
          set((state) => ({
            users: state.users.filter(u => u.id !== userId),
            total: state.total - 1,
          }));

          // API call
          const response = await usersApi.deleteUser(userId);

          if (response.success) {
            // Delete successful - keep the optimistic update
            set({ loading: false });
            return { success: true };
          } else {
            // Rollback on failure
            set((state) => ({
              users: [...state.users, originalUser].sort((a, b) => 
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
              ),
              total: state.total + 1,
            }));
            return { success: false, error: response.error || 'Failed to delete user' };
          }
        } catch (error: any) {
          console.error('❌ Failed to delete user:', error);
          
          // Rollback - add user back
          const originalUser = get().users.find(u => u.id === userId);
          if (!originalUser) {
            // Try to fetch the user data if we don't have it
            try {
              const userResponse = await usersApi.getUserById(userId);
              if (userResponse.success && userResponse.data) {
                const restoredUser = get().transformBackendUser(userResponse.data);
                set((state) => ({
                  users: [...state.users, restoredUser].sort((a, b) => 
                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                  ),
                  total: state.total + 1,
                }));
              }
            } catch (fetchError) {
              console.error('❌ Failed to restore user after failed delete:', fetchError);
            }
          }
          
          set({ 
            error: error.message || 'Failed to delete user',
            loading: false 
          });
          return { success: false, error: error.message || 'Failed to delete user' };
        }
      },

      // Update user status - no loading state, update only on success
      updateUserStatus: async (userId: string, status: 'ACTIVE' | 'INACTIVE') => {
        try {
          // No loading state - keep UI responsive
          const response = await usersApi.updateUserStatus(userId, status);

          if (response.success && response.data) {
            const updatedUser = get().transformBackendUser(response.data);
            
            // Update only on success
            set((state) => ({
              users: state.users.map(u => u.id === userId ? updatedUser : u),
              error: null,
            }));
            return { success: true, data: updatedUser };
          } else {
            return { success: false, error: response.error || 'Failed to update user status' };
          }
        } catch (error: any) {
          console.error('❌ Failed to update user status:', error);
          return { success: false, error: error.message || 'Failed to update user status' };
        }
      },

      // State management helpers
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),

      // Helper method
      getUserById: (userId: string) => {
        return get().users.find(u => u.id === userId);
      },
    }),
    {
      name: 'users-store',
      partialize: (state) => ({
        users: state.users,
        total: state.total,
        page: state.page,
        limit: state.limit,
      }),
    }
  )
);

// Helper hooks
export const useUsers = () => {
  const store = useUsersStore();
  return {
    users: store.users,
    total: store.total,
    page: store.page,
    limit: store.limit,
    loading: store.loading,
    error: store.error,
  };
};

export const useUsersActions = () => {
  const store = useUsersStore();
  return {
    fetchUsers: store.fetchUsers,
    createUser: store.createUser,
    updateUser: store.updateUser,
    deleteUser: store.deleteUser,
    updateUserStatus: store.updateUserStatus,
    setLoading: store.setLoading,
    setError: store.setError,
    clearError: store.clearError,
    getUserById: store.getUserById,
  };
};