import CSS from './Sidebar.module.css';
import EngineCard from '../EngineCard';
import useUserStore from '../../store/UserStore';
import AddEngineButton from '../AddEngineButton';
import useAppStore from '../../store/AppStore';
import { useNavigate } from 'react-router-dom';
import DownloadButton from '../DownloadButton';

const Sidebar = () => {
    const nav = useNavigate();
    const { engines } = useUserStore();
    const { 
        setCompareClicked, 
        compareClicked, 
        clearEngineSelections,
    } = useAppStore();

    const handleCancel = () => {
        setCompareClicked(false);
        clearEngineSelections();
        nav(`/home`)
    }

    const handleContinue = () => {
        setCompareClicked(false);
        nav(`/home/compare`);
    }

    return (
        <div id={CSS.sidebar}>
            <AddEngineButton />
            <button 
                onClick={() => setCompareClicked(true)} 
                className={`text-white bg-black py-3 px-4 rounded-md text-sm font-medium ${!compareClicked ? "mb-12" : "mb-0"}`}
            >
                Compare Engines
            </button>
            {compareClicked && (
                <div className="flex justify-between mb-4">
                    <button onClick={handleCancel} className="text-blue-600 text-sm underline hover:text-blue-800">
                        Cancel
                    </button>
                    <button onClick={handleContinue} className="text-blue-600 text-sm underline hover:text-blue-800">
                        Continue
                    </button>
                </div>
            )}
            <div className="flex justify-between">
                <p className={CSS.label}>Engines</p>
                <DownloadButton />
            </div>
            {engines.map((engine) => (
                <EngineCard key={engine.engine_identification} engineId={engine.engine_identification} />
            ))}
        </div> 
    );
}

export default Sidebar;