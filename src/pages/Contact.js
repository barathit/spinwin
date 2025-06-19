import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import "./Contact.css";

function Contact() {
  return (
    <div>
      <Navbar />

     <div className="contact-wrapper">
  <div className="contact-top-curve">
    <div className="contact-card">
      <h1 className="contact-title">CONTACT</h1>
      <p className="contact-desc">
        The best way to contact us is by SMS or WhatsApp at <span className="highlight">9751485729</span>.
        If you are one of the rarest or rare person who do not have a mobile phone, please fill the form below and we will contact you right away.
      </p>
      <p className="contact-email">
        Contact Email: <span className="highlight">spinnwin.in@gmail.com</span>
      </p>
      <p className="contact-address">
        Address: <span className="highlight">201 G, Blé Building, Palathurai Road, Madukkarai, Coimbatore - 641 105</span>
      </p>
    </div>
  </div>
</div>

   <div className="contact-form-section">
  <div className="form-box">
    <h2>Drop us a message</h2>
    <form>
      <label>
        Name<span className="required">*</span>
        <input type="text" placeholder="Enter Your Full Name" />
      </label>
      <label>
        Email<span className="required">*</span>
        <input type="email" placeholder="Enter Your Email" />
      </label>
      <label>
        Message<span className="required">*</span>
        <textarea placeholder="Write Your Message" />
      </label>
      <button type="submit">SEND MESSAGE</button>
    </form>
  </div>

  <div className="image-and-socials">
    <img src="/assets/contact.png" alt="Support" className="contact-image" />

    <div className="social-cards">
      <div className="social-card">
        <img src="/assets/facebook-icon.png" alt="Facebook" />
        <h3>130k</h3>
        <p>Followers</p>
      </div>
      <div className="social-card">
        <img src="/assets/group-icon.png" alt="Members" />
        <h3>35k</h3>
        <p>Members</p>
      </div>
      <div className="social-card">
        <img src="/assets/twitter-icon.png" alt="Twitter" />
        <h3>47k</h3>
        <p>Followers</p>
      </div>
      <div className="social-card">
        <img src="/assets/email-icon.png" alt="Subscribers" />
        <h3>29k</h3>
        <p>Subscribers</p>
      </div>
    </div>
  </div>
</div>


      <Newsletter />
      <Footer />
    </div>
  );
}

export default Contact;
