import React from 'react';
import SpinningWheel from '../components/SpinningWheel'; // Your existing component
import './Spinpage.css'; // External CSS for styling

const SpinPage = () => {
  return (
    <div className="spin-page-container">
      {/* Left side: Spinning Wheel */}
      <div className="left-side">
        <SpinningWheel />
      </div>

      {/* Right side: Spin Your Luck Form */}
      <div className="right-side">
        <div className="form-box">
          <div className="logo">
            <img src="/assets/logo-square-spinnwin.png" alt="Spin Logo" style={{ width: '60px' }} />
            <h1>spin<span className="highlight">‘n’</span>Win</h1>
          </div>
          <h2>
            Spin <span className="highlight2">Your</span> <span className="highlight3">Luck!</span>
          </h2>
          <input type="text" placeholder="Enter your phone number" className="input-box" />
          <button className="spin-button">Let's Play!</button>
        </div>
      </div>
    </div>
  );
};

export default SpinPage;
