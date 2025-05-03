/**
 * Sends requests to the server. Accessed through the user handlers
 * only.
 */

import { axiosInstance } from "../../client";

export const createUser = async (uuid) => {
    try {
        const response = await axiosInstance.post(`/add-user/`, { user_id: uuid });
        return { success: true, data: response.data.data, status: response.status };
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}

export const addEngine = async (data) => {
    try {
        const response = await axiosInstance.post(`/add-engine/`, data);
        return { success: true, data: response.data.data };
    } catch (error) {
        return { success: false, error: error.response?.data }
    }
}

export const editEngine = async (data) => {
    try {
        const response = await axiosInstance.put(`/edit_engine`, data);
        return { success: true, data: response.data.data };
    } catch (error) {
        return { success: false, error: error.response?.data }
    }
}

export const getUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/get_user/${userId}`);
        return { success: true, data: response.data.data };
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}

export const getEngines = async (userId) => {
    try {
        const response = await axiosInstance.get(`get-engines/${userId}`);
        const { data } = response.data;
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}

export const getEngineTypes = async () => {
    try {
        const response = await axiosInstance.get(`get_engine_types`);
        const { data } = response.data;
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}

export const predictEmissions = async (data) => {
    try {
        const response = await axiosInstance.post(`predict_emissions`, data);
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}

export const deleteEngine = async (data) => {
    try {
        await axiosInstance.delete(`delete_engine/${data.userId}/engines/${data.engineId}`)
        return { success: true }
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}

export const getToken = async () => {
    try {
        await axiosInstance.get('/get_token', { withCredentials: true });
    } catch (error) {
        return { success: false, error: error.response?.data };
    }
}