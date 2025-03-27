const Features = () => {
    return (
      <div className="mt-16 flex flex-col md:flex-row gap-24 justify-center h-64 ">
        <div className="bg-white border-2 p-6 rounded-xl shadow-md w-full md:w-1/5">
          <h3 className="text-xl font-bold text-black mb-2 pt-4">Simple and Intuitive</h3>
          <p className="text-gray-700 pt-4">
            Our application ensures simplicity and ease of navigation.
          </p>
        </div>
  
        <div className="bg-white border-2 p-6 rounded-xl shadow-md w-full md:w-1/5">
          <h3 className="text-xl font-bold text-black mb-2 pt-4">Interactive Visualizations</h3>
          <p className="text-gray-700 pt-4">
            Analyze CO, NOx, and operational parameters with dynamic graphics.
          </p>
        </div>
  
        <div className="bg-white border-2 p-6 rounded-xl shadow-md w-full md:w-1/5">
          <h3 className="text-xl font-bold text-black mb-2 pt-4">Accurate Predictions</h3>
          <p className="text-gray-700 pt-4">
            Get precise emission forecasts based on real-world data.
          </p>
        </div>
      </div>
    );
  };
  
  export default Features;