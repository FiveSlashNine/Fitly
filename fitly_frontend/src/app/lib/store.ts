import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  needsGym: boolean;
  userId: number;
  hasHydrated: boolean;
  setAuthTokens: (accessToken: string, refreshToken: string) => void;
  setNeedsGym: (needsGym: boolean) => void;
  setUserId: (userId: number) => void;
  setHasHydrated: (flag: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      needsGym: false,
      userId: -1,
      hasHydrated: false,
      setAuthTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setNeedsGym: (needsGym) => set({ needsGym }),
      setHasHydrated: (flag) => set({ hasHydrated: flag }),
      setUserId: (userId) => set({ userId }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          needsGym: false,
          userId: -1,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        needsGym: state.needsGym,
        userId: state.userId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
