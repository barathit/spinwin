import React from 'react';
import './Footer.css';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';


const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-nav">
        <span>About</span>
        <span className="divider">|</span>
        <span>FAQ</span>
        <span className="divider">|</span>
        <span>Contact</span>
        <span className="divider">|</span>
        <span>Terms of Services</span>
        <span className="divider">|</span>
        <span>Privacy</span>
      </div>

      <div className="footer-bottom">
        <p className="copyright">Copyright © 2025. All Rights Reserved</p>
        <div className="social-icons">
          <span><FaXTwitter /></span>
          <span><FaThreads /></span>
          <span><FaInstagram /></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
