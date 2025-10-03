// Authentication Store using Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, AuthStatus } from '@/types/models/auth';

interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User | null) => void;
  setStatus: (status: AuthStatus) => void;
  setError: (error: string | null) => void;
  
  // Auth operations
  login: (user: User) => void;
  logout: () => void;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      status: 'idle',
      error: null,

      // Actions
      setUser: (user) => set({ user }),
      
      setStatus: (status) => set({ status }),
      
      setError: (error) => set({ error }),
      
      login: (user) => {
        // console.log('🏪 Auth Store - Login called with user:', user)
        // console.log('🏪 Auth Store - User roles:', user?.roles)
        set({
          user,
          status: 'authenticated',
          error: null,
        })
      },
      
      logout: () => set({
        user: null,
        status: 'unauthenticated',
        error: null,
      }),
      
      clearError: () => set({ error: null }),
      
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
      })),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        status: state.status,
      }),
    }
  )
);

// Helper hooks
export const useAuth = () => {
  const store = useAuthStore();
  
  // Debug current auth state (client-side only)
  if (typeof window !== 'undefined') {
    // console.log('🔍 useAuth called - Current state:', {
    //   user: store.user,
    //   status: store.status,
    //   roles: store.user?.roles,
    //   isAuthenticated: store.status === 'authenticated'
    // })
  }
  
  return {
    user: store.user,
    status: store.status,
    error: store.error,
    
    // Computed properties for easier migration from next-auth
    isAuthenticated: store.status === 'authenticated',
    isLoading: store.status === 'loading',
    isUnauthenticated: store.status === 'unauthenticated',
  };
};

export const useAuthActions = () => {
  const store = useAuthStore();
  return {
    login: store.login,
    logout: store.logout,
    setStatus: store.setStatus,
    setError: store.setError,
    clearError: store.clearError,
    updateUser: store.updateUser,
  };
};