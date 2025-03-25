import CSS from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div id={CSS.sidebar}>
            <button id={CSS.addEngineButton}>Add Engine</button>
            <p className={CSS.label}>Engines</p>
        </div> 
    );
}

export default Sidebar;