import React, { useState } from 'react';
import './Dashboard.css';

const DashboardLogin = () => {
  const [loginInput, setLoginInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`OTP sent to ${loginInput}`);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src="/assets/logo-square-spinnwin.png" alt="Logo" className="login-logo" />
        <h1 className="login-brand">SpinWin</h1>
        <h2 className="login-heading">Dashboard Access</h2>
        <p className="login-instruction">Enter your phone number to receive an OTP</p>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-submit-btn">Get OTP</button>
        </form>
      </div>
    </div>
  );
};

export default DashboardLogin;
