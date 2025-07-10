import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Businessdashboard from '../components/Businessdashboard';
import CreateWheel from '../components/Createwheel';
import Profile from '../components/Profile';
import UserManager from '../utils/userManager';
import './Dashboardhome.css';

function DashboardHome() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user ID and other user data
    UserManager.clearUserId();
    localStorage.removeItem('wheels'); // Clear cached wheels
    navigate('/');
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
    <div className="dashboardhome-wrapper">
      <aside className="dashboardhome-sidebar">
        <div className="dashboardhome-logo-box">
          <img src="/assets/logo-square-spinnwin.png" alt="SpinWin Logo" className="dashboardhome-logo-img" />
          <h1 className="dashboardhome-logo-text">spinwin</h1>
        </div>
        <nav className="dashboardhome-nav">
          <button
            className={`dashboardhome-nav-item${activeTab === 'dashboard' ? ' active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`dashboardhome-nav-item${activeTab === 'createwheel' ? ' active' : ''}`}
            onClick={() => setActiveTab('createwheel')}
          >
            Create Wheel
          </button>
          <button
            className={`dashboardhome-nav-item${activeTab === 'profile' ? ' active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </nav>
        <div className="dashboardhome-logout-box">
          <button className="dashboardhome-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="dashboardhome-main">
        {renderComponent()}
      </main>
    </div>
  );
}

export default DashboardHome;
