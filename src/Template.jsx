/* eslint-disable react/prop-types */
import Sidebar from "./components/Sidebar/Sidebar";
import MainDisplay from "./components/MainDisplay/MainDisplay";
import "./assets/reset.css"
import './assets/styles.css';
import { useEffect } from "react";
import useUserStore from './store/UserStore';
import { handleGetEngines, handleGetEngineTypes, handlePredictEmissions } from './handlers/user-handler';
import EngineForm from "./components/EngineForm";
import useAppStore from "./store/AppStore";
import Message from "./components/Message";

const Template = ({ children, style }) => {
    const { userId, engines } = useUserStore();
    const { formVisible, engineDeleted, gettingEngines } = useAppStore();

    /**
     * Retrieves engine types upon first render
     */
    useEffect(() => {
        handleGetEngineTypes();
    }, [])

    /**
     * When the add/edit form is closed, the application will
     * retrieve the updated list of engines
     */
    useEffect(() => {
        if (userId && !formVisible) {
            handleGetEngines(userId);
        }
    }, [userId, formVisible]);

    /**
     * When an engine is deleted, the application retrieves the
     * updated list of engines
     */
    useEffect(() => {
        if (engineDeleted) {
            handleGetEngines(userId);
        }
    }, [engineDeleted, userId])

    /**
     * Whenever a new engine list is retrieved, the application will
     * send a request to predict the emissions of the engines
     */
    useEffect(() => {
        if (engines.length > 0 && !gettingEngines) {
            engines.forEach((engine) => {
                handlePredictEmissions(userId, engine.engine_identification)
            })
        }
    }, [userId, engines, gettingEngines])

    return (
        <div className="container">
            <Sidebar />
            <MainDisplay style={style}>
                {children}
            </MainDisplay>
            <EngineForm />
            {formVisible ?  null : <Message />}
        </div>
    )
}

export default Template;