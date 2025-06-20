import React, { useState } from 'react';
import './Createwheel.css';

function CreateWheel() {
  const [pies, setPies] = useState(['']);
  const [spinOption, setSpinOption] = useState('participants');

  const addPie = () => {
    setPies([...pies, '']);
  };

  return (
    <div className="createwheel-container">
      <h2 className="createwheel-title">Create New Wheel</h2>
      <p className="createwheel-step">Step 1: Create</p>
      <hr className="createwheel-divider" />

      <div className="createwheel-form">
        <div className="createwheel-row">
          <div className="createwheel-field">
            <label>Wheel Name <span>*</span></label>
            <input type="text" placeholder="Enter wheel name" />
          </div>
          <div className="createwheel-field">
            <label>Site URL</label>
            <input type="text" placeholder="Enter URL (optional)" />
          </div>
        </div>

        <div className="createwheel-row">
          <div className="createwheel-field">
            <label>Winner Text <span>*</span></label>
            <textarea placeholder="Enter winner text" />
          </div>
          <div className="createwheel-field">
            <label>Address</label>
            <textarea placeholder="Enter Address" />
          </div>
        </div>

        <div className="createwheel-row">
          <div className="createwheel-preview">
            <label>Wheel Preview</label>
            <div className="createwheel-circle">Add pies to see preview</div>
          </div>

          <div className="createwheel-field">
            <label>Pies <span>*</span> (Minimum 4 required)</label>
            {pies.map((pie, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Enter pie option ${index + 1}`}
              />
            ))}
            <button type="button" onClick={addPie}>Add More</button>
          </div>
        </div>

        <div className="createwheel-row">
          <div className="createwheel-field">
            <label>Spin Date <span>*</span></label>
            <input type="date" />
          </div>
          <div className="createwheel-field">
            <label>Enter Number of Players to Spin <span>*</span></label>
            <input type="number" defaultValue={5} />
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

        <button className="createwheel-continue">Continue</button>
      </div>
    </div>
  );
}

export default CreateWheel;
