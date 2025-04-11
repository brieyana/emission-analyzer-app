import Template from "../Template";
import CSS from "./EnginePage.module.css";
import "../components/ParameterCard";
import ParameterCard from "../components/ParameterCard";
import { useParams } from "react-router-dom";
import useUserStore from "../store/UserStore";

const EnginePage = () => {
    const { engines } = useUserStore();
    const { engineId } = useParams();
    const engine = engines.find((engine) => engine.engine_identification === engineId) || {};

    return (
        <Template>
            <div className="flex flex-col w-full items-center gap-8">
                <h2 className="font-bold text-center font-[Inter] text-3xl mt-[50px]">{engine.engine_identification}</h2>
                <div className="flex flex-col w-full items-center">
                    <div className="flex flex-col w-full">
                        <div className={`flex justify-between ${CSS.container}`}>
                            <ParameterCard parameter="Rated Thrust (kN)" value={engine.rated_thrust} />
                            <ParameterCard parameter="B/P Ratio" value={engine.bp_ratio} />
                            <ParameterCard parameter="Pressure Ratio" value={engine.pressure_ratio} />
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
}

export default EnginePage;