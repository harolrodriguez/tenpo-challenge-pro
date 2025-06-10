import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { queryClient } from '@/providers/TanstackQueryProvider';

interface AuthState {
  token: string | null;
  actions: {
    login: (token: string) => void;
    logout: () => void;
  };
}

export const selectIsAuthenticated = (state: AuthState) => !!state.token;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      actions: {
        login: (token) => set({ token }),
        logout: () => {
          set({ token: null });
          queryClient.clear();
        },
      },
    }),
    {
      name: 'tenpo-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useIsAuthenticated = () => useAuthStore(selectIsAuthenticated);
export const useAuthToken = () => useAuthStore((state) => state.token);
