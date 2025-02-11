// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Particles from "react-particles";
import LandingPage from "./components/LandingPage";
import LaunchNFT from "./components/LaunchNFT";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Particles Background */}
        <Particles
          options={{
            particles: {
              number: { value: 50 },
              color: { value: "#6366f1" },
              opacity: { value: 0.3 },
              size: { value: 3 },
              links: { enable: true, color: "#6366f1", opacity: 0.2 },
            },
          }}
          className="absolute inset-0"
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/launch" element={<LaunchNFT />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
