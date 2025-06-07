import { create } from "zustand";

interface UserState {
  email: string;
  setEmail: (email: string) => void;

  username: string;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),

  username: "",
  setUsername: (username) => set({ username }),
}));
