import Features from './landing-features'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
    return (
      <section className="p-6 bg-[#f9f8f6] text-center w-[95%] mx-auto rounded-xl">
        <h2 className="text-3xl font-bold text-black">
            <span className="text-orange-500">Predict</span> CO and NOx<br />Emissions</h2>
        <p className="mt-2 text-lg text-black">
          Generate custom emission predictions and<br /> visualizations based on engine parameter data
        </p>
        <button onClick={() => navigate('/home')} className="btn bg-black text-white mt-6 px-16 py-2 rounded-lg shadow-xl">
          Get started
        </button>
        <Features />
      </section>
    );
  };
  
  export default Hero;