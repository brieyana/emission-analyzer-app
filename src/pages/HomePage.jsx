import '../assets/styles.css';
import Template from "../Template";

const HomePage = () => {
    return (
        <Template style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="message">
                <h2 className="heading2">Ready to Launch</h2>
                <p className="description">Select an engine or add a new one to begin emission prediction.</p>
            </div>
        </Template>
    );
}

export default HomePage;