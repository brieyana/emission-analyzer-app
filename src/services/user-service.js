/**
 * Sends requests to the server. Accessed through the user handlers
 * only.
 */

import { axiosInstance } from "../../client";

export const createUser = async (uuid) => {
    try {
        const response = await axiosInstance.post(`/add-user/`, { user_id: uuid });
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}

export const getUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/get_user/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}

export const getUserData = async (userId) => {
    try {
        const response = await axiosInstance.get(`get_user/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}