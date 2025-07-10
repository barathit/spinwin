import React, { useState, useEffect } from 'react';
import './WheelBannerGenerator.css';
import UserManager from '../utils/userManager';

const API_URL = 'https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/';
const API_KEY = 'RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA';

function getWheelFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('selectedWheel'));
  } catch {
    return null;
  }
}

const COLORS = ['#f44336', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#ff9800', '#00bcd4', '#8bc34a'];

function WheelSVG({ pies, size = 270 }) {
  // Add safety check for pies
  if (!pies || !Array.isArray(pies) || pies.length === 0) {
    return (
      <svg width={size} height={size} className="wheel-svg">
        <circle cx={size/2} cy={size/2} r={size/2 - 10} fill="#f0f0f0" stroke="#ccc" strokeWidth="2" />
        <text x={size/2} y={size/2} textAnchor="middle" dy=".3em" fill="#666" fontSize="14">
          No data
        </text>
      </svg>
    );
  }

  const n = pies.length;
  const radius = size / 2 - 2;
  const center = size / 2;
  const angle = (2 * Math.PI) / n;
  const paths = [];
  const labels = [];
  
  for (let i = 0; i < n; i++) {
    const startAngle = i * angle - Math.PI / 2;
    const endAngle = (i + 1) * angle - Math.PI / 2;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const d = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');
    paths.push(
      <path
        key={i}
        d={d}
        fill={COLORS[i % COLORS.length]}
        stroke="#fff"
        strokeWidth="6"
      />
    );
    // Label position (middle of arc, well inside the pie)
    const labelAngle = startAngle + angle / 2;
    const labelRadius = radius * 0.6; // closer to center for better text fit
    const lx = center + labelRadius * Math.cos(labelAngle);
    const ly = center + labelRadius * Math.sin(labelAngle) + 6;
    
    // Calculate text width and adjust position
    const text = pies[i] || `Option ${i + 1}`;
    const fontSize = Math.min(16, Math.max(10, 200 / text.length)); // Dynamic font size
    
    labels.push(
      <foreignObject
        key={i}
        x={lx - 50}
        y={ly - 20}
        width={100}
        height={40}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: `${fontSize}px`,
            textAlign: 'center',
            wordBreak: 'break-word',
            overflow: 'hidden',
            padding: '0 2px',
            lineHeight: 1.1,
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          }}
        >
          {text}
        </div>
      </foreignObject>
    );
  }
  
  return (
    <svg 
      width={size} 
      height={size} 
      className="wheel-svg"
    >
      {paths}
      {labels}
    </svg>
  );
}

function QRCode({ text, size = 120 }) {
  // Simple QR code placeholder - in production, use a QR code library
  const qrSize = size;
  const cellSize = qrSize / 25; // 25x25 grid
  
  const cells = [];
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      // Create a simple pattern for demo
      const isBlack = (i + j) % 2 === 0 || 
                     (i < 3 && j < 3) || 
                     (i < 3 && j > 21) || 
                     (i > 21 && j < 3);
      
      cells.push(
        <rect
          key={`${i}-${j}`}
          x={j * cellSize}
          y={i * cellSize}
          width={cellSize}
          height={cellSize}
          fill={isBlack ? '#000' : '#fff'}
        />
      );
    }
  }
  
  return (
    <svg width={qrSize} height={qrSize} style={{ background: '#fff', borderRadius: '8px' }}>
      {cells}
    </svg>
  );
}

function WheelBannerGenerator() {
  const [tab, setTab] = useState('landscape');
  const [wheel, setWheel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWheel = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get wheel from localStorage first
        let wheelData = getWheelFromStorage();
        
        if (!wheelData) {
          setError('No wheel selected. Please go back and select a wheel.');
          setLoading(false);
          return;
        }

        console.log('Wheel data from localStorage:', wheelData);

        // Store original localStorage data as fallback
        const originalLocalData = { ...wheelData };

        // If wheel has _id, try to fetch complete details from API
        if (wheelData._id) {
          try {
            const user_id = UserManager.getUserId() || '6853f5367e623f3de7d4687e';
            
            const response = await fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                apikey: API_KEY,
                method: 'getWheelDetails',
                module: 'twheel',
                user_id,
                wheel_id: wheelData._id
              })
            });

            const result = await response.json();
            const data = typeof result.body === 'string' ? JSON.parse(result.body) : result.body;

            if (data.status === 'success' && data.data) {
              console.log('API data received:', data.data);
              wheelData = { ...wheelData, ...data.data };
            } else {
              // If API fails, use localStorage data
              console.log('API failed, using localStorage data');
              wheelData = originalLocalData;
            }
          } catch (apiError) {
            console.warn('Failed to fetch wheel details from API, using localStorage data:', apiError);
            wheelData = originalLocalData;
          }
        }

        // Enhanced data extraction for pies
        let pies = null;
        
        // Method 1: Direct property access
        pies = wheelData.pies || wheelData.pie_options || wheelData.pieOptions || wheelData.pie_options_array;
        console.log('Method 1 - Direct property pies:', pies);
        
        // Method 2: If pies is a string, try to parse it
        if (typeof pies === 'string') {
          try {
            const parsedPies = JSON.parse(pies);
            if (Array.isArray(parsedPies)) {
              pies = parsedPies;
              console.log('Method 2 - Parsed string pies:', pies);
            }
          } catch (e) {
            // Try splitting by comma
            const splitValues = pies.split(',').map(v => v.trim()).filter(v => v.length > 0);
            if (splitValues.length > 0) {
              pies = splitValues;
              console.log('Method 2 - Comma-separated pies:', pies);
            }
          }
        }
        
        // Method 3: If still no pies, try to extract from other properties
        if (!pies || !Array.isArray(pies) || pies.length === 0) {
          console.log('Method 3 - Searching all properties for arrays...');
          const allProps = Object.keys(wheelData);
          console.log('All wheel properties:', allProps);
          
          for (const prop of allProps) {
            const value = wheelData[prop];
            console.log(`Checking property "${prop}":`, value, typeof value);
            
            if (Array.isArray(value) && value.length > 0) {
              console.log(`Found array in property ${prop}:`, value);
              pies = value;
              break;
            }
            
            // Also check if it's a string that might contain array data
            if (typeof value === 'string' && (value.includes('[') || value.includes(','))) {
              try {
                const parsed = JSON.parse(value);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  console.log(`Found array in string property ${prop}:`, parsed);
                  pies = parsed;
                  break;
                }
              } catch (e) {
                // Try splitting by comma
                const splitValues = value.split(',').map(v => v.trim()).filter(v => v.length > 0);
                if (splitValues.length > 0) {
                  console.log(`Found comma-separated values in property ${prop}:`, splitValues);
                  pies = splitValues;
                  break;
                }
              }
            }
          }
        }

        // Method 4: Check if there are any properties that look like pie data
        if (!pies || !Array.isArray(pies) || pies.length === 0) {
          console.log('Method 4 - Looking for pie-like properties...');
          const pieLikeProps = ['options', 'choices', 'prizes', 'rewards', 'items', 'values'];
          
          for (const prop of pieLikeProps) {
            if (wheelData[prop]) {
              const value = wheelData[prop];
              console.log(`Found pie-like property "${prop}":`, value);
              
              if (Array.isArray(value) && value.length > 0) {
                pies = value;
                console.log(`Using pie-like property ${prop}:`, pies);
                break;
              }
            }
          }
        }

        // Final fallback to localStorage if no pies found
        if (!pies || !Array.isArray(pies) || pies.length === 0) {
          console.log('No pies found, using localStorage fallback data');
          pies = originalLocalData.pies || originalLocalData.pie_options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
        }

        console.log('Final pies array:', pies);

        const normalizedWheel = {
          wheel_name: wheelData.wheel_name || wheelData.wheelName || originalLocalData.wheel_name || 'Untitled Wheel',
          pies: pies,
          spinning_time: wheelData.spinning_time || wheelData.spinDate || originalLocalData.spinning_time || new Date().toISOString(),
          status: wheelData.status || originalLocalData.status || 'Active',
          _id: wheelData._id || wheelData.id || originalLocalData._id || Date.now().toString(),
          ...wheelData
        };

        console.log('Normalized wheel data:', normalizedWheel);
        console.log('Final pies array for display:', normalizedWheel.pies);

        setWheel(normalizedWheel);
      } catch (err) {
        console.error('Error loading wheel:', err);
        setError('Failed to load wheel data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadWheel();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        color: '#fff', 
        textAlign: 'center', 
        marginTop: 60,
        fontSize: '18px'
      }}>
        Loading wheel data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        color: '#ff6b6b', 
        textAlign: 'center', 
        marginTop: 60,
        fontSize: '18px'
      }}>
        {error}
      </div>
    );
  }

  if (!wheel) {
    return (
      <div style={{
        color: '#fff',
        textAlign: 'center',
        marginTop: 60,
        fontSize: '18px'
      }}>
        No wheel selected. Please go back and select a wheel.
      </div>
    );
  }

  return (
    <div className="wbg-main">
      <h1 className="wbg-title">Wheel Banner Generator</h1>
      <div className="wbg-tabs">
        <button className={`wbg-tab${tab==='landscape'?' active':''}`} onClick={()=>setTab('landscape')}>Landscape Banner</button>
        <button className={`wbg-tab${tab==='square'?' active':''}`} onClick={()=>setTab('square')}>Square Banner</button>
      </div>
      <div className="wbg-banner-outer">
        {tab==='landscape' ? (
          <div className="wbg-banner wbg-landscape">
            <div className="wbg-banner-left">
              <div className="wbg-spinwin">SpinNWin</div>
              <WheelSVG pies={wheel.pies} size={220} />
            </div>
            <div className="wbg-banner-right">
              <div className="wbg-wheelname">{wheel.wheel_name}</div>
              <div className="wbg-desc">Scan the QR code to spin the wheel and win amazing prizes!</div>
              <div className="wbg-qr-placeholder">
                <QRCode text={`https://spinnwin.in/wheel/${wheel._id}`} size={110} />
              </div>
              <div className="wbg-desc2">Spin now and try your luck!</div>
            </div>
            <div className="wbg-powered">Powered by SpinNWin - Create your own wheel at spinnwin.in</div>
          </div>
        ) : (
          <div className="wbg-banner wbg-square">
            <div className="wbg-banner-top">
              <div className="wbg-spinwin">SpinNWin</div>
              <div className="wbg-wheelname">{wheel.wheel_name}</div>
            </div>
            <div className="wbg-banner-center">
              <WheelSVG pies={wheel.pies} size={180} />
            </div>
            <div className="wbg-qr-placeholder wbg-qr-bottom">
              <QRCode text={`https://spinnwin.in/wheel/${wheel._id}`} size={100} />
            </div>
            <div className="wbg-powered">Powered by SpinNWin - Create your own wheel at spinnwin.in</div>
          </div>
        )}
      </div>
      <button className="wbg-publish-btn" disabled>↓ Publish wheel to download</button>
    </div>
  );
}

export default WheelBannerGenerator; 