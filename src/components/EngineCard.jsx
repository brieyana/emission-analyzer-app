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
    } = useAppStore();

    const nav = useNavigate();

    const handleClick = () => {
        nav(`/home/${engineId}`)
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
        <button onClick={handleClick} className="block flex items-center justify-between border border-[#dbdbdb] rounded-[5px] p-[20px]">
            <p className="text-[0.8em] font-medium">{engineId}</p>
            <div className="flex">
                <img onClick={handleEditClick} className="block w-[25px] p-[5px] hover:bg-[#e8e8e8] hover:rounded-[5px]" src={edit} />
                <img onClick={handleDeleteClick} className="block w-[25px] p-[5px] hover:bg-[#e8e8e8] hover:rounded-[5px]" src={deleteIcon} />
            </div>
        </button>
    );
}

export default EngineCard;