import { create } from "zustand";
import { axiosInstance } from "../../client";

const useUserStore = create((set, get) => ({
    user: null,
    userId: localStorage.getItem("user_id") || null,
    usersData: {},

    createUser: async () => {
        const uuid = crypto.randomUUID();
        try {
            await axiosInstance.post(`/add-user/`, { user_id: uuid });
            localStorage.setItem("user_id", uuid);
            set({ userId: uuid });

            get().fetchUserData(uuid);
        } catch {
            alert("Unable to retrieve/create user ID. Please try again.");
        }
    },

    fetchUserData: async (userId) => {
        try {
            // TO DO: create get_user_data endpoint for this request
            const res = await axiosInstance.get(`get_user/${userId}`);
            set((state) => ({
                user: res.data,
                usersData: {
                    ...state.usersData,
                    [userId]: { engines: res.data.engines || [] },
                },
            }));
        } catch {
            localStorage.removeItem("user_id");
            set({ user: null, userId: null });
        }
    },
}));

const userId = useUserStore.getState().userId;
if (userId) {
    useUserStore.getState().fetchUserData(userId);
}

export default useUserStore;