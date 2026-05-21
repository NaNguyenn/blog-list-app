import { create } from "zustand";
import { getAllUsers } from "../services/users";

const useUsersStore = create((set, get) => ({
  users: [],
  actions: {
    initializeUsers: async () => {
      const users = await getAllUsers();
      set(() => ({ users }));
    },
  },
}));

export const useUsers = () => useUsersStore((state) => state.users);
export const useUsersActions = () => useUsersStore((state) => state.actions);
