// src/pages/Dashboard.js
import React from 'react';
import './Businessdashboard.css';
import { useNavigate } from 'react-router-dom';

function Businessdashboard() {
  const navigate = useNavigate();

  return (
    <main className="namenumber33-main-section">
      <div className="namenumber33-wheel-header-card">
        <h2>Wheel List</h2>
        <div className="namenumber33-search-row">
          <input type="text" placeholder="Search wheels..." />
          <button onClick={() => navigate('/business/wheelcreate')}>+ New Wheel</button>
        </div>
      </div>

      <div className="namenumber33-no-wheel-section">
        <h2>No Wheels Found</h2>
        <p>It looks like you haven't created any wheels yet.</p>
        <button onClick={() => navigate('/business/wheelcreate')}>
          + Create New Wheel
        </button>
      </div>
    </main>
  );
}

export default Businessdashboard;
