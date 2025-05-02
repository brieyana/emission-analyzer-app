/* eslint-disable react/prop-types */
import useAppStore from "../../store/AppStore";

const TextInput = ({ label, name, placeholder, value, handleChange }) => {
    const { isEditMode } = useAppStore();
    const EDIT_MODE = isEditMode();

    return (
        <div className="mb-4">
            <label className="block text-sm font-light mb-1">
                {label}
            </label>
            <input
                className="w-full p-2 border rounded bg-[#f6f6f6] text-gray-500"
                type="text"
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={EDIT_MODE}
                required
            />
        </div>
    );
};

export default TextInput;