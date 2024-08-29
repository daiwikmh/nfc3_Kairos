import create from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            setLogin: (user) => set({ isLoggedIn: true, user }),
            setLogout: () => set({ isLoggedIn: false, user: null }),
        }),
        {
            name: 'auth-storage', // key in localStorage
            getStorage: () => localStorage, // use localStorage
        }
    )
);

export default useAuthStore;
