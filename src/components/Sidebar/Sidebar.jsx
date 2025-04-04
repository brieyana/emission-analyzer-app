import CSS from './Sidebar.module.css';

const Sidebar = ({ onAddEngineClick }) => {
    return (
        <div id={CSS.sidebar}>
            <button id={CSS.addEngineButton} onClick={onAddEngineClick}>Add Engine</button>
            <p className={CSS.label}>Engines</p>
        </div> 
    );
}

export default Sidebar;