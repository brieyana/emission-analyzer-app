import '../assets/styles.css';
import '../assets/reset.css';
import Sidebar from '../components/Sidebar/Sidebar';
import MainDisplay from '../components/MainDisplay/MainDisplay';
import { useEffect, useState } from 'react';
import useUserStore from '../store/UserStore';
import { handleGetUserData } from '../handlers/user-handler';
import NewModal from './AddNewModal';

const HomePage = () => {
    const { userId } = useUserStore();
    const [newModalVisible, setNewModalVisible] = useState(false);

    useEffect(() => {
        if (userId) {
            handleGetUserData(userId);
        }
    }, [userId]);

    return (
        <div className="container">
            <Sidebar onAddEngineClick={() => setNewModalVisible(true)}/>
            <MainDisplay style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="message">
                    <h2 className="heading2">Houston, We Need an Engine</h2>
                    <p className="description">Select an engine or add a new one to begin emission prediction.</p>
                </div>
                <NewModal isVisible={newModalVisible} onClose={() => setNewModalVisible(false)}/>
            </MainDisplay>
        </div>
    );
}

export default HomePage;