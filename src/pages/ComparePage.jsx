import Template from "../Template";
import CSS from "./EnginePage.module.css";
import "../assets/styles.css";
import "../components/ParameterCard";
import useAppStore from "../store/AppStore";
import StackedBar from "../components/charts/StackedBar"
import useUserStore from "../store/UserStore";
import Radar from "../components/charts/Radar";
import { useState } from "react";

const ComparePage = () => {
    const selectedEngineIds = useAppStore((state) => state.selectedEngineIds);
    const { engines } = useUserStore();
    const [isSticky, setIsSticky] = useState(false);
    const MAX_ENGINES = 3;

    if (selectedEngineIds.length < 2 || selectedEngineIds.length > MAX_ENGINES) {
        return (
            <Template style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="flex flex-col w-full items-center gap-2">
                    <h2 className="text-3xl font-bold text-center text-600">Select Engines For Comparison</h2>
                    <p className="description">
                        Please select up to three engines to compare.
                    </p>
                </div>
            </Template>
        );
    }

    return (
        <Template>
            <div className="flex flex-col w-full px-6 py-8 gap-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold">{`${selectedEngineIds.join(', ')}`}</h2>
                </div>
                <div className={isSticky ? "sticky" : `pt-[20px] pb-[40px]`}>
                    <div className="flex justify-between">
                        <h3 className={`text-1xl font-semibold mb-4`}>Engine Specifications</h3>
                        <div className="flex items-center gap-2">
                            <input
                            type="checkbox"
                            id="sticky-toggle"
                            checked={isSticky}
                            onChange={(e) => setIsSticky(e.target.checked)}
                            className="cursor-pointer"
                            />
                            <label htmlFor="sticky-toggle" className="cursor-pointer text-sm font-medium text-gray-700">
                                Pin
                            </label>
                        </div>
                    </div>
                    <div className={`${CSS.chart} p-[15px] rounded-xl bg-white overflow-x-auto`}>
                        <table className="w-full font-[Source_Sans_3] table-auto">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 font-semibold text-left">Engine</th>
                                <th className="px-4 py-2 font-semibold text-center">Rated Thrust (kN)</th>
                                <th className="px-4 py-2 font-semibold text-center">B/P Ratio</th>
                                <th className="px-4 py-2 font-semibold text-center">Pressure Ratio</th>
                                <th className="px-4 py-2 font-semibold text-center">Engine Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedEngineIds.map((engineId) => {
                                const engine = engines.find((e) => e.engine_identification === engineId);
                                return (
                                <tr key={engineId}>
                                    <td className="px-4 py-2">{engine?.engine_identification || 'Loading...'}</td>
                                    <td className="px-4 py-2 text-center">{engine?.rated_thrust || '-'}</td>
                                    <td className="px-4 py-2 text-center">{engine?.bp_ratio || '-'}</td>
                                    <td className="px-4 py-2 text-center">{engine?.pressure_ratio || '-'}</td>
                                    <td className="px-4 py-2 text-center">{engine?.engine_type || '-'}</td>
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h3 className="text-1xl font-semibold mb-4">Predicted Emission Level Distributions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedEngineIds.map((engineId) => {
                            return (
                                <div
                                    key={`radar-${engineId}`}
                                    className={`${CSS.chart} p-[30px] bg-white rounded-xl p-4 h-[530px]`}
                                >
                                    <Radar engineId={engineId} />
                                </div>
                            );
                        })}
                        {selectedEngineIds.length % 2 !== 0 && (
                            <div className="hidden md:block" />
                        )}
                    </div>
                </div>
                <div>
                <h3 className="text-1xl font-semibold mb-4">Predicted Absolute Emission Levels</h3>
                    <div className={`${CSS.chart} p-[30px] bg-white rounded-xl p-4 h-[530px]`}>
                        <StackedBar />
                    </div>
                </div>
            </div>
        </Template>
    );
}

export default ComparePage;