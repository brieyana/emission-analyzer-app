import useUserStore from "../store/UserStore";

const AddEngineButton = () => {
    const { setFormVisible, setFormTitle } = useUserStore();

    const handleClick = () => {
        setFormVisible(true);
        setFormTitle("Add Engine");
    }

    return (
        <button className="text-white bg-black py-3 px-4 rounded-md text-sm font-medium mb-12" onClick={handleClick}>
            Add Engine
        </button>
    );
}

export default AddEngineButton;
