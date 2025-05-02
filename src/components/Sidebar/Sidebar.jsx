import CSS from './Sidebar.module.css';
import EngineCard from '../EngineCard';
import useUserStore from '../../store/UserStore';
import AddEngineButton from '../AddEngineButton';
import useAppStore from '../../store/AppStore';
import { useNavigate } from 'react-router-dom';
import DownloadButton from '../DownloadButton';
import { useLocation } from 'react-router-dom';
import home from '../../assets/images/home.png';

const Sidebar = () => {
    const nav = useNavigate();
    const loc = useLocation();

    const { engines } = useUserStore();
    const { 
        setCompareClicked, 
        compareClicked, 
        clearEngineSelections,
        previousPath,
        setPreviousPath,
        setCurrentEngine
    } = useAppStore();

    const handleClick = () => {
        if (compareClicked) {
            setCompareClicked(false);
            clearEngineSelections();

            if (previousPath) {
                nav(previousPath);
                setPreviousPath(null);
            }
        } else {
            setPreviousPath(loc.pathname);
            setCompareClicked(true);
            nav(`/home/compare`);
        }
    }

    const handleHomeClick = () => {
        setCurrentEngine('');
        clearEngineSelections();
        setCompareClicked(false);
        nav(`/home`);
    }

    return (
        <div className="p-[50px] text-[#505050] flex flex-col w-[300px] items-center gap-[10px]">
            <div className="flex w-full justify-start mb-6">
                <img onClick={handleHomeClick} className="block w-[20px] hover:cursor-pointer" src={home}/>
            </div>
            <AddEngineButton />
            <button 
                onClick={handleClick} 
                className={`w-full hover:bg-[#2f2f2f] text-white bg-black py-3 px-4 rounded-[10px] text-sm font-medium mb-12 transition-bg-color duration-300 ease-in-out`}
            >
                Compare Engines
            </button>
            <div className="w-full flex justify-between">
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