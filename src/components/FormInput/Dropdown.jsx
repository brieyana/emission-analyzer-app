/* eslint-disable react/prop-types */
import useAppStore from "../../store/AppStore";

const Dropdown = ({ label, name, value, handleChange }) => {
    const { engineTypes, isEditMode } = useAppStore();
    const EDIT_MODE = isEditMode();

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>
            <select
                className="w-full p-2 border rounded bg-[#f6f6f6] text-gray-500 cursor-pointer"
                name={name}
                value={value}
                onChange={handleChange}
                required={!EDIT_MODE}
            >
                <option value=''>Select engine type</option>
                {engineTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
