import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Smartmatch. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
