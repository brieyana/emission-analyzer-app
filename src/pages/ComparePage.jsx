import Template from "../Template";
import CSS from "./EnginePage.module.css";
import "../components/ParameterCard";
import useAppStore from "../store/AppStore";
import StackedBar from "../components/charts/StackedBar"


const ComparePage = () => {
    const selectedEngineIds = useAppStore((state) => state.selectedEngineIds);
    const MAX_ENGINES = 2;

    if (selectedEngineIds.length < MAX_ENGINES) {
        return (
            <Template style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="flex flex-col w-full items-center">
                    <h2 className="text-3xl font-bold text-center text-600">Not Enough Engines Selected</h2>
                    <p className="mt-2 text-center text-gray-600">
                        Please select at least two engines to compare.
                    </p>
                </div>
            </Template>
        );
    }

    return (
        <Template>
            <div className="flex flex-col w-full items-center gap-8">
            <h2 className="font-bold text-center font-[Inter] text-3xl mt-[50px] whitespace-pre-line">{`Compare\n${selectedEngineIds.join(', ')}`}</h2>
                <div className="flex flex-col w-full items-center">
                    <div className="flex flex-col w-full">
                        <div className={`${CSS.container} min-h-[530px] h-[530px]`}>
                            <StackedBar/>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
}

export default ComparePage;