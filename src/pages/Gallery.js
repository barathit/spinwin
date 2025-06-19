import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import "./Gallery.css";

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

const Gallery = () => {
  const [hovered, setHovered] = useState(null);
  const [search, setSearch] = useState("");

  const filteredWheels = mockWheels.filter(wheel =>
    wheel.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      
      {/* Main Unified Section */}
      <div className="main-wrapper">
        <div className="top-background-shape"></div>

        {/* ALL WHEELS */}
        <div className="all-wheels-container">
          <h1 className="title">ALL WHEELS</h1>
          <div className="wheels-row">
            <div className="wheel-item active">
              <img src="/assets/wheel.webp" alt="Active" />
              <p>ACTIVE</p>
              <div className="underline" />
            </div>
            <div
              className="wheel-item"
              onMouseEnter={() => setHovered("finished")}
              onMouseLeave={() => setHovered(null)}
            >
              <img src="/assets/wheel.webp" alt="Finished" />
              <p>FINISHED</p>
              <div className={`underline ${hovered === "finished" ? "show" : ""}`} />
            </div>
          </div>
        </div>

        {/* 🔍 Search for Featured Wheels */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="SEARCH HERE"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* 🎯 FEATURED WHEELS */}
        <div className="featured-cards-section">
          {filteredWheels.map((wheel, index) => (
            <div className="featured-card" key={index}>
              <div className="wheel-image-box">
                <img src="/assets/wheel.webp" alt="Wheel" />
              </div>
              <div className="card-content">
                <h3>{wheel.title}</h3>
                <p><span className="by">by</span> Anonymous</p>
                <p><i className="fas fa-user"></i> {wheel.participants} Participants</p>
                <p><i className="fas fa-clock"></i> {new Date(wheel.date).toLocaleDateString("en-GB")}</p>
                <button className="play-button">PLAY NOW</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Gallery;
