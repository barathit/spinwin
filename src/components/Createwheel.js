import React, { useState } from 'react';
import './Createwheel.css';
import UserManager from '../utils/userManager';

function WheelPreview({ pies }) {
  const size = 200;
  const radius = size / 2 - 2;
  const center = size / 2;
  const n = pies.length;

  if (n < 1) {
    return (
      <div className="createwheel-circle">Add pies to see preview</div>
    );
  }

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
        fill="#fff"
        stroke="#ccc"
        strokeWidth="2"
      />
    );
    // Label position (middle of arc)
    const labelAngle = startAngle + angle / 2;
    const labelRadius = radius * 0.7;
    const lx = center + labelRadius * Math.cos(labelAngle);
    const ly = center + labelRadius * Math.sin(labelAngle) + 6;
    labels.push(
      <text
        key={i}
        x={lx}
        y={ly}
        textAnchor="middle"
        fontSize="15"
        fill="#444"
        fontFamily="Poppins, sans-serif"
      >
        {pies[i] && pies[i].trim() ? pies[i] : i + 1}
      </text>
    );
  }

  return (
    <svg width={size} height={size} className="createwheel-svg">
      {paths}
      {labels}
    </svg>
  );
}

function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`toast toast-${type}`}>{message}<button onClick={onClose} className="toast-close">×</button></div>
  );
}

function CreateWheel() {
  const [wheelName, setWheelName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [winnerText, setWinnerText] = useState('');
  const [address, setAddress] = useState('');
  const [pies, setPies] = useState(['', '', '', '']);
  const [spinDate, setSpinDate] = useState('');
  const [minPlayers, setMinPlayers] = useState(5);
  const [spinOption, setSpinOption] = useState('participants');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = window.location ? (path) => { window.location.href = path; } : () => {};

  const apikey = 'RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA';

  const addPie = () => {
    setPies([...pies, '']);
  };

  const updatePie = (index, value) => {
    const newPies = [...pies];
    newPies[index] = value;
    setPies(newPies);
  };

  const handleSubmit = async () => {
    if (!wheelName || !winnerText || pies.filter(p => p.trim() !== '').length < 4 || !spinDate) {
      setToast({
        message: 'Please fill all required fields: Wheel Name, Winner Text, at least 4 Pies, and Spin Date.',
        type: 'error',
      });
      return;
    }

    // Get user ID from UserManager
    let user_id = UserManager.getUserId();
    
    // Fallback: if no user ID is available, use a temporary one for testing
    if (!user_id) {
      console.warn('No user ID found, using temporary ID for testing');
      user_id = '6853f5367e623f3de7d4687e'; // Temporary fallback
      UserManager.setUserId(user_id);
    }

    const payload = {
      apikey,
      method: 'tWheellist',
      module: 'twheel',
      user_id,
      wheel_name: wheelName,
      pies: pies.filter(p => p.trim() !== ''),
      winner_text: winnerText,
      spinning_time: new Date(spinDate).toISOString(),
      minimum_count: String(minPlayers),
      wheel_spin_custom_trigger: spinOption === 'participants' ? '1' : '0'
    };

    setLoading(true);

    try {
      const response = await fetch('https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const data = typeof result.body === 'string' ? JSON.parse(result.body) : result.body;

      if (data.status === 'success') {
        setToast({ message: 'Wheel created successfully!', type: 'success' });
        
        // Store wheel data in localStorage for immediate access
        const wheelData = {
          wheel_name: wheelName,
          pies: pies.filter(p => p.trim() !== ''),
          spinning_time: new Date(spinDate).toISOString(),
          status: 'Active',
          _id: data.data?._id || Date.now().toString(),
          user_id: user_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Get existing wheels from localStorage
        const existingWheels = JSON.parse(localStorage.getItem('wheels') || '[]');
        
        // Add new wheel to the list
        const updatedWheels = [...existingWheels, wheelData];
        
        // Store updated wheels list
        localStorage.setItem('wheels', JSON.stringify(updatedWheels));
        
        console.log('Wheel data stored in localStorage:', wheelData);
        console.log('Updated wheels list:', updatedWheels);
        
        setTimeout(() => {
          window.location.href = '/Dashboardhome';
        }, 1200);
      } else {
        setToast({ message: data.message || 'Failed to create wheel.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Something went wrong. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createwheel-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <h2 className="createwheel-title">Create New Wheel</h2>
      <p className="createwheel-step">Step 1: Create</p>
      <hr className="createwheel-divider" />

      <div className="createwheel-form">
        <div className="createwheel-row">
          <div className="createwheel-field">
            <label>Wheel Name <span>*</span></label>
            <input type="text" value={wheelName} onChange={(e) => setWheelName(e.target.value)} placeholder="Enter wheel name" />
          </div>
          <div className="createwheel-field">
            <label>Site URL</label>
            <input type="text" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} placeholder="Enter URL (optional)" />
          </div>
        </div>

        <div className="createwheel-row">
          <div className="createwheel-field">
            <label>Winner Text <span>*</span></label>
            <textarea value={winnerText} onChange={(e) => setWinnerText(e.target.value)} placeholder="Enter winner text" />
          </div>
          <div className="createwheel-field">
            <label>Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" />
          </div>
        </div>

        <div className="createwheel-row">
          <div className="createwheel-preview">
            <label>Wheel Preview</label>
            <WheelPreview pies={pies} />
          </div>

          <div className="createwheel-field">
            <label>Pies <span>*</span> (Minimum 4 required)</label>
            {pies.map((pie, index) => (
              <input
                key={index}
                type="text"
                value={pie}
                onChange={(e) => updatePie(index, e.target.value)}
                placeholder={`Enter pie option ${index + 1}`}
              />
            ))}
            <button type="button" onClick={addPie}>Add More</button>
          </div>
        </div>

        <div className="createwheel-row">
          <div className="createwheel-field">
            <label>Spin Date <span>*</span></label>
            <input type="date" value={spinDate} onChange={(e) => setSpinDate(e.target.value)} />
          </div>
          <div className="createwheel-field">
            <label>Enter Number of Players to Spin <span>*</span></label>
            <input type="number" value={minPlayers} onChange={(e) => setMinPlayers(e.target.value)} />
          </div>
        </div>

        <div className="createwheel-options">
          <label>
            <input
              type="radio"
              checked={spinOption === 'participants'}
              onChange={() => setSpinOption('participants')}
            />
            As soon as 5 of participants is reached.
          </label>
          <label>
            <input
              type="radio"
              checked={spinOption === 'scheduled'}
              onChange={() => setSpinOption('scheduled')}
            />
            Spin until it reaches the scheduled time.
          </label>
        </div>

        <button className="createwheel-continue" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

export default CreateWheel;
