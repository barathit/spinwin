import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-box">
        <div className="newsletter-text">
          <p className="tagline">Subscribe</p>
          <h2 className="heading">Get notified on all upcoming giveaways</h2>
        </div>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter Your Email" />
          <button>Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
