import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Pricing.css"

import { useNavigate } from "react-router-dom";
function About() {
const navigate = useNavigate();
   
  const handleClick = () => {
    navigate("/Dashboardlogin");
  };

    return (
        <div>
            <Navbar />
               <div className="pricing-wrapper">
      <div className="pricing-bg-shape"></div>

      <div className="pricing-card">
        <h1 className="pricing-title">PRICING</h1>
        <p className="price-text">
          <span className="price-amount">₹5000</span> Per Wheel
        </p>
        <button className="create-wheel-btn333" onClick={handleClick}>
          <img src="/assets/logo-square-spinnwin.png" alt="Wheel" className="wheel-icon1" />
          CREATE WHEEL
        </button>
      </div>
    </div>
       
            <Footer />
        </div>
    );
}

export default About;