/* eslint-disable react/prop-types */
import "../assets/styles.css"
import edit from "../assets/images/edit.png";
import deleteIcon from "../assets/images/remove-circle.png";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/UserStore";
import useAppStore from "../store/AppStore";
import { FORM_MODE } from "../store/AppStore";
import { handleDeleteEngine } from "../handlers/user-handler";

const EngineCard = ({ engineId }) => {
    const { userId, engines } = useUserStore();

    const { 
        setFormTitle, 
        setFormVisible, 
        setEngineId, 
        setInitialFormState,
        setFormMode,
        compareClicked,
        selectedEngineIds,
        toggleEngineSelection,
        clearEngineSelections,
        currentEngine,
        setCurrentEngine,
    } = useAppStore();

    const nav = useNavigate();
    const isSelected = selectedEngineIds.includes(engineId);

    const handleClick = () => {
        if (compareClicked) {
            toggleEngineSelection(engineId);
        } else {
            if (selectedEngineIds.length > 0) {
                clearEngineSelections();
            }

            setCurrentEngine(engineId);
            nav(`/home/${engineId}`)
        }
    }

    const handleEditClick = (event) => {
        event.stopPropagation();
        setEngineId(engineId);
        setFormTitle(`Edit ${engineId}`)
        setInitialFormState(engines.find((engine) => engine.engine_identification === engineId))
        setFormVisible(true);
        setFormMode(FORM_MODE.EDIT)
    }

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        handleDeleteEngine(userId, engineId);
    }

    return (
        <div
            onClick={handleClick}
            className={`w-full flex hover:cursor-pointer items-center justify-between rounded-[5px] p-[20px] border border-solid transition-bg-color duration-300 ease-in-out
                ${
                    compareClicked
                    ? isSelected
                        ? "bg-green-100 border-green-600"
                        : "hover:bg-green-100 bg-white border-[#dbdbdb]"
                    : currentEngine === engineId
                        ? "bg-[#e4e4e4] border-[#dbdbdb]"
                        : "hover:bg-[#e4e4e4] bg-white border-[#dbdbdb]"
                }
            `}
        >
            <p className="text-[0.8em] font-medium">{engineId}</p>
            <div className="flex">
                <button
                    className={`block w-[25px] p-[5px] hover:bg-[#e8e8e8] hover:rounded-[5px] transition-bg-color duration-300 ease-in-out`}
                >
                    <img onClick={handleEditClick} src={edit} />
                </button>
                
                <button 
                    disabled={compareClicked}
                    className={`block w-[25px] p-[5px] ${
                        compareClicked ? 'cursor-not-allowed' : 'hover:bg-[#e8e8e8] hover:rounded-[5px] transition-bg-color duration-300 ease-in-out'
                    }`}
                >
                    <img onClick={handleDeleteClick} src={deleteIcon} />
                </button>
            </div>
        </div>
    );
}

export default EngineCard;