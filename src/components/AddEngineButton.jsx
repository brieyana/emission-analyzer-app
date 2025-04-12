import useAppStore from "../store/AppStore";
import { FORM_MODE } from "../store/AppStore";

const AddEngineButton = () => {
    const { 
        setFormVisible, 
        setFormTitle, 
        setInitialFormState, 
        setFormMode, 
        } = useAppStore();

    const handleClick = () => {
        setFormVisible(true);
        setFormTitle("Add Engine");
        setInitialFormState({
            engine_identification: "",
            engine_type: "",
            rated_thrust: "",
            bp_ratio: "",
            pressure_ratio: ""
        });
        setFormMode(FORM_MODE.ADD)
    }

    return (
        <button className="text-white bg-black py-3 px-4 rounded-md text-sm font-medium mb-12" onClick={handleClick}>
            Add Engine
        </button>
    );
}

export default AddEngineButton;
