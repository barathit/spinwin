import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Usecases.css";

function Usecases() {
  const usecases = [
    {
      id: 1,
      image: "/assets/uc_ecommerce.png",
      title: "E-commerce",
      description: "Boost customer engagement and increase sales by incorporating SpinWin into your marketing campaigns. Offer exclusive discounts, freebies, or surprise giveaways to incentivize purchases and create a sense of excitement among your customers."
    },
    {
      id: 2,
      image: "/assets/uc_eventmgmt.png",
      title: "Event Management",
      description: "Enhance event experiences by integrating SpinWin into conferences, trade shows, or virtual events. Use it for raffles, lucky draws, or interactive games to keep attendees engaged and provide them with memorable moments."
    },
    {
      id: 3,
      image: "/assets/uc_nonprofitorg.png",
      title: "Non-profit Organizations",
      description: "SpinWin can be utilized to drive donations and engagement for non-profit organizations. Offer participants the chance to win special experiences, merchandise, or recognition in exchange for their support."
    },
    {
      id: 4,
      image: "/assets/uc_hospitality_tourism.png",
      title: "Hospitality and Tourism",
      description: "Engage guests and visitors by implementing SpinWin in hotels, resorts, or tourist attractions. Use it to offer complimentary room upgrades, restaurant vouchers, or exclusive experiences."
    },
    {
      id: 5,
      image: "/assets/uc_education_training.png",
      title: "Education and Training",
      description: "Gamify learning experiences by incorporating SpinWin into educational platforms or training programs. Reward students or trainees with incentives such as additional course materials, certificates, or exclusive access to resources."
    },
    {
      id: 6,
      image: "/assets/uc_hr_employee.png",
      title: "HR and Employee Engagement",
      description: "Foster a positive and engaging work environment by using SpinWin for employee recognition programs or team-building activities. Recognize outstanding performance, celebrate milestones, or organize friendly competitions."
    },
    {
      id: 7,
      image: "/assets/uc_retail_consumergoods.png",
      title: "Retail and Consumer Goods",
      description: "Implement SpinWin as part of your loyalty programs or customer engagement initiatives. Offer customers the chance to win special discounts, gift cards, or exclusive products, incentivizing repeat purchases."
    },
    {
      id: 8,
      image: "/assets/uc_socialmedia_influencers.png",
      title: "Social Media Influencers",
      description: "Collaborate with influencers and integrate SpinWin into their campaigns. Engage their followers by offering unique giveaways or exclusive experiences, leveraging their influence to reach a wider audience."
    }
  ];

  return (
    <div className="usecases-page">
      <Navbar />

      <section className="usecases-section">
        <div className="usecases-box">
          <h1 className="usecases-title">USECASES</h1>
          <p className="usecases-subtext">
            Discover how SpinWin can transform engagement across various industries
          </p>
        </div>
      </section>

      <section className="usecases-grid-section">
        <div className="usecases-grid">
          {usecases.map((usecase) => (
            <div key={usecase.id} className="usecase-card">
              <div className="usecase-image-container">
                <img src={usecase.image} alt={usecase.title} className="usecase-image" />
              </div>
              <h3 className="usecase-title">{usecase.title}</h3>
              <p className="usecase-description">{usecase.description}</p>
            </div>
          ))}
        </div>

        <div className="usecases-footer">
          <p className="usecases-note">
            Remember, these are just a few examples, and SpinWin's versatility allows it to be customized and tailored to meet the unique needs of different industries.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Usecases;

