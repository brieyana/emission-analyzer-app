/**
 * Manages the global state of the application.
 */

import { create } from "zustand";

const useUserStore = create((set) => ({
    // Initial state
    userId: localStorage.getItem("user_id") || null,
    user: null,
    engines: [],
    loading: false,
    error: null,
    errorCode: null,
    validUser: false,
    navigate: false,
    formVisible: false,
    formTitle: '',

    // Setters
    setFormTitle: (formTitle) => set({ formTitle }),
    setFormVisible: (formVisible) => set({ formVisible }),
    setErrorCode: (errorCode) => set({ errorCode }),
    setNavigate: (navigate) => set({ navigate }),
    setUserId: (userId) => set({ userId }),
    setUser: (user) => set({ user }),
    setEngines: (data) =>
        set((state) => {
          const updatedEngines = new Map(state.engines.map(engine => [engine.engine_identification, engine]));
      
          (data.engines || []).forEach((engine) => {
            updatedEngines.set(engine.engine_identification, engine);
          });
      
          return {
            engines: Array.from(updatedEngines.values()),
          };
        }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setValidUser: (validUser) => set({ validUser })
}));

export default useUserStore;