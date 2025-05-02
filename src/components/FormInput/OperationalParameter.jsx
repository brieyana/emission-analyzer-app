/* eslint-disable react/prop-types */
import useAppStore from "../../store/AppStore";

const OperationalParameter = ({ label, name, value, placeholder, handleChange }) => {
    const { isEditMode } = useAppStore();
    const EDIT_MODE = isEditMode();

    return (
        <div>
            <label className="block text-sm font-light mb-1">
                {label}
            </label>
            <input
                className="w-full p-2 border rounded bg-[#f6f6f6]"
                type="number"
                value={value}
                name={name}
                step="0.01"
                min="0"
                onChange={handleChange}
                placeholder={placeholder}
                required={!EDIT_MODE}
            />
        </div>
    );
};

export default OperationalParameter;
