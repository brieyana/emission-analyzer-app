import '../assets/reset.css';
import CSS from './LandingPage.module.css';
import airplane from '../assets/images/airplane.png';
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/UserStore';
import { handleCreateUser, handleGetUser } from '../handlers/user-handler';
import { useEffect } from 'react';
import useAppStore from '../store/AppStore';
import Message from '../components/Message';

const LandingPage = () => {
  const nav = useNavigate();
  const { 
    userId, 
    user, 
  } = useUserStore();

  const {
    loading,
    navigate
  } = useAppStore();

  const handleClick = async () => {
    if (!userId) {
      await handleCreateUser();
    } else {
      await handleGetUser(userId);
    }
  }

  useEffect(() => {
    if (user && !loading && navigate) {
      nav(`/home`);
    }
  }, [loading, user, navigate, nav])

  return (
    <div id={CSS.landingPage}>
      <Message />
      <img className={`block fixed top-[250px] left-[300px] ${CSS.airplane}`} src={airplane} />
      <div className="relative top-[100px] flex items-center h-screen max-w-[500px] ml-[50px]">
        <div className="flex flex-col gap-4">
          <h1 className="leading-[80px] text-8xl font-bold" style={{ letterSpacing: '-0.05em' }}>
            Predict
            <br />
            CO and NOx
            <br />
            Emissions
          </h1>
          <p className="text-xl italic font-thin">Generate custom emission predictions and visualizations based on engine parameter data</p>
          <button onClick={handleClick} className={CSS.button}>Get started</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;