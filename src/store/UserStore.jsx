/**
 * Manages the global state of the application.
 */

import { create } from "zustand";

const useUserStore = create((set) => ({
    // Initial state
    userId: localStorage.getItem("user_id") || null,
    user: null,
    userData: {},
    loading: false,
    error: null,
    errorCode: null,
    validUser: false,
    navigate: false,

    // Setters
    setErrorCode: (errorCode) => set({ errorCode }),
    setNavigate: (navigate) => set({ navigate }),
    setUserId: (userId) => set({ userId }),
    setUser: (user) => set({ user }),
    setUserData: (userId, data) =>
        set((state) => ({
            userData: {
                ...state.userData,
                [userId]: { engines: data.engines || [] },
            },
        })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setValidUser: (validUser) => set({ validUser })
}));

export default useUserStore;