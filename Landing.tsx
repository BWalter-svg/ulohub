import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

// Note: The import for 'logo' has been removed because 
// files in the public folder are accessed via absolute paths.

const Landing: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-container">
      <img
        src="/ulohub.jpg" 
        alt="Ulohub Logo"
        className="landing-logo"
      />

      <footer className="landing-footer">
        <span>from</span>
        <strong>WALME</strong>
      </footer>
    </div>
  );
};

export default Landing;
