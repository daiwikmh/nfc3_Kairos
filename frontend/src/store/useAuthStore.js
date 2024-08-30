import create from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,         // Existing user login state
            user: null,                // Existing user data
            isCompanyLoggedIn: false,  // New company login state
            company: null,             // New company data
            setUserLogin: (user) => set({ isLoggedIn: true, user }), // Function for user login
            setUserLogout: () => set({ isLoggedIn: false, user: null }), // Function for user logout
            setCompanyLogin: (company) => set({ isCompanyLoggedIn: true, company }), // Function for company login
            setCompanyLogout: () => set({ isCompanyLoggedIn: false, company: null }), // Function for company logout
        }),
        {
            name: 'auth-storage', // key in localStorage
            getStorage: () => localStorage, // use localStorage
        }
    )
);

export default useAuthStore;
