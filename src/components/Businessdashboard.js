// src/pages/Businessdashboard.js
import React, { useEffect, useState } from 'react';
import './Businessdashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserManager from '../utils/userManager';

const API_URL = 'https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/';
const API_KEY = 'RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA';


function ParticipantsModal({ open, onClose, wheel }) {
  if (!open || !wheel) return null;
  const participants = wheel.players_with_pies || [];

  const downloadCSV = () => {
    let csv = 'S.No,Name,Number,Prize\n';
    if (participants.length === 0) {
      csv += 'No participants found,,,\n';
    } else {
      participants.forEach((p, i) => {
        csv += `${i + 1},${p.name || ''},${p.number || ''},${p.prize || ''}\n`;
      });
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `participants_${wheel.wheel_name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bdash-modal-backdrop">
      <div className="bdash-modal">
        <div className="bdash-modal-header">
          <span className="bdash-modal-title">Participants for {wheel.wheel_name}</span>
          <button className="bdash-modal-close" onClick={onClose}>×</button>
        </div>
        <button className="bdash-modal-download" onClick={downloadCSV}>Download CSV</button>
        <table className="bdash-modal-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Number</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            {participants.length === 0 ? (
              <tr><td colSpan="4" className="bdash-modal-nopart">No participants found</td></tr>
            ) : (
              participants.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.number}</td>
                  <td>{p.prize}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Businessdashboard() {
  const navigate = useNavigate();
  const [wheels, setWheels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWheels = async () => {
    try {
      setLoading(true);
      
      // Get user ID from UserManager
      let user_id = UserManager.getUserId();
      
      // Fallback: if no user ID is available, use a temporary one for testing
      if (!user_id) {
        console.warn('No user ID found, using temporary ID for testing');
        user_id = '6853f5367e623f3de7d4687e'; // Temporary fallback
        UserManager.setUserId(user_id);
      }

      // Get local wheels first
      const localWheels = JSON.parse(localStorage.getItem('wheels') || '[]');
      console.log('Local wheels from localStorage:', localWheels);

      // Fetch wheels from API
      let apiWheels = [];
      try {
        const response = await axios.post(API_URL, {
          apikey: API_KEY,
          method: 'tWheellist',
          module: 'twheel',
          user_id
        });

        const data = typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data.body;

        console.log('API response for wheels:', response.data);
        console.log('Parsed data:', data);

        if (data.status === "success") {
          apiWheels = Array.isArray(data.data) ? data.data : [];
          console.log('API wheels:', apiWheels);
        }
      } catch (apiError) {
        console.error('Error fetching from API:', apiError);
      }
      
      // Merge wheels, prioritizing API wheels but keeping local wheels that aren't in API yet
      const merged = [
        ...apiWheels,
        ...localWheels.filter(lw =>
          !apiWheels.some(aw => 
            aw.wheel_name === lw.wheel_name && 
            aw.spinning_time === lw.spinning_time
          )
        )
      ];
      
      console.log('Merged wheels:', merged);
      setWheels(merged);
      
      // Update localStorage with merged data
      localStorage.setItem('wheels', JSON.stringify(merged));
      
    } catch (error) {
      console.error('Error fetching wheels:', error);
      // Fallback to localStorage wheels if everything fails
      const localWheels = JSON.parse(localStorage.getItem('wheels') || '[]');
      setWheels(localWheels);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWheels();
    
    // Refresh wheels when component comes into focus (e.g., after navigation)
    const handleFocus = () => {
      fetchWheels();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="bdash-main-content">
      <section className="bdash-header-card">
        <h2 className="bdash-header-title">Wheel List</h2>
        <div className="bdash-search-row">
          <input className="bdash-search-input" type="text" placeholder="Search wheels..." />
          <button className="bdash-newwheel-btn" onClick={() => navigate('/CreateWheel')}>+ New Wheel</button>
        </div>
      </section>

      {loading ? (
        <section className="bdash-empty-section">
          <h2 className="bdash-empty-title">Loading Wheels...</h2>
          <p className="bdash-empty-desc">Please wait while we fetch your wheels.</p>
        </section>
      ) : wheels.length === 0 ? (
        <section className="bdash-empty-section">
          <h2 className="bdash-empty-title">No Wheels Found</h2>
          <p className="bdash-empty-desc">It looks like you haven't created any wheels yet.</p>
          <button className="bdash-create-btn" onClick={() => navigate('/CreateWheel')}>
            + Create New Wheel
          </button>
        </section>
      ) : (
        <section className="bdash-table-section">
          <table className="bdash-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Wheel Name</th>
                <th>Spin Date & Time</th>
                <th>Status</th>
                <th>Leads</th>
                <th>Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wheels.map((wheel, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td><a href="#" style={{ color: '#2056d9', fontWeight: 700 }}>{wheel.wheel_name}</a></td>
                  <td>{new Date(wheel.spinning_time).toLocaleString()}</td>
                  <td><span className="bdash-status-waiting">{wheel.status}</span></td>
                  <td>
                    <span role="img" aria-label="leads" style={{ cursor: 'pointer' }} onClick={() => { setSelectedWheel(wheel); setModalOpen(true); }}>👥</span>
                  </td>
                  <td><span role="img" aria-label="visit">👁️</span></td>
                  <td>
                    <span role="img" aria-label="view" style={{ cursor: 'pointer' }} onClick={async () => {
                      console.log('Original wheel data:', wheel);
                      
                      // Try to fetch complete wheel details from API first
                      let completeWheelData = { ...wheel };
                      
                      if (wheel._id) {
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
                              wheel_id: wheel._id
                            })
                          });

                          const result = await response.json();
                          const data = typeof result.body === 'string' ? JSON.parse(result.body) : result.body;

                          if (data.status === 'success' && data.data) {
                            completeWheelData = { ...completeWheelData, ...data.data };
                            console.log('Enhanced wheel data from API:', completeWheelData);
                          }
                        } catch (apiError) {
                          console.warn('Failed to fetch wheel details from API, using existing data:', apiError);
                        }
                      }
                      
                      // Ensure wheel data has all required properties before storing
                      const wheelForBanner = {
                        ...completeWheelData,
                        wheel_name: completeWheelData.wheel_name || completeWheelData.wheelName || 'Untitled Wheel',
                        pies: completeWheelData.pies || completeWheelData.pie_options || completeWheelData.pieOptions || completeWheelData.pie_options_array || ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                        spinning_time: completeWheelData.spinning_time || completeWheelData.spinDate || new Date().toISOString(),
                        status: completeWheelData.status || 'Active',
                        _id: completeWheelData._id || completeWheelData.id || Date.now().toString()
                      };
                      
                      // If pies is a string, try to parse it
                      if (typeof wheelForBanner.pies === 'string') {
                        try {
                          const parsedPies = JSON.parse(wheelForBanner.pies);
                          if (Array.isArray(parsedPies)) {
                            wheelForBanner.pies = parsedPies;
                          }
                        } catch (e) {
                          // Try splitting by comma
                          const splitValues = wheelForBanner.pies.split(',').map(v => v.trim()).filter(v => v.length > 0);
                          if (splitValues.length > 0) {
                            wheelForBanner.pies = splitValues;
                          }
                        }
                      }
                      
                      console.log('Processed wheel for banner:', wheelForBanner);
                      console.log('Pies array:', wheelForBanner.pies);
                      
                      // Store the complete wheel data for WheelBannerGenerator
                      localStorage.setItem('selectedWheel', JSON.stringify(wheelForBanner));
                      
                      // Also update the wheels list with the enhanced data
                      const updatedWheels = wheels.map(w => 
                        w._id === wheel._id ? wheelForBanner : w
                      );
                      setWheels(updatedWheels);
                      localStorage.setItem('wheels', JSON.stringify(updatedWheels));
                      
                      navigate('/WheelBannerGenerator');
                    }}>🔵</span>{' '}
                    <span role="img" aria-label="delete" style={{ cursor: 'pointer' }} onClick={async () => {
                      if (!window.confirm('Are you sure you want to delete this wheel?')) return;
                      
                      try {
                        // Get user ID from UserManager
                        let user_id = UserManager.getUserId();
                        
                        if (!user_id) {
                          console.warn('No user ID found, using temporary ID for testing');
                          user_id = '6853f5367e623f3de7d4687e';
                          UserManager.setUserId(user_id);
                        }

                        // Try different possible method names
                        const possibleMethods = ['deleteWheel', 'deletewheel', 'removeWheel', 'removewheel', 'deleteWheellist'];
                        let success = false;
                        let errorMessage = '';

                        for (const method of possibleMethods) {
                          try {
                            const payload = {
                              apikey: API_KEY,
                              method: method,
                              module: 'twheel',
                              user_id: user_id,
                              wheel_id: wheel._id
                            };
                            
                            console.log(`Trying delete with method: ${method}`, payload);
                            
                            const response = await axios.post(API_URL, payload);
                            const result = response.data;
                            const body = typeof result.body === 'string' ? JSON.parse(result.body) : result.body;
                            
                            console.log(`Delete response for ${method}:`, body);
                            
                            if (body.status === 'success') {
                              success = true;
                              break;
                            } else {
                              errorMessage = body.message || `Method ${method} failed`;
                            }
                          } catch (methodError) {
                            console.warn(`Method ${method} failed:`, methodError);
                            errorMessage = `Method ${method} not found`;
                          }
                        }

                        if (success) {
                          // Remove from state
                          const updatedWheels = wheels.filter((w, i) => w._id !== wheel._id);
                          setWheels(updatedWheels);
                          
                          // Update localStorage
                          localStorage.setItem('wheels', JSON.stringify(updatedWheels));
                          
                          alert('Wheel deleted successfully!');
                        } else {
                          // If API deletion fails, at least remove from local storage
                          console.warn('API deletion failed, removing from local storage only');
                          const updatedWheels = wheels.filter((w, i) => w._id !== wheel._id);
                          setWheels(updatedWheels);
                          localStorage.setItem('wheels', JSON.stringify(updatedWheels));
                          
                          alert(`Wheel removed locally. API error: ${errorMessage}`);
                        }
                      } catch (err) {
                        console.error('Error deleting wheel:', err);
                        alert('Error deleting wheel. Please try again.');
                      }
                    }}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bdash-table-footer">Showing 1 to {wheels.length} of {wheels.length} entries</div>
        </section>
      )}
      <ParticipantsModal open={modalOpen} onClose={() => setModalOpen(false)} wheel={selectedWheel} />
    </div>
  );
}

export default Businessdashboard;
