import '../assets/styles.css';
import '../assets/reset.css'
import Sidebar from '../components/Sidebar/Sidebar';
import MainDisplay from '../components/MainDisplay/MainDisplay';

const HomePage = () => {
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