import '../assets/reset.css';
import CSS from './LandingPage.module.css';
import airplane from '../assets/images/airplane.png';
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/UserStore';
import { handleCreateUser, handleGetUser } from '../handlers/user-handler';
import { useEffect } from 'react';
import useAppStore from '../store/AppStore';

const LandingPage = () => {
  const nav = useNavigate();
  const { 
    userId, 
    user, 
  } = useUserStore();

  const {
    loading,
    navigate,
    error
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

  useEffect(() => {
    if (error) {
      alert("Unable to verify/create user. Please try again.")
    }
  }, [error])

  return (
    <div id={CSS.landingPage}>
      <div className={CSS.container}>
          <div id={CSS.navbar}>
              <p>LOGO</p>
              <button onClick={handleClick} className={CSS.button}>Get started</button>
          </div>
  
          <div id={CSS.mainContent}>
              <h1 id={CSS.heading}>Predict CO and NOx Emissions</h1>
              <div id={CSS.tagline}>
                  <p className={CSS.text}>Generate custom emission predictions and</p>
                  <p className={CSS.text}>visualizations based on engine parameter data</p>
              </div>
              <img id={CSS.airplane} src={airplane} />
          </div>
      </div>
    </div>
  );
};

export default LandingPage;