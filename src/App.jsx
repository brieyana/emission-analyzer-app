import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './HomePage';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App
