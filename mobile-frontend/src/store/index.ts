import { create } from "zustand";
import { User } from "../types";

interface AuthState {
	user: User | null;
	token: string | null;
	signIn: (user: User, token: string) => void;
	signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: null,
	signIn: (user, token) => set({ user, token }),
	signOut: () => set({ user: null, token: null }),
}));
