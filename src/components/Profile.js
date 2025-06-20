import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [logo, setLogo] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('919790671348');

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

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
            <input type="file" hidden onChange={handleLogoChange} />
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
            <input type="text" value={phone} readOnly />
          </div>
        </div>
      </div>

      <button className="update-btn">Update Profile</button>
    </div>
  );
}

export default Profile;
