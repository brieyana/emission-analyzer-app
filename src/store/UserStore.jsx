/**
 * Manages the global state of the application.
 */

import { create } from "zustand";

const useUserStore = create((set) => ({
    // Initial state
    userId: localStorage.getItem("user_id") || null,
    user: null,
    engines: [],

    // Setters
    emissions: {},

    // Setters
    setEmissions: (engineId, predictions) =>
        set((state) => ({
          emissions: {
            ...state.emissions,
            [engineId]: predictions
          }
    })),
    setUserId: (userId) => set({ userId }),
    setUser: (user) => set({ user }),
    setEngines: (engines) =>
        set((state) => {
          const updatedEngines = new Map(state.engines.map(engine => [engine.engine_identification, engine]));
      
          (engines || []).forEach((engine) => {
            updatedEngines.set(engine.engine_identification, engine);
          });
      
          return {
            engines: Array.from(updatedEngines.values()),
          };
        }),
}));

export default useUserStore;