// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="left-nav-items">
        <Link to="/">
          <img src="/assets/logo.png" alt="SpinWin Logo" className="logo-img" />
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>HOME</Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ABOUT</Link>
        </li>
        <li>
          <Link to="/usecases" className={location.pathname === '/usecases' ? 'active' : ''}>USECASES</Link>
        </li>
        <li>
          <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>GALLERY</Link>
        </li>
        <li>
          <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>PRICING</Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>CONTACT</Link>
        </li>
      </ul>

      
     <Link to="/Dashboardlogin" className="create-wheel-btn">
  <img src="/assets/logo-square-spinnwin.png" alt="icon" className="icon-img" />
  <span>CREATE WHEEL</span>
</Link>

    </nav>
  );
}

export default Navbar;
