import React, { useRef, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import UserManager from '../utils/userManager';

const DashboardLogin = () => {
  const [mobile, setMobile] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  // Handle mobile number submit
 const handleMobileSubmit = async (e) => {
  e.preventDefault();

  if (!/^\d{10}$/.test(mobile)) {
    setError("Please enter a valid 10-digit mobile number");
    return;
  }

  setError("");

  const fullPhoneNumber = "91" + mobile;

  try {
    const payload = {
      phone_number: fullPhoneNumber,
      method: "userSignup",
      module: "user",
      apikey: "RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA"
    };

    const response = await fetch("https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    const body = typeof result.body === "string" ? JSON.parse(result.body) : result.body;
      
    console.log("OTP API result:", result);
console.log("OTP API body:", body);


    if (body.status === "success") {
      setShowOtp(true);
    } else {
      setError(body.message || "Failed to send OTP. Try again.");
    }

  } catch (error) {
    console.error("OTP send error:", error);
    setError("Something went wrong. Try again later.");
  }
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


const handleOtpSubmit = async (e) => {
  e.preventDefault();

  if (otp.some((digit) => digit === '')) {
    setError("Please enter the complete OTP");
    return;
  }

  const fullOtp = otp.join('');
  const fullPhoneNumber = "91" + mobile;

  try {
    const payload = {
      phone_number: fullPhoneNumber,
      otp: fullOtp,
      method: "verifyOTP",
      module: "user",
      apikey: "RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA"
    };

    const response = await fetch("https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    const body = typeof result.body === "string" ? JSON.parse(result.body) : result.body;
    console.log("OTP verification response:", result);
    console.log("OTP verification body:", body);
    
    if (body.status === "success") {
      // Try to extract user ID from OTP verification response first
      let userId = null;
      
      if (body.data && body.data.user_id) {
        userId = body.data.user_id;
      } else if (body.data && body.data._id) {
        userId = body.data._id;
      } else if (body.user_id) {
        userId = body.user_id;
      } else if (body._id) {
        userId = body._id;
      }
      
      if (userId) {
        console.log('User ID found in OTP response:', userId);
        UserManager.setUserId(userId);
        alert("OTP Verified!");
        navigate("/Dashboardhome");
      } else {
        // Fallback to fetching user ID separately
        console.log('No user ID in OTP response, fetching separately...');
        try {
          await UserManager.fetchUserId(fullPhoneNumber);
          alert("OTP Verified!");
          navigate("/Dashboardhome");
        } catch (userIdError) {
          console.error("Error fetching user ID:", userIdError);
          // Still navigate even if user ID fetch fails
          alert("OTP Verified! Navigating to dashboard...");
          navigate("/Dashboardhome");
        }
      }
    } else {
      setError(body.message || "Invalid OTP");
    }

  } catch (error) {
    console.error("OTP verify error:", error);
    setError("Something went wrong. Please try again.");
  }
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
