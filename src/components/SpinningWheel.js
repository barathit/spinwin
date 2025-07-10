import React, { useState, useRef, useEffect } from 'react';
import './SpinningWheel.css'; // Import the external CSS file

const SpinningWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [wheelData, setWheelData] = useState([]);
  const [loadingWheel, setLoadingWheel] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const wheelRef = useRef(null);

  useEffect(() => {
    const fetchWheelData = async () => {
      try {
        const payload = {
          method: "getWheelOfTheDay",
          module: "player",
          apikey: "RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA",
          secret: "R1eqD2twI3E4",
        };

        const response = await fetch("https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        console.log("Wheel API response:", data);
        
        let parsedBody;
        try {
          parsedBody = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        } catch (e) {
          parsedBody = {};
        }
   
        console.log("dparse", parsedBody);

        if (
          parsedBody.status === "success" &&
          parsedBody.data &&
          Array.isArray(parsedBody.data.pies)
        ) {
          // Vibrant colors matching the image design
          const defaultColors = [
            "#FF4500", "#FF69B4", "#32CD32", "#FFD700", 
            "#8A2BE2", "#FF8C00", "#00BFFF", "#FF1493"
          ];
          const wheelData = parsedBody.data.pies.map((label, idx) => ({
            label,
            color: defaultColors[idx % defaultColors.length],
            textColor: "#fff"
          }));
          setWheelData(wheelData);
        } else {
          alert("⚠️ Failed to load wheel data.");
        }
      } catch (error) {
        console.error("Wheel fetch error:", error);
        alert("🚫 Error fetching wheel data.");
      } finally {
        setLoadingWheel(false);
      }
    };

    fetchWheelData();
  }, []);

  const segmentAngle = 360 / (wheelData.length || 1);

  const handleSpin = () => {
    if (isSpinning || wheelData.length === 0) return;

    setIsSpinning(true);
    setShowResult(false);
    setResult(null);

    const winningIndex = Math.floor(Math.random() * wheelData.length);
    const prize = wheelData[winningIndex];

    // Enhanced spinning animation with multiple rotations
    const baseRotations = 8; // More rotations for better effect
    const targetAngle = winningIndex * segmentAngle + segmentAngle / 2;
    const finalAngle = 360 - targetAngle;
    const totalRotation = rotation + baseRotations * 360 + finalAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setResult(prize);
      setShowResult(true);
      setIsSpinning(false);
    }, 5000);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleMobileSubmit = async () => {
    if (!validateMobileNumber(mobileNumber)) {
      setIsValidMobile(false);
      return;
    }

    setIsValidMobile(true);

    const payload = {
      method: "getWheelOfTheDay",
      module: "player",
      apikey: "RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA",
      secret: "R1eqD2twI3E4",
      mobile: mobileNumber,
      reward: result.label,
      business: "Ghibli-style images"
    };

    try {
      const response = await fetch("https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        alert("🎉 Your reward has been successfully claimed!");
        closeModal();
      } else {
        alert("❌ Failed to claim prize: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  const closeModal = () => {
    setShowResult(false);
    setMobileNumber('');
    setResult(null);
    setIsValidMobile(true);
    setAcceptedTerms(false);
  };

  if (loadingWheel) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div>Loading Wheel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="spinning-wheel-container">
      {/* Modal - Centered overlay that doesn't affect background */}
      {showResult && (
        <div className="custom-modal-overlay">
          <div className="custom-modal animate-bounce">
            <button
              onClick={closeModal}
              className="close-btn"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="modal-emoji">🎉</div>
              <h2 className="modal-title">
                Congratulations!
              </h2>
              <div className="prize-display">
                <p className="prize-label">
                  You won: {result?.label}
                </p>
                <p className="business-label">
                  Business: Ghibli-style images
                </p>
              </div>
            </div>
            
            <hr className="modal-divider" />
            
            <div className="form-section">
              <label className="form-label">
                Enter your mobile number to claim prize
              </label>
              
              <div className="mobile-input-group">
                <div className="country-code">
                  +91
                </div>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    setIsValidMobile(true);
                  }}
                  className="mobile-input"
                  placeholder="Enter 10-digit number"
                  maxLength="10"
                />
              </div>
              
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="custom-checkbox"
                />
                <label htmlFor="terms" className="checkbox-label">
                  I accept the Terms & Conditions
                </label>
              </div>
              
              {!isValidMobile && (
                <p className="error-message">
                  Please enter a valid 10-digit mobile number
                </p>
              )}
              
              <button
                onClick={handleMobileSubmit}
                disabled={!mobileNumber || !acceptedTerms}
                className={`submit-button ${
                  mobileNumber && acceptedTerms ? 'enabled' : 'disabled'
                }`}
              >
                {mobileNumber && acceptedTerms ? 'Claim Prize 🎁' : 'Fill details to claim'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="main-content">
        {/* Business title */}
        
        
        {/* Wheel container with perfectly centered pointer */}
        <div className="wheel-container">
          <div className="wheel-svg-container">
            {/* Fixed pointer at the top center - pointing to 12 o'clock */}
            <div className="spinning-wheel-pointer">
              <svg viewBox="0 0 30 30">
                <polygon 
                  points="15,5 22,25 8,25" 
                  fill="#DC2626" 
                  stroke="#1f2937" 
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* The spinning wheel */}
            <svg
              ref={wheelRef}
              className={`wheel-svg ${isSpinning ? 'spinning' : ''}`}
              style={{ transform: `rotate(${rotation}deg)` }}
              viewBox="0 0 400 400"
            >
              {/* Outer ring */}
              <circle 
                cx="200" 
                cy="200" 
                r="190" 
                className="wheel-outer-border"
              />
              
              {/* Wheel segments */}
              {wheelData.map((segment, index) => {
                const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
                const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
                const x1 = 200 + 180 * Math.cos(startAngle);
                const y1 = 200 + 180 * Math.sin(startAngle);
                const x2 = 200 + 180 * Math.cos(endAngle);
                const y2 = 200 + 180 * Math.sin(endAngle);
                const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                const pathData = [
                  `M 200 200`,
                  `L ${x1} ${y1}`,
                  `A 180 180 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `Z`
                ].join(' ');

                const textAngle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
                const textX = 200 + 120 * Math.cos(textAngle);
                const textY = 200 + 120 * Math.sin(textAngle);

                return (
                  <g key={index}>
                    <path 
                      d={pathData} 
                      fill={segment.color} 
                      stroke="#1f2937" 
                      strokeWidth="3"
                    />
                    <text
                      x={textX}
                      y={textY}
                      className="wheel-segment-text"
                      textAnchor="middle"
                      dy="0.3em"
                      transform={`rotate(${index * segmentAngle + segmentAngle / 2}, ${textX}, ${textY})`}
                    >
                      {segment.label}
                    </text>
                  </g>
                );
              })}
              
              {/* Center hub */}
              <circle 
                cx="200" 
                cy="200" 
                r="20" 
                className="wheel-center-hub"
              />
            </svg>
          </div>
        </div>
                   {/* <div className="wheel-caption">Ghibli-style images</div>    

              {/* <div className="business-title">
          Ghibli-style images
        </div> */}

        {/* Spin button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="spin-button1"
        >
           
            SPIN
          
        </button>
      </div>

      <div
        // className="hero-bg-city"
        // style={{ background: "url('/assets/hme_building.png') top left/cover no-repeat" }}
      />
    </div>
  );
};

export default SpinningWheel;