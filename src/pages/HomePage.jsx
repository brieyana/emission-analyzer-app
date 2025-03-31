import '../assets/styles.css';
import '../assets/reset.css'
import Sidebar from '../components/Sidebar/Sidebar';
import MainDisplay from '../components/MainDisplay/MainDisplay';
import { useEffect } from 'react';
import useUserStore from '../store/UserStore';
import { handleGetUserData } from '../handlers/user-handler';

const HomePage = () => {
    const { userId } = useUserStore();

    useEffect(() => {
        if (userId) {
            handleGetUserData(userId);
        }
    }, [userId]);

    return (
        <div className="container">
            <Sidebar />
            <MainDisplay style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="message">
                    <h2 className="heading2">Houston, We Need an Engine</h2>
                    <p className="description">Select an engine or add a new one to begin emission prediction.</p>
                </div>
            </MainDisplay>
        </div>
    );
}

export default HomePage;