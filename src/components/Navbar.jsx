import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Smartmatch
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/reviews" className="nav-item">Reviews</Link>
        </div>
        <div className="nav-button">
          {user ? (
            null // No button for logged-in users on homepage Navbar
          ) : (
            <Link to="/login" className="btn-primary">Get Started</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
