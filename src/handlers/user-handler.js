/**
 * Handles setting user-related state based on user actions.
 * Handles loading, error, and navigation states using the global store.
 * Routes to correct service function for sending requests. 
 */

import useUserStore from "../store/UserStore";
import { createUser, addEngine, editEngine, getUser, getEngines, getEngineTypes, predictEmissions, deleteEngine } from "../services/user-service";
import useAppStore from "../store/AppStore";

const { 
    setUserId,
    setUser,
    setEngines,
    setEmissions,
}  = useUserStore.getState();

const {
    setError, 
    setLoading,
    setNavigate,
    setErrorCode,
    setEngineTypes,
    setSuccess,
    setMessage,
    setEngineDeleted
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
        setMessage("Unable to create user. Please try again.")
    }

    setLoading(false);
}

export const handleAddEngine = async (data) => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    const result = await addEngine(JSON.stringify(data));
    if (result.success) {
        setSuccess(true);
        setMessage(`${data.engine.engine_identification} added successfully`)

    } else {
        setError(true);
        setMessage(`${result.error.error}`)
    }

    setLoading(false);
}

export const handleEditEngine = async (data) => {
    setLoading(true);
    setError(false);
    setErrorCode(null);
    setSuccess(false);

    const result = await editEngine(JSON.stringify(data));
    if (result.success) {
        setSuccess(true);
        setMessage(`Updated ${data.engine.engine_identification}`)
    } else {
        setError(true);
        setMessage(`Unable to update ${data.engine.engine_identification}`)
    }

    setLoading(false);
}

export const handleGetUser = async (userId) => {
    setLoading(true);
    setError(false);
    setNavigate(false);

    const result = await getUser(userId);
    if (result.success) {
        setNavigate(true);
        setUser(result.data);
    } else {
        setError(true);
        if (result.error?.error == "User not found") {
            setUserId(null);
            localStorage.removeItem("user_id");
            setErrorCode(404);
        }
        setMessage("Unable to retrieve user. Please try again.")
    }

    setLoading(false);
}

export const handleGetEngines = async (userId) => {
    setLoading(true);
    setError(false);
    
    const result = await getEngines(userId);
    if (result.success) {
        setEngines(result.data.engines);
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
        console.log(result.error.error_code)
    }

    setLoading(false);
}

export const handlePredictEmissions = async (userId, engineId) => {
    setLoading(true);
    setError(false);

    const data = {
        user_id: userId,
        engine_identification: engineId
    }

    const result = await predictEmissions(data)
    if (result.success) {
        setEmissions(engineId, result.data)
    } else {
        setError(true);
    }

    setLoading(false);
}

export const handleDeleteEngine = async (userId, engineId) => {
    setLoading(true);
    setError(false);
    setEngineDeleted(false);

    const data = {
        userId: userId,
        engineId: engineId
    }

    const result = await deleteEngine(data);

    if (result.success) {
        setEngineDeleted(true);

    } else {
        setError(true);
        setMessage(`${engineId} could not be deleted`)
    }
}