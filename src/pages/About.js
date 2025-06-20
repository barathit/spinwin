import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import "./About.css";


const stepsPlayer = [
  { id: '01', title: 'PICK A WHEEL', icon: '/assets/play_icon1.png' },
  { id: '02', title: 'MESSAGE THE CODE', icon: '/assets/play_icon2.png' },
  { id: '03', title: 'WIN BIG', icon: '/assets/play_icon3.png' },
];

const stepsCreator = [
  { id: '01', title: 'CREATE A WHEEL', icon: '/assets/creator_icon1.png' },
  { id: '02', title: 'PUBLISH', icon: '/assets/creator_icon2.png' },
  { id: '03', title: 'REWARD AND REAP LEADS', icon: '/assets/creator_icon3.png' },
];


const StepCard = ({ step }) => (
  <div
    className="hiw-card"
    style={{ backgroundImage: `url('/assets/card-bg-1.jpg')` }}
  >
    <img src={step.icon} alt="icon" className="hiw-icon" />
    <p className="hiw-step-number">{step.id}</p>
    <p className="hiw-step-title">{step.title}</p>
  </div>
);

function About() {
  return (
    <div>
      <Navbar />

      {/* Section 1 */}
      <section className="about-section">
      
        <div className="about-container">
          <h4 className="about-subheading">A few words about us</h4>
          <h1 className="about-heading">
            TEXT YOUR WAY TO VICTORY:<br />
            SPIN THE WHEEL AND WIN BIG!
          </h1>
          <p className="about-description">
            Welcome to SpinWin, the ultimate standalone utility designed to enhance your giveaway experiences...
          </p>
          <p className="about-description">
            At SpinWin, our mission is to provide a seamless and captivating platform that adds value to your giveaway events...
          </p>

          <div className="about-stats">
            <div className="stat-card">
              <h2>23</h2>
              <p>Winners For Last Month</p>
            </div>
            <div className="stat-card">
              <h2>2837K</h2>
              <p>Wheel Run</p>
            </div>
            <div className="stat-card">
              <h2>28387K</h2>
              <p>Payouts to Winners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How SpinWin Works */}
      <section className="hiw-section">
        <h3 className="hiw-subtitle">Getting started? It's simple</h3>
        <h1 className="hiw-title">How Spin<span>Win</span> works</h1>

            <img src="/assets/play.png" alt="Trophy" className="hiw-img-top" />
  <img src="/assets/creator.png" alt="Gamer" className="hiw-img-bottom" />


        <div className="hiw-group">
          <h2 className="hiw-heading">Player</h2>
          <p className="hiw-subheading">Follow these 3 easy steps!</p>
          <div className="hiw-card-wrapper">
            {stepsPlayer.map(step => <StepCard key={step.id} step={step} />)}
          </div>
        </div>

        <div className="hiw-group">
          <h2 className="hiw-heading">Creator</h2>
          <p className="hiw-subheading">Follow these 3 easy steps!</p>
          <div className="hiw-card-wrapper">
            {stepsCreator.map(step => <StepCard key={step.id} step={step} />)}
          </div>
        </div>
      </section>
        
          {/* section3 */}

               <section className="section3">
      <div className="section3-container">
        <div className="section3-heading-block">
          <h4 className="section3-tagline">Unlocking the Potential of SpinWin</h4>
          <h1 className="section3-title">What makes SpinWin <br /> different?</h1>
          <p className="section3-desc">
            We believe that SpinWin has immense potential to enhance engagement and optimize giveaway
            experiences across a wide range of organizations. Our platform can be seamlessly integrated
            with various communication tools and management systems, allowing you to tailor the giveaway
            experience to your specific needs.
          </p>
        </div>

        <div className="section3-heading-block">
          <h4 className="section3-tagline">Get in touch with our friendly support</h4>
          <h1 className="section3-title">SCHEDULE A CONSULTATION</h1>
          <p className="section3-desc">
            If you are interested in discovering how SpinWin can elevate your giveaway events and engage
            your audience like never before, we would be delighted to schedule a consultation with you.
            Our team is eager to provide a comprehensive overview of SpinWin's features and benefits,
            customized to your organization’s requirements.
          </p>
          <p className="section3-desc">
            Thank you for considering SpinWin. Get ready to transform your giveaway experiences into
            memorable and captivating events with our innovative platform.
          </p>
        </div>

        <div className="section3-cards">
  <div className="section3-card">
    <div className="section3-card-left">
      <img src="/assets/support_team.png" alt="Support Icon" className="section3-card-img" />
    </div>
    <div className="section3-card-right">
      <h3>Talk to our support team</h3>
      <p>Got a question about SpinWin? Get in touch with our friendly staff.</p>
      <div className="section3-buttons">
        <button className="btn-outline">Call Us 📞</button>
        <button className="btn-filled">Email Us ✉️</button>
      </div>
    </div>
  </div>

  <div className="section3-card">
    <div className="section3-card-left">
      <img src="/assets/support_guide.png" alt="Guide Icon" className="section3-card-img" />
    </div>
    <div className="section3-card-right">
      <h3>Our Guide to SpinWin</h3>
      <p>Check out our FAQs to see if we can help you out.</p>
      <div className="section3-buttons">
        <button className="btn-outline">FAQs & Help</button>
      </div>
    </div>
  </div>
</div>
      </div>
      <img src="/assets/twheel_potential.png" alt="Decorative Bubble Icons" className="top-right-image" />
    </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default About;
