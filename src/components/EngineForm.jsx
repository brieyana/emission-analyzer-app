/* eslint-disable react/prop-types */
import { useState } from 'react';
import useUserStore from '../store/UserStore';
import { handleAddEngine } from '../handlers/user-handler';

const EngineForm = ({ isVisible, onClose }) => {
  const { userId, formTitle } = useUserStore();

  const [formData, setFormData] = useState({
    engine_identification: '',
    engine_type: '',
    rated_thrust: '',
    bp_ratio: '',
    pressure_ratio: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const data = {
      user_id: userId,
      engine: {
        engine_identification: formData.engine_identification,
        engine_type: formData.engine_type,
        rated_thrust: parseFloat(formData.rated_thrust),
        bp_ratio: parseFloat(formData.bp_ratio),
        pressure_ratio: parseFloat(formData.pressure_ratio),
      }
  };

  if (formTitle == "Add Engine") {
      handleAddEngine(data);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[600px] bg-white rounded-lg shadow-xl text-black overflow-hidden">
        <div className="relative p-4 mt-2 top-6">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-1/2 -translate-y-14 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
        <h2 className="text-[30px] font-bold text-center">{formTitle}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-[20px] max-w-[450px] mx-auto">
        <h3 className="text-[20px] font-semibold mt-2 mb-4 text-center">Engine Information</h3>
          <div className="mb-6">            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Engine Identification Number
              </label>
              <input
                type="text"
                name="engine_identification"
                value={formData.engine_identification}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-[#f6f6f6]"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Engine Type
              </label>
              <input
                type="text"
                name="engine_type"
                value={formData.engine_type}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-[#f6f6f6]"
                required
              />
            </div>
          </div>

          <div className="mb-6 justify-between">
            <h3 className="text-[20px] font-semibold mb-4 text-center">Operational Parameters</h3>
            
            <div className="flex gap-[40px]">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rated Thrust
                </label>
                <input
                  type="number"
                  name="rated_thrust"
                  step="0.01"
                  min="0"
                  value={formData.rated_thrust}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-[#f6f6f6]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  B/P Ratio
                </label>
                <input
                  type="number"
                  name="bp_ratio"
                  step="0.01"
                  min="0"
                  value={formData.bp_ratio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-[#f6f6f6]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Pressure Ratio
                </label>
                <input
                  type="number"
                  name="pressure_ratio"
                  step="0.01"
                  min="0"
                  value={formData.pressure_ratio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-[#f6f6f6]"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-[140px] mx-auto block bg-black text-white py-3 rounded-md hover:bg-[#181818] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EngineForm;