import { create } from "zustand";
import blogService from "../services/blogs";

export const useUserStore = create((set, get) => ({
  user: null,
  actions: {
    setUser: (user) => set(() => ({ user })),
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
