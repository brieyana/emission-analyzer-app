import Template from "../Template";
import CSS from "./EnginePage.module.css";
import "../components/ParameterCard";
import useAppStore from "../store/AppStore";
import StackedBar from "../components/charts/StackedBar"


const ComparePage = () => {
    const selectedEngineIds = useAppStore((state) => state.selectedEngineIds);
    console.log(selectedEngineIds);

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