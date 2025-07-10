import React, { useState, useEffect } from 'react';
import './Profile.css';
import UserManager from '../utils/userManager';

function Profile() {
  const [logo, setLogo] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const apikey = 'RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA';

  // Load existing profile data
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setInitialLoading(true);
      
      // Get user ID from UserManager
      let user_id = UserManager.getUserId();
      
      if (!user_id) {
        console.warn('No user ID found, using temporary ID for testing');
        user_id = '6853f5367e623f3de7d4687e';
        UserManager.setUserId(user_id);
      }

      // Try to load from localStorage first
      const localProfile = localStorage.getItem('userProfile');
      if (localProfile) {
        const profileData = JSON.parse(localProfile);
        setProfileData(profileData);
      }

      // Try to fetch from API
      try {
        const payload = {
          method: 'getUserProfile',
          module: 'user',
          apikey,
          user_id
        };

        const response = await fetch('https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        const data = typeof result.body === 'string' ? JSON.parse(result.body) : result.body;

        if (data.status === 'success' && data.data) {
          console.log('Profile data from API:', data.data);
          setProfileData(data.data);
          // Store in localStorage for future use
          localStorage.setItem('userProfile', JSON.stringify(data.data));
        }
      } catch (apiError) {
        console.warn('Failed to fetch profile from API:', apiError);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const setProfileData = (data) => {
    setBusinessName(data.business_name || data.first_name || '');
    setEmail(data.email_address || data.email || '');
    setPhone(data.phone_number || data.phone || '');
    
    // Handle logo if available
    if (data.profile_image || data.logo) {
      setLogo(data.profile_image || data.logo);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
      // Optionally, you can convert this to base64 or send to server if supported
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    setMessage('');

    // Get user ID from UserManager
    let user_id = UserManager.getUserId();
    
    if (!user_id) {
      console.warn('No user ID found, using temporary ID for testing');
      user_id = '6853f5367e623f3de7d4687e';
      UserManager.setUserId(user_id);
    }

    const payload = {
      method: 'userProfile',
      module: 'user',
      apikey,
      user_id,
      business_name: businessName,
      email_address: email,
      phone_number: phone,
      profile_image: '', // Optional: integrate logo upload later
    };

    try {
      const res = await fetch('https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      const body = typeof json.body === 'string' ? JSON.parse(json.body) : json.body;

      if (body.status === 'success') {
        setMessage('Profile updated successfully!');
        
        // Store updated profile in localStorage
        const profileData = {
          business_name: businessName,
          email_address: email,
          phone_number: phone,
          profile_image: logo
        };
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update: ' + (body.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="profile-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Business Profile</h2>
      <div className="profile-card">
        {/* Left: Upload */}
        <div className="profile-left">
          <h4>Business Logo</h4>
          <div className="logo-preview">
            {logo ? (
              <img src={logo} alt="Logo Preview" />
            ) : (
              <p>Upload your business logo</p>
            )}
          </div>
          <label className="upload-btn">
            Upload Logo
            <input type="file" hidden onChange={handleLogoChange} accept="image/*" />
          </label>
        </div>

        {/* Right: Form */}
        <div className="profile-right">
          <div className="input-group">
            <label>Business Name</label>
            <input
              type="text"
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button 
        className="update-btn" 
        onClick={handleUpdateProfile} 
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
      
      {message && (
        <p style={{ 
          marginTop: 16, 
          color: message.includes('successfully') ? '#4CAF50' : '#f44336',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Profile;
