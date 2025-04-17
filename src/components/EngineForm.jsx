import { useState, useEffect } from "react";
import { handleAddEngine, handleEditEngine } from "../handlers/user-handler";
import useUserStore from "../store/UserStore";
import TextInput from "./FormInput/TextInput";
import Dropdown from "./FormInput/Dropdown";
import OperationalParameter from "./FormInput/OperationalParameter";
import { OPERATIONAL_PARAMETERS } from "../assets/constants";
import useAppStore from "../store/AppStore";
import { FORM_MODE } from "../store/AppStore";
import Message from "./Message";

const EngineForm = () => {
    const {
        userId, 
    } = useUserStore();

    const {
        formVisible, 
        setFormVisible,
        formTitle, 
        initialFormState,
        formMode,
        success
    } = useAppStore();

    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(initialFormState)
    }, [initialFormState])

    useEffect(() => {
        if (success && formMode == FORM_MODE.ADD) {
            setFormData(initialFormState);
        }
    }, [formMode, initialFormState, success])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleClose = () => {
        setFormVisible(false);
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        const data = {
            user_id: userId,
            engine: {
                engine_identification: formData.engine_identification,
                engine_type: formData.engine_type,
                rated_thrust: parseFloat(formData.rated_thrust),
                bp_ratio: parseFloat(formData.bp_ratio),
                pressure_ratio: parseFloat(formData.pressure_ratio),
            }
        }

        if (formMode === FORM_MODE.ADD) {
            handleAddEngine(data);
        }
        
        if (formMode === FORM_MODE.EDIT) {
            handleEditEngine(data);
        }
    }

    if (!formVisible || Object.keys(formData).length === 0) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50" onClick={(e) => e.target === e.currentTarget && handleClose}>
            <Message />
            <div className="w-[600px] bg-white rounded-lg shadow-xl text-black overflow-hidden">
                <div className="relative p-4 mt-2 top-6">
                    <button className="absolute right-4 top-1/2 -translate-y-14 text-gray-500 hover:text-black text-xl" onClick={handleClose}>
                        x
                    </button>
                    <h2 className="text-[30px] font-bold text-center">{formTitle}</h2>
                </div>
                
                <form className="p-[20px] max-w-[450px] mx-auto" onSubmit={handleSumbit}>
                    <h3 className="text-[20px] font-semibold mt-2 mb-4 text-center">Engine Information</h3>
                    <div className="mb-6">
                        <TextInput
                            label="Engine Identification Number"
                            name="engine_identification"
                            value={formData.engine_identification}
                            placeholder={formData.engine_identification}
                            handleChange={handleChange}
                        />
                        <Dropdown 
                            label="Engine Type"
                            name="engine_type"
                            value={formData.engine_type}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 justify-between">
                        <h3 className="text-[20px] font-semibold mb-4 text-center">Operational Parameters</h3>
                        <div className="flex gap-[40px]">
                            {OPERATIONAL_PARAMETERS.map(param => (
                                <OperationalParameter 
                                    key={param.name}
                                    label={param.label}
                                    name={param.name}
                                    value={formData[param.name]}
                                    placeholder={formData[param.name]}
                                    handleChange={handleChange}
                                />
                            ))}
                        </div>
                    </div>
                    <button className="w-[140px] mx-auto block bg-black text-white py-3 rounded-md hover:bg-[#181818] transition" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EngineForm;