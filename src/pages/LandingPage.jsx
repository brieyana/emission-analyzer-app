import '../assets/reset.css';
import CSS from './LandingPage.module.css';
import airplane from '../assets/images/airplane.png';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { axiosInstance } from '../../client';

const LandingPage = () => {
  const [userId, setUserId] = useState(null);
  const nav = useNavigate();

  const handleClick = async () => {
    let storedId = localStorage.getItem("user_id");

    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("user_id", storedId);
    }

    setUserId(storedId);

    try {
      const res = await axiosInstance.post(`/add-user/`, {
        user_id: storedId
      });
      console.log("Response: ", res.data);
      nav('/home');
    } catch (error) {
      alert("Unable to create user ID. Please try again.");
      console.log(error.response.data);
    }
  }

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