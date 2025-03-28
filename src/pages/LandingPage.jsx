import '../assets/reset.css';
import CSS from './LandingPage.module.css';
import airplane from '../assets/images/airplane.png';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import useUserStore from '../store/UserStore';

const LandingPage = () => {
  const { user, createUser } = useUserStore();
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      nav(`/home`)
    }
  });

  return (
    <div id={CSS.landingPage}>
      <div className={CSS.container}>
          <div id={CSS.navbar}>
              <p>LOGO</p>
              <button onClick={createUser} className={CSS.button}>Get started</button>
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