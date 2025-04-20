import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import EnginePage from './pages/EnginePage';
import ComparePage from './pages/ComparePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:engineId" element={<EnginePage />} />
        <Route path="/home/compare" element={<ComparePage />} />
      </Routes>
    </Router>
  );
}

export default App
