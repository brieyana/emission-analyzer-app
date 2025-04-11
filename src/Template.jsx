/* eslint-disable react/prop-types */
import Sidebar from "./components/Sidebar/Sidebar";
import MainDisplay from "./components/MainDisplay/MainDisplay";
import "./assets/reset.css"
import './assets/styles.css';
import { useEffect, useState } from "react";
import useUserStore from './store/UserStore';
import { handleGetEngines } from './handlers/user-handler';
import NewModal from "./pages/AddNewModal";

const Template = ({ children }) => {
    const { userId } = useUserStore();
    const [newModalVisible, setNewModalVisible] = useState(false);

    useEffect(() => {
        if (userId) {
            handleGetEngines(userId);
        }
    }, [userId]);

    return (
        <div className="container">
            <Sidebar onAddEngineClick={() => setNewModalVisible(true)} />
            <MainDisplay>
                {children}
            </MainDisplay>
            <NewModal isVisible={newModalVisible} onClose={() => setNewModalVisible(false)}/>
        </div>
    )
}

export default Template;