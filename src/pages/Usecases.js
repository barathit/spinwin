import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import "./Usecases.css";

function About() {
  return (
    <div>
      <Navbar />

      {/* Section 1: Banner */}
      <section className="usecases-section">
        <div className="usecases-box">
          <h1 className="usecases-title">USECASES</h1>
          <p className="usecases-subtext">
            Certainly! Here are specific use cases for SpinWin across various industries.
          </p>
        </div>
      </section>

      {/* Section 2: Cards */}
    <section className="usecases-section-2">
  <div className="usecases-cards">

         <div className="usecase-card">
          <img src="/assets/uc_ecommerce.png" alt="E-commerce" />
          <h3 className="usecase-title">1. E-commerce</h3>
          <p>
           Boost customer engagement and increase sales by incorporating SpinWin into your marketing campaigns. Offer exclusive discounts, freebies, or surprise giveaways to incentivize purchases and create a sense of excitement among your customers.
          </p>
        </div>

        <div className="usecase-card">
          <img src="/assets/uc_eventmgmt.png" alt="Event Management" />
          <h3 className="usecase-title">2. Event Management</h3>
          <p>
           Enhance event experiences by integrating SpinWin into conferences, trade shows, or virtual events. Use it for raffles, lucky draws, or interactive games to keep attendees engaged and provide them with memorable moments.
          </p>
        </div>

        <div className="usecase-card">
          <img src="/assets/uc_nonprofitorg.png" alt="Education" />
          <h3 className="usecase-title">3. Non-profit Organizations</h3>
          <p>
            SpinWin can be utilized to drive donations and engagement for non-profit organizations. Offer participants the chance to win special experiences, merchandise, or recognition in exchange for their support. This helps create a fun and rewarding environment while promoting the organization's cause.
          </p>
        </div>

        <div className="usecase-card">
          <img src="/assets/uc_hospitality_tourism.png" alt="Retail" />
          <h3 className="usecase-title">4. Hospitality and Tourism</h3>
          <p>
          4. Hospitality and Tourism
Engage guests and visitors by implementing SpinWin in hotels, resorts, or tourist attractions. Use it to offer complimentary room upgrades, restaurant vouchers, or exclusive experiences, encouraging guests to participate and enjoy added benefits during their stay.
          </p>
        </div>

        <div className="usecase-card">
          <img src="/assets/uc_education_training.png" alt="Marketing Agencies" />
          <h3>5. Education and Training</h3>
          <p>
           Gamify learning experiences by incorporating SpinWin into educational platforms or training programs. Reward students or trainees with incentives such as additional course materials, certificates, or exclusive access to resources, motivating them to actively participate and achieve their learning goals.
          </p>
        </div>

        <div className="usecase-card">
          <img src="/assets/uc_hr_employee.png" alt="Hospitality" />
          <h3>6. HR and Employee Engagement</h3>
          <p>
           Foster a positive and engaging work environment by using SpinWin for employee recognition programs or team-building activities. Recognize outstanding performance, celebrate milestones, or organize friendly competitions that bring employees together and boost morale.
          </p>
        </div>

         <div className="usecase-card">
          <img src="/assets/uc_retail_consumergoods.png" alt="Hospitality" />
          <h3>7. Retail and Consumer Goods</h3>
          <p>
           Implement SpinWin as part of your loyalty programs or customer engagement initiatives. Offer customers the chance to win special discounts, gift cards, or exclusive products, incentivizing repeat purchases and creating a sense of exclusivity.
          </p>
        </div>

        <div className="usecase-card">
          <img src="/assets/uc_socialmedia_influencers.png" alt="Hospitality" />
          <h3>8. Social Media Influencers</h3>
          <p>
           Collaborate with influencers and integrate SpinWin into their campaigns. Engage their followers by offering unique giveaways or exclusive experiences, leveraging their influence to reach a wider audience and increase brand visibility.
          </p>
        </div>
        </div>
        <p className="usecases-subtext1">Remember, these are just a few examples, and SpinWin's versatility allows it to be customized and <br /> </p>
        <p className="usecases-subtext2">tailored to meet the unique needs of different industries.</p>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default About;
