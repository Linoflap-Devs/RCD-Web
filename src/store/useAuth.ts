import { create } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";

type User = {
  UserType?: number;
  userName?: string;
  branch?: number;
  position?: string;
};

type AuthState = {
  user: User | null;
  isUserValid: boolean;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (value: boolean) => void;
};

type AuthPersist = PersistOptions<AuthState, Partial<AuthState>>;

export const useAuth = create<AuthState>()(
persist(
  (set, get) => ({
    user: null,
    isUserValid: false,
    loading: true,
    initialized: false,

    setUser: (user) =>
      set({
        user,
        isUserValid: true,
        loading: false,
        initialized: true,
      }),

    logout: () => {
      set({
        user: null,
        isUserValid: false,
        loading: false,
        initialized: true,
      });
      sessionStorage.removeItem("auth-storage");
    },

    setLoading: (loading) => set({ loading }),

    setInitialized: (value) => set({ initialized: value }),
  }),
  {
    name: "auth-storage",
    storage: {
      getItem: (name) => {
        const value = sessionStorage.getItem(name);
        return value ? JSON.parse(value) : null;
      },
      setItem: (name, value) => {
        sessionStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: (name) => {
        sessionStorage.removeItem(name);
      },
    },

    // Fix here — cast to AuthState to silence the TS mismatch
    partialize: (state) =>
      ({
        user: state.user,
        isUserValid: state.isUserValid,
      }) as AuthState,
  }
)
);
