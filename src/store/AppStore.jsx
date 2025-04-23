import { create } from "zustand";

export const FORM_MODE = {
    ADD: "Add",
    EDIT: "Edit"
};

const useAppStore = create((set, get) => ({
    // Initial state
    initialFormState: {},
    engineId: null,
    navigate: false,
    formVisible: false,
    formTitle: '',
    engineTypes: [],
    formMode: '',
    loading: false,
    error: null,
    errorCode: null,
    success: false,
    message: '',
    engineDeleted: false,
    compareClicked: false,
    selectedEngineIds: [],
    selectedEngine: '',

    // Setters
    setSelectedEngine: (selectedEngine) => set({ selectedEngine }),
    toggleEngineSelection: (engineId) =>
        set((state) => {
            const selected = new Set(state.selectedEngineIds);
            selected.has(engineId) ? selected.delete(engineId) : selected.add(engineId);
            return { selectedEngineIds: Array.from(selected) };
        }),
    clearEngineSelections: () => set({ selectedEngineIds: [] }),
    setCompareClicked: (compareClicked) => set({ compareClicked }),
    setEngineDeleted: (engineDeleted) => set({ engineDeleted }),
    setMessage: (message) => set({ message }),
    setSuccess: (success) => set({ success }),
    setEngineId: (engineId) => set({ engineId }),
    setFormMode: (formMode) => set({ formMode }),
    setInitialFormState: (initialFormState) => set({ initialFormState }),
    setEngineTypes: (engineTypes) => set({ engineTypes }),
    setFormTitle: (formTitle) => set({ formTitle }),
    setFormVisible: (formVisible) => set({ formVisible }),
    setErrorCode: (errorCode) => set({ errorCode }),
    setNavigate: (navigate) => set({ navigate }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    isEditMode: () => get().formMode === FORM_MODE.EDIT
}));

export default useAppStore;