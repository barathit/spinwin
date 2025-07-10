import React from 'react';
import './Home.css';
import FeaturedWheelsSection from '../components/FeaturedWheelsSection';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import SpinningWheel from '../components/SpinningWheel';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            {/* Left: Text and City Background */}
            <div className="hero-left">
              <div className="hero-text">
                <h1 className="hero-title">
                  AMAZING <span className="hero-title-pink">GIVEAWAYS</span><br />ARE HERE
                </h1>
                <p className="hero-subtitle">
                  Try your luck playing the giveaway wheels of incredible brands
                </p>
              </div>
              <div
                className="hero-bg-city"
                style={{ background: "url('/assets/hme_building.png') no-repeat" }}
              />
            </div>
            
            {/* Right: Wheel and Spin Button */}
            <div className="hero-right">
              <SpinningWheel />
              
            </div>
          </div>
        </section>





        {/* Section 2: How to Play */}
        <section className="how-to-play-section">
          <div className="how-to-play-header">
            <h2 className="how-to-play-title">HOW TO PLAY</h2>
            <p className="how-to-play-subtitle">Follow these 3 easy steps!</p>
          </div>
          <div className="how-to-play-body">
            <div className="steps-horizontal">
              <div 
                className="step-card"
                style={{
                  background: `linear-gradient(180deg, #6d1e7c 0%, #a84fdc 100%), url('/assets/card-bg-1.jpg')`,
                  backgroundBlendMode: 'overlay',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="icon-rings">
                  <div className="icon-ring"></div>
                  <div className="icon-ring"></div>
                  <div className="icon-ring"></div>
                </div>
                <img src="/assets/play_icon1.png" alt="Pick a Wheel" className="step-image" />
                <p className="step-number">01</p>
                <p className="step-title">PICK A WHEEL</p>
              </div>
              <div 
                className="step-card"
                style={{
                  background: `linear-gradient(180deg, #6d1e7c 0%, #a84fdc 100%), url('/assets/card-bg-1.jpg')`,
                  backgroundBlendMode: 'overlay',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="icon-rings">
                  <div className="icon-ring"></div>
                  <div className="icon-ring"></div>
                  <div className="icon-ring"></div>
                </div>
                <img src="/assets/play_icon2.png" alt="Message the Code" className="step-image" />
                <p className="step-number">02</p>
                <p className="step-title">MESSAGE THE CODE</p>
              </div>
              <div 
                className="step-card"
                style={{
                  background: `linear-gradient(180deg, #6d1e7c 0%, #a84fdc 100%), url('/assets/card-bg-1.jpg')`,
                  backgroundBlendMode: 'overlay',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="icon-rings">
                  <div className="icon-ring"></div>
                  <div className="icon-ring"></div>
                  <div className="icon-ring"></div>
                </div>
                <img src="/assets/play_icon3.png" alt="Win Big" className="step-image" />
                <p className="step-number">03</p>
                <p className="step-title">WIN BIG</p>
              </div>
            </div>
            <div className="illustration-right">
              <img src="/assets/play.png" alt="Trophy Illustration" />
            </div>
          </div>
        </section>



        
        {/* Section 3: Featured Wheels */}
        <FeaturedWheelsSection />
        {/* Newsletter */}
       
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
