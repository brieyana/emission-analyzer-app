import './assets/styles.css'
import Sidebar from './components/Sidebar/Sidebar';
import MainDisplay from './components/MainDisplay/MainDisplay';

const HomePage = () => {
    return (
        <div className="container">
            <Sidebar />
            <MainDisplay />
        </div>
    );
}

export default HomePage;