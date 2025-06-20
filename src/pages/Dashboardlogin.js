import React, { useRef, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
const DashboardLogin = () => {
  const [mobile, setMobile] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  // Handle mobile number submit
  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setShowOtp(true);
  };

  // Handle OTP input
  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    setError('');
    if (value && idx < 3) {
      inputsRef[idx + 1].current.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef[idx - 1].current.focus();
    }
  };


  const handleOtpSubmit = (e) => {
  e.preventDefault();
  if (otp.some((digit) => digit === '')) {
    setError('Please enter the complete OTP');
    return;
  }

  alert('OTP Submitted: ' + otp.join(''));
  // OTP is complete
  navigate('/Dashboardhome');
};


  const handleResend = (e) => {
    e.preventDefault();
    setOtp(['', '', '', '']);
    inputsRef[0].current.focus();
    alert('OTP resent!');
  };



 

  return (
    <div className="login-wrapper">
      <div className="login-card" style={{ borderRadius: '24px', maxWidth: 420 }}>
        <img src="/assets/logo-square-spinnwin.png" alt="Logo" className="login-logo" style={{ width: 90, height: 90 }} />
        <div style={{ fontFamily: 'monospace', fontSize: 38, color: '#ff66cc', textShadow: '0 0 8px #ff66cc', margin: '10px 0 8px 0', fontWeight: 700, letterSpacing: 1 }}>spinwin</div>
        <h2 style={{ color: '#21209c', fontWeight: 700, fontSize: 28, margin: '10px 0 0 0', fontFamily: 'inherit' }}>Dashboard</h2>
        {!showOtp ? (
          <>
            <div style={{ color: '#888', margin: '18px 0 24px 0', fontSize: 17 }}>Enter your phone number to get an OTP</div>
            <form onSubmit={handleMobileSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%' }}>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={10}
                style={{
                  width: '100%',
                  fontSize: 20,
                  padding: '12px 16px',
                  border: '2px solid #bfc6e0',
                  borderRadius: 8,
                  outline: 'none',
                  marginBottom: 18,
                  background: '#fff',
                  color: '#21209c',
                  fontWeight: 500,
                  boxSizing: 'border-box',
                  transition: 'border 0.2s',
                }}
              />
              {error && <div style={{ color: 'red', fontSize: 14, marginBottom: 6 }}>{error}</div>}
              <button type="submit" style={{
                width: '100%',
                background: '#42b24d',
                color: '#fff',
                padding: '14px 0',
                border: 'none',
                borderRadius: 12,
                fontSize: 20,
                fontWeight: 600,
                cursor: 'pointer',
                margin: '10px 0 0 0',
                boxShadow: '0 2px 8px rgba(66,178,77,0.08)'
              }}>Get OTP</button>
            </form>
          </>
        ) : (
          <>
            <div style={{ color: '#888', margin: '18px 0 24px 0', fontSize: 17 }}>OTP sent to your number</div>
            <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputsRef[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    style={{
                      width: 44,
                      height: 44,
                      fontSize: 28,
                      textAlign: 'center',
                      border: '2px solid #bfc6e0',
                      borderRadius: 8,
                      outline: digit ? '2px solid #21209c' : 'none',
                      transition: 'outline 0.2s',
                      background: '#fff',
                      color: '#21209c',
                      fontWeight: 600,
                      boxShadow: digit ? '0 0 0 2px #bfc6e0' : 'none',
                    }}
                  />
                ))}
              </div>
              {error && <div style={{ color: 'red', fontSize: 13, marginBottom: 6 }}>{error}</div>}
              <button type="submit" onClick={handleOtpSubmit} style={{
                width: '100%',
                background: '#42b24d',
                color: '#fff',
                padding: '14px 0',
                border: 'none',
                borderRadius: 12,
                fontSize: 20,
                fontWeight: 600,
                cursor: 'pointer',
                margin: '10px 0 0 0',
                boxShadow: '0 2px 8px rgba(66,178,77,0.08)'
              }}>Submit</button>
            </form>
            <div style={{ marginTop: 18, textAlign: 'center' }}>
              <a href="#" onClick={handleResend} style={{ color: '#21209c', fontSize: 15, textDecoration: 'underline', cursor: 'pointer' }}>Resend OTP</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardLogin;
