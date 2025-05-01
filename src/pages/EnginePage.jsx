import Template from "../Template";
import CSS from "./EnginePage.module.css";
import "../components/ParameterCard";
import ParameterCard from "../components/ParameterCard";
import { useParams } from "react-router-dom";
import useUserStore from "../store/UserStore";
import Radar from "../components/charts/Radar"
import SingleStack from "../components/charts/SingleStack";

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
            <div className="flex flex-col w-full px-6 py-8 gap-14">
                {/* Engine Header */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold">{engine.engine_identification}</h2>
                    <div className="rounded-xl w-fit font-semibold py-[2px] px-[10px] bg-gray-300">
                        {engine.engine_type}
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 divide-x divide-solid divide-gray-300">
                    <ParameterCard parameter="Rated Thrust (kN)" value={engine.rated_thrust} />
                    <ParameterCard parameter="B/P Ratio" value={engine.bp_ratio} />
                    <ParameterCard parameter="Pressure Ratio" value={engine.pressure_ratio} />
                </div>

               
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-[20px]">
                    <div className={`${CSS.chart} p-[30px] bg-white rounded-xl p-4 h-[530px]`}>
                        <Radar engineId={engineId} />
                    </div>
                    <div className={`${CSS.chart} p-[30px] bg-white rounded-xl p-4 h-[530px]`}>
                        <SingleStack engineId={engineId} />
                    </div>
                </div>
            </div>
        </Template>
    );
}

export default EnginePage;