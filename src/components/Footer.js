import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Subscription Section */}
        <div className="subscription-section">
          <div className="subscription-content">
            <h3 className="subscription-title">Subscribe</h3>
            <h2 className="subscription-subtitle">Get notified on all upcoming giveaways</h2>
          </div>
          <div className="subscription-form">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
            <button onClick={handleSubscribe} className="subscribe-btn">
              Subscribe
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="footer-nav">
          <a href="#about" className="nav-link">About</a>
          <span className="nav-divider">|</span>
          <a href="#faq" className="nav-link">FAQ</a>
          <span className="nav-divider">|</span>
          <a href="#contact" className="nav-link">Contact</a>
          <span className="nav-divider">|</span>
          <a href="#terms" className="nav-link">Terms of Services</a>
          <span className="nav-divider">|</span>
          <a href="#privacy" className="nav-link">Privacy</a>
        </nav>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright">
            Copyright © 2025. All Rights Reserved
          </div>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Threads">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.473c0-3.113.85-5.967 2.495-8.516C5.845 1.205 8.598.024 12.179 0h.014c3.581.024 6.334 1.205 8.184 3.509 1.645 2.052 2.495 4.906 2.495 8.019 0 3.113-.85 5.967-2.495 8.516C18.534 22.795 15.781 23.976 12.186 24zM12.179 2.25c-2.69.018-4.793.797-6.084 2.25-1.35 1.678-2.046 3.995-2.046 6.723 0 2.728.696 5.045 2.046 6.723 1.291 1.453 3.394 2.232 6.084 2.25h.007c2.69-.018 4.793-.797 6.084-2.25 1.35-1.678 2.046-3.995 2.046-6.723 0-2.728-.696-5.045-2.046-6.723-1.291-1.453-3.394-2.232-6.084-2.25h-.007z"/>
                <path d="M17.34 13.5c-.27-1.36-1.04-2.46-2.23-3.17-.87-.52-1.95-.75-3.11-.66-1.16.09-2.23.58-3.07 1.41-.84.83-1.31 1.93-1.35 3.17-.04 1.24.35 2.36 1.13 3.22.78.86 1.82 1.37 3.01 1.48 1.19.11 2.37-.19 3.41-.87.76-.49 1.38-1.16 1.79-1.93.21-.39.13-.87-.18-1.17-.31-.3-.8-.35-1.17-.13-.33.2-.7.34-1.08.41-.38.07-.77.05-1.13-.06-.36-.11-.69-.3-.95-.56-.26-.26-.45-.58-.55-.93-.1-.35-.11-.72-.03-1.08.08-.36.24-.7.46-.99.22-.29.5-.52.82-.68.32-.16.67-.24 1.03-.24.36 0 .71.08 1.03.24.32.16.6.39.82.68.13.17.23.36.3.56.04.11.07.22.09.33.04.22.2.4.42.47.22.07.45.02.63-.13.18-.15.28-.37.28-.61 0-.07-.01-.14-.02-.21z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;