import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  needsGym: boolean;
  userId: number;
  setAuthTokens: (accessToken: string, refreshToken: string) => void;
  setNeedsGym: (needsGym: boolean) => void;
  setUserId: (userId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      needsGym: false,
      userId: -1,
      setAuthTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setNeedsGym: (needsGym) => set({ needsGym }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          needsGym: false,
          userId: -1,
        }),
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: "auth-storage",
    }
  )
);
