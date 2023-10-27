import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  setUsers: async (data) => {
    // const res = await fetch("http://localhost:3000/api/users");
    // const { users } = await res.json();
    set({
      users: data,
    });
  },
  addUser: (data) => set((state) => ({ users: [data, ...state.users] })),
  // fetchUsers: async () => {
  //   const res = await fetch("/api/users");
  //   set({ users: await res.json() });
  // },
}));
