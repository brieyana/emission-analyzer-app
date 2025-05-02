import dashboard from "../assets/images/dashboard.png";

const Preview = () => {
    return (
        <div className="z-10 flex flex-col h-fit w-[70%] relative">
            <div className="flex justify-start items-center h-[45px] bg-[#bcbcbc] rounded-t-[10px]">
                <div className="flex p-4 gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-400" />
                    <div className="w-4 h-4 rounded-full bg-yellow-400" />
                    <div className="w-4 h-4 rounded-full bg-green-400" />
                </div>
            </div>
            <img className="block screen" src={dashboard} />
        </div>

    );
}

export default Preview;