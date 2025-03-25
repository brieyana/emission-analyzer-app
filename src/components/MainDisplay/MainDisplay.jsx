import CSS from './MainDisplay.module.css';

const MainDisplay = ({ children, style }) => {
    return (
        <div id={CSS.mainDisplay} style={style}>
            {children}
        </div>
    );
}

export default MainDisplay;