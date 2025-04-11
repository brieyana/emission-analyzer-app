import { useState } from 'react';

const NewModal = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    engineId: '',
    engineType: '',
    ratedThrust: '',
    bpRatio: '',
    pressureRatio: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedData = {
      ...formData,
      ratedThrust: parseFloat(formData.ratedThrust),
      bpRatio: parseFloat(formData.bpRatio),
      pressureRatio: parseFloat(formData.pressureRatio),
    };
    console.log('Form data:', parsedData);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[600px] bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative p-4 mt-2 top-6">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-1/2 -translate-y-14 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
        <h2 className="text-[30px] font-bold text-center">Add an Engine</h2>
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
                name="engineId"
                value={formData.engineId}
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
                name="engineType"
                value={formData.engineType}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-[#f6f6f6]"
                required
              />
            </div>
          </div>

          <div className="mb-6 justify-between">
            <h3 className="text-[20px] font-semibold mb-4 text-center">Operational Parameters</h3>
            
            <div className="grid grid-cols-3 gap-[40px]">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rated Thrust (kN)
                </label>
                <input
                  type="number"
                  name="ratedThrust"
                  step="0.01"
                  min="0"
                  value={formData.ratedThrust}
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
                  name="bpRatio"
                  step="0.01"
                  min="0"
                  value={formData.bpRatio}
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
                  name="pressureRatio"
                  step="0.01"
                  min="0"
                  value={formData.pressureRatio}
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

export default NewModal;