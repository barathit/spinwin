import React from 'react';
import './Home.css';
import FeaturedWheelsSection from '../components/FeaturedWheelsSection';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="home-page">
        {/* Hero Section */}
       <section className="hero-section">
  <div className="hero-content">
    
    {/* Left: Background Image */}
    <div className="hero-left">
      <img
        src="/assets/hme_building.png"
        alt="City Background"
        className="hero-bg-image"
      />
      <div className="hero-text">
        <h1 className="hero-title">AMAZING GIVEAWAYS <br /> ARE HERE</h1>
        <p className="hero-subtitle">
          Try your luck playing the giveaway wheels of incredible brands
        </p>
      </div>
    </div>

    {/* Right: Wheel Image and Spin Button */}
    <div className="hero-right">
      <img
        src="/assets/wheel.webp"
        alt="Giveaway Wheel"
        className="wheel-image"
      />
      <p className="wheel-caption">Ghibli-style images</p>
      <button className="spin-btn">SPIN</button>
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
                className="step-card with-bg"
                style={{ backgroundImage: "url('/assets/card-bg-1.jpg')" }}
              >
                <img src="/assets/play_icon1.png" alt="Pick a Wheel" className="step-image" />
                <p className="step-number">01</p>
                <p className="step-title">PICK A WHEEL</p>
              </div>

              <div
                className="step-card with-bg"
                style={{ backgroundImage: "url('/assets/card-bg-1.jpg')" }}
              >
                <img src="/assets/play_icon2.png" alt="Message the Code" className="step-image" />
                <p className="step-number">02</p>
                <p className="step-title">MESSAGE THE CODE</p>
              </div>

              <div
                className="step-card with-bg"
                style={{ backgroundImage: "url('/assets/card-bg-1.jpg')" }}
              >
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
        <Newsletter />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
