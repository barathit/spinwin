import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import
import Businessdashboard from '../components/Businessdashboard';
import CreateWheel from '../components/Createwheel';
import Profile from '../components/Profile';
import './Dashboardhome.css';

function DashboardHome() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate(); // <-- initialize

  const handleLogout = () => {
    // Optionally clear auth or token here
    navigate('/dashboardlogin'); // <-- navigate to login page
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 'createwheel':
        return <CreateWheel />;
      case 'profile':
        return <Profile />;
      case 'dashboard':
      default:
        return <Businessdashboard />;
    }
  };

  return (
    <div className="namenumber33-dashboard-wrapper">
      <aside className="namenumber33-sidebar">
        <div className="namenumber33-logo-box">
          <img src="/assets/logo-square-spinnwin.png" alt="SpinWin Logo" className="namenumber33-logo-img" />
          <h1 className="namenumber33-logo-text">spinwin</h1>
        </div>

        <nav className="namenumber33-nav-links">
          <button
            className={`namenumber33-nav-item ${activeTab === 'dashboard' ? 'namenumber33-active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`namenumber33-nav-item ${activeTab === 'createwheel' ? 'namenumber33-active' : ''}`}
            onClick={() => setActiveTab('createwheel')}
          >
            Create Wheel
          </button>
          <button
            className={`namenumber33-nav-item ${activeTab === 'profile' ? 'namenumber33-active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </nav>

        <div className="namenumber33-logout-link">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="namenumber33-main-section">
        {renderComponent()}
      </main>
    </div>
  );
}

export default DashboardHome;
