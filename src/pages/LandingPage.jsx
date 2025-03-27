import '../assets/reset.css';
import CSS from './LandingPage.module.css';
import airplane from '../assets/images/airplane.png';
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const nav = useNavigate();

  return (
    <div id={CSS.landingPage}>
    <div className={CSS.container}>
        <div id={CSS.navbar}>
            <p>LOGO</p>
            <button onClick={() => nav('/home')} className={CSS.button}>Get started</button>
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