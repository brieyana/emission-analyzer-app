import Template from "../Template";
import CSS from "./EnginePage.module.css";
import "../components/ParameterCard";
import ParameterCard from "../components/ParameterCard";
import { useParams } from "react-router-dom";
import useUserStore from "../store/UserStore";
import Radar from "../components/charts/Radar"

const EnginePage = () => {
    const { engines } = useUserStore();
    const { engineId } = useParams();
    const engine = engines.find((engine) => engine.engine_identification === engineId) || {};

    if (Object.keys(engine).length === 0) {
        return (
            <Template style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="flex flex-col w-full items-center">
                    <h2 className="text-3xl font-bold text-center text-600">Engine Not Found</h2>
                    <p className="mt-2 text-center text-gray-600">
                        This engine is not associated with your account.
                    </p>
                </div>
            </Template>
        );
    }

    return (
        <Template>
            <div className="flex flex-col w-full items-center gap-8">
                <h2 className="font-bold text-center font-[Inter] text-3xl mt-[50px]">{engine.engine_identification}</h2>
                <div className="flex flex-col w-full items-center">
                    <div className="flex flex-col w-full gap-4">
                        <div className={`flex justify-between ${CSS.container}`}>
                            <ParameterCard parameter="Rated Thrust (kN)" value={engine.rated_thrust} />
                            <ParameterCard parameter="B/P Ratio" value={engine.bp_ratio} />
                            <ParameterCard parameter="Pressure Ratio" value={engine.pressure_ratio} />
                        </div>
                        <div className={`${CSS.container} min-h-[530px] h-[530px]`}>
                            <Radar engineId={engineId}/>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
}

export default EnginePage;