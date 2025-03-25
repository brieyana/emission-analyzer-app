import CSS from './MainDisplay.module.css';

const MainDisplay = ({ children }) => {
    return (
        <div id={CSS.mainDisplay}>
            {children}
        </div>
    );
}

export default MainDisplay;