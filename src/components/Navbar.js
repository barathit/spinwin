import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link" onClick={handleNavClick}>
          <img src="/assets/logo.png" alt="SpinWin Logo" className="logo-img" />
         
        </Link>
      </div>
      
      <div className="navbar-right">
        <button
          className={`navbar-toggle${menuOpen ? ' open' : ''}`}
          aria-label="Toggle navigation"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <span className="navbar-toggle-icon">
            <span />
            <span />
            <span />
          </span>
        </button>
        
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''} 
              onClick={handleNavClick}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''} 
              onClick={handleNavClick}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link 
              to="/usecases" 
              className={location.pathname === '/usecases' ? 'active' : ''} 
              onClick={handleNavClick}
            >
              USECASES
            </Link>
          </li>
          <li>
            <Link 
              to="/gallery" 
              className={location.pathname === '/gallery' ? 'active' : ''} 
              onClick={handleNavClick}
            >
              GALLERY
            </Link>
          </li>
          <li>
            <Link 
              to="/pricing" 
              className={location.pathname === '/pricing' ? 'active' : ''} 
              onClick={handleNavClick}
            >
              PRICING
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''} 
              onClick={handleNavClick}
            >
              CONTACT
            </Link>
          </li>
          <li className="create-wheel-menu-item">
            <Link 
              to="/Dashboardlogin" 
              className="create-wheel-btn1" 
              onClick={handleNavClick}
            >
              <img src="/assets/logo-square-spinnwin.png" alt="icon" className="icon-img" />
              <span className='wheelfont'>CREATE WHEEL</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;