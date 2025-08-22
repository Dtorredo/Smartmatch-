import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Welcome to Smartmatch</h1>
        <p>Connect with opportunities that match your skills and ambitions</p>
        <Link to="/login" className="btn-primary hero-btn">Get Started</Link>
      </div>
    </div>
  );
}

export default Hero;