import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  needsGym: boolean;
  userId: number;
  isGymOwner: boolean;
  hasHydrated: boolean;
  setAuthTokens: (accessToken: string, refreshToken: string) => void;
  setNeedsGym: (needsGym: boolean) => void;
  setUserId: (userId: number) => void;
  setIsGymOwner: (flag: boolean) => void;
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
      isGymOwner: false,
      hasHydrated: false,
      setAuthTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setNeedsGym: (needsGym) => set({ needsGym }),
      setIsGymOwner: (isGymOwner) => set({ isGymOwner }),
      setHasHydrated: (flag) => set({ hasHydrated: flag }),
      setUserId: (userId) => set({ userId }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          needsGym: false,
          isGymOwner: false,
          userId: -1,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        needsGym: state.needsGym,
        isGymOwner: state.isGymOwner,
        userId: state.userId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
