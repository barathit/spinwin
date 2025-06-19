import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeaturedWheelsSection.css';

const mockWheels = [
  {
    title: 'Ghibli-style images',
    participants: 30,
    date: '2025-04-02',
  },
  {
    title: 'Redmi Note 10',
    participants: 29,
    date: '2025-03-31',
  },
  {
    title: 'Jeans Pant',
    participants: 14,
    date: '2025-03-31',
  }
];

const FeaturedWheelsSection = () => {
  const [wheels, setWheels] = useState([]);

  useEffect(() => {
    axios.get('/api/wheels')
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setWheels(response.data);
        } else {
          setWheels(mockWheels);
        }
      })
      .catch(() => {
        setWheels(mockWheels);
      });
  }, []);

  return (
    <div className="featured-section">
      <p className="top-text">Try your chance at winning</p>
      <h2 className="title">FEATURED WHEELS</h2>
      <p className="subtitle">Simply text the joining code to participate and win a give away.</p>

      <div className="wheel-cards-container">
        {wheels.map((wheel, index) => (
         <div className="wheel-card" key={index}>
  <img src="/assets/wheel.webp" alt="Wheel" className="wheel-image" />
  <hr />
  <h3 className="wheel-title">{wheel.title}</h3>
  <hr />
  <div className="wheel-info">
    <p><i className="fas fa-user"></i> <span className="highlight">{wheel.participants}</span> Participants</p>
     <hr />
    <p><i className="fas fa-clock"></i> {new Date(wheel.date).toLocaleDateString('en-GB')}</p>
  </div>
  <hr />
  <button className="play-button">PLAY NOW</button>
</div>

        ))}
      </div>
    </div>
  );
};

export default FeaturedWheelsSection;
