import '../assets/reset.css';
import "../assets/styles.css";
import CSS from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/UserStore';
import { handleCreateUser, handleGetUser } from '../handlers/user-handler';
import { getToken } from '../services/user-service';
import { useEffect, useRef, useState } from 'react';
import useAppStore from '../store/AppStore';
import Message from '../components/Message';
import Preview from '../components/Preview';
import logo from '../assets/images/venn-logo.png';
import FeatureSection from '../components/FeatureSection';

const LandingPage = () => {
    const nav = useNavigate();
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getToken();
    }, [])
    
    const { 
        userId, 
        user, 
    } = useUserStore();

    const {
        loading,
        navigate,
        setNavigate
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
            setNavigate(false);
            nav(`/home`);
        }
    }, [loading, user, navigate, setNavigate, nav])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current)
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [])

    return (
        <div id={CSS.landingPage}>
            <Message />
            <div className="flex flex-col p-[50px] pb-[500px] grad">
                <div className="flex w-full items-center justify-between p-6 mb-12">
                    <img className="w-[50px] block" src={logo} />
                    <button onClick={handleClick} className={CSS.button}>
                        Get started
                    </button>
                </div>
                <div className="slide-in-left flex flex-col gap-2 text-center mb-10">
                    <h1 className="w-full text-7xl font-bold">
                        Predict <span>CO</span> and <span>NOx</span> Emissions
                    </h1>
                    <p className="italic font-light text-xl">Generate custom emission predictions and visualizations based on engine parameter data</p>
                </div>
                <div className="slide-in-right flex justify-center relative">
                    <div className="absolute inset-0 flex justify-center z-0">
                        <div className="w-full max-w-[70%] rounded-[10px] bg-[#1E90FF] translate-x-3 translate-y-3" />
                    </div>
                    <Preview />
                </div>
            </div>
            <div className="p-[50px] flex flex-col gap-8">
                <h2 
                    ref={ref}
                    className={`${isVisible ? 'visible' : ''} fade-in w-full text-center text-5xl font-bold`}
                >
                    Supported Features
                </h2>
                <FeatureSection />
            </div>
        </div>
    );
}

export default LandingPage;