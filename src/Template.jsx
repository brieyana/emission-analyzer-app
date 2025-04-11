/* eslint-disable react/prop-types */
import Sidebar from "./components/Sidebar/Sidebar";
import MainDisplay from "./components/MainDisplay/MainDisplay";
import "./assets/reset.css"
import './assets/styles.css';
import { useEffect } from "react";
import useUserStore from './store/UserStore';
import { handleGetEngines } from './handlers/user-handler';
import EngineForm from "./components/EngineForm";

const Template = ({ children, style }) => {
    const { userId, formVisible, setFormVisible } = useUserStore();

    useEffect(() => {
        if (userId) {
            handleGetEngines(userId);
        }
    }, [userId]);

    return (
        <div className="container">
            <Sidebar />
            <MainDisplay style={style}>
                {children}
            </MainDisplay>
            <EngineForm isVisible={formVisible} onClose={() => setFormVisible(false)} />    
        </div>
    )
}

export default Template;