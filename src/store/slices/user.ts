import { User } from "@/types/User";
import auth from "@/lib/auth";
import { persist } from "zustand/middleware";

export interface UserSlice {
  user: User | null;
  isEpicAuth: boolean;
  setUser: (user: any) => void;
  getUser: () => User | null;
  logout: () => void;
  isLoggedIn: () => boolean;
  setEpicAuth: (isEpicAuth: boolean) => void;
  iconFile: File | null;
  setIconFile: (iconFile: File | null) => void;
}

export const createUserSlice = persist(
  (set, get: () => UserSlice) => ({
    user: null,
    setUser: (user: User) => {
      set({ user });
    },
    getUser: () => {
      return get().user;
    },
    logout: async () => {
      try {
        await auth.logout();
      } catch (e) { }
      set({ user: null, isEpicAuth: false });
    },
    isLoggedIn: () => {
      return get().user !== null;
    },
    isEpicAuth: false,
    setEpicAuth: (isEpicAuth: boolean) => {
      set({ isEpicAuth });
    },
    iconFile: null,
    setIconFile: (iconFile: File | null) => {
      set({ iconFile });
    },
  }),
  {
    name: "user-storage",
    getStorage: () => localStorage,
  }
);
