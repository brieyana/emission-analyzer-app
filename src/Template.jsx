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
    const { userId, engines, emissions } = useUserStore();
    const { formVisible } = useAppStore();

    useEffect(() => {
        if (userId && !formVisible) {
            handleGetEngines(userId);
            handleGetEngineTypes();
        }
    }, [userId, formVisible]);

    useEffect(() => {
        if (engines.length != 0) {
            engines.forEach((engine) => {
                handlePredictEmissions(userId, engine.engine_identification)
            })
        }
    }, [userId, engines])

    useEffect(() => {
        console.log(emissions)
    }, [emissions])

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