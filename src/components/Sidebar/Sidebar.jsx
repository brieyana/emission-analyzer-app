import CSS from './Sidebar.module.css';
import EngineCard from '../EngineCard';
import useUserStore from '../../store/UserStore';

const Sidebar = ({ onAddEngineClick }) => {
    const { engines } = useUserStore();

    return (
        <div id={CSS.sidebar}>
            <button id={CSS.addEngineButton} onClick={onAddEngineClick}>Add Engine</button>
            <p className={CSS.label}>Engines</p>
            {engines.map((engine) => (
                <EngineCard key={engine.engine_identification} engineId={engine.engine_identification} />
            ))}
        </div> 
    );
}

export default Sidebar;