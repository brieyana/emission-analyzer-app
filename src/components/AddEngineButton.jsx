import useAppStore from "../store/AppStore";
import { FORM_MODE } from "../store/AppStore";

const AddEngineButton = () => {
    const { 
        setFormVisible, 
        setFormTitle, 
        setInitialFormState, 
        setFormMode,
        compareClicked, 
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
        <button
            disabled={compareClicked}
            className={`w-full text-white py-3 px-4 rounded-[10px] text-sm font-medium transition-bg-color duration-300 ease-in-out ${
                compareClicked ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-[#2f2f2f]'
            }`}
            onClick={handleClick}
        >
            Add Engine
        </button>
    );
}

export default AddEngineButton;
