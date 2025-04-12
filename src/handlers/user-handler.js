/**
 * Handles setting user-related state based on user actions.
 * Handles loading, error, and navigation states using the global store.
 * Routes to correct service function for sending requests. 
 */

import useUserStore from "../store/UserStore";
import { createUser, addEngine, editEngine, getUser, getEngines, getEngineTypes } from "../services/user-service";
import useAppStore from "../store/AppStore";

const { 
    setUserId,
    setUser,
    setEngines,
}  = useUserStore.getState();

const {
    setError, 
    setLoading,
    setNavigate,
    setErrorCode,
    setEngineTypes,
}  = useAppStore.getState();

export const handleCreateUser = async () => {
    setLoading(true);
    setError(false);
    setNavigate(false);

    const uuid = crypto.randomUUID();

    const result = await createUser(uuid);
    if (result.success) {
        setUserId(uuid);
        setUser(result.data);
        setNavigate(true);
        localStorage.setItem("user_id", uuid);
    } else {
        setError(true);
    }

    setLoading(false);
}

export const handleAddEngine = async (data) => {
    setLoading(true);
    setError(false);
    setErrorCode(null);

    const result = await addEngine(JSON.stringify(data));
    if (result.success) {
        setError(false);

    } else {
        setError(true);
    }

    setLoading(false);
}

export const handleEditEngine = async (data) => {
    setLoading(true);
    setError(false);
    setErrorCode(null);

    const result = await editEngine(JSON.stringify(data));
    if (result.success) {
        setError(false);
    } else {
        setError(true);
    }

    setLoading(false);
}

export const handleGetUser = async (userId) => {
    setLoading(true);
    setError(false);
    setNavigate(false);
    setErrorCode(null);

    const result = await getUser(userId);
    if (result.success) {
        setError(false);
        setNavigate(true);
        setUser(result.data);
    } else {
        setError(true);
        if (result.error?.error == "User not found") {
            setUserId(null);
            localStorage.removeItem("user_id");
            setErrorCode(404);
        }
    }

    setLoading(false);
}

export const handleGetEngines = async (userId) => {
    setLoading(true);
    setError(false);
    
    const result = await getEngines(userId);
    if (result.success) {
        setEngines(result.data);
    } else {
        setError(true);
    }

    setLoading(false);
}

export const handleGetEngineTypes = async () => {
    setLoading(true);
    setError(false);

    const result = await getEngineTypes()
    if (result.success) {
        setEngineTypes(result.data["engine_types"])
    } else {
        setError(true);
    }

    setLoading(false);
}