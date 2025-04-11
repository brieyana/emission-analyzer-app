import CSS from './Sidebar.module.css';
import EngineCard from '../EngineCard';
import useUserStore from '../../store/UserStore';
import AddEngineButton from '../AddEngineButton';

const Sidebar = () => {
    const { engines } = useUserStore();

    return (
        <div id={CSS.sidebar}>
            <AddEngineButton />
            <p className={CSS.label}>Engines</p>
            {engines.map((engine) => (
                <EngineCard key={engine.engine_identification} engineId={engine.engine_identification} />
            ))}
        </div> 
    );
}

export default Sidebar;