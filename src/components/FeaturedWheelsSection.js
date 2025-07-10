import React, { useEffect, useState } from 'react';
import './FeaturedWheelsSection.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';



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
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWheels = async () => {
      try {
        const payload = {
          method: "getWheelOfTheDay",
          module: "player",
          apikey: "RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA",
          secret: "R1eqD2twI3E4",
        };
        const response = await fetch("https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await response.json();

       console.log("datas", data);

        let parsedBody;
        try {
          parsedBody = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        } catch (e) {
          parsedBody = {};
        }
        console.log("Parsed API body:", parsedBody);
        if (
          parsedBody.status === "success" &&
          Array.isArray(parsedBody.data)
        ) {
          const wheelsData = parsedBody.data.map(wheel => ({
            title: wheel.wheel_name || 'Untitled',
            participants: wheel.pies?.length || 0,
            date: wheel.created_date || new Date().toISOString().slice(0, 10)
          }));
          setWheels(wheelsData);
        } else {
          setWheels(mockWheels);
        }
      } catch (error) {
        setWheels(mockWheels);
      }
    };
    fetchWheels();
  }, []);

  const onplay = () => {
    navigate("./Spinpage");
  };

  return (
    <div className="featured-section">
      <p className="top-text">Try your chance at winning</p>
      <h2 className="title">FEATURED WHEELS</h2>
      <p className="subtitle">Simply text the joining code to participate and win a give away.</p>

      <div className="wheel-cards-container">
        {wheels.map((wheel, index) => (
         <div className="wheel-card" key={index}>
  <img src="/assets/wheels.png" alt="Wheel" className="wheel-image" />
  <hr />
  <h3 className="wheel-title">{wheel.title}</h3>
  <hr />
  <div className="wheel-info">
    <p><i className="fas fa-user"></i> <span className="highlight">{wheel.participants}</span> Participants</p>
     <hr />
    <p><i className="fas fa-clock"></i> {new Date(wheel.date).toLocaleDateString('en-GB')}</p>
  </div>
  <hr />
  <button onClick={onplay} className="play-button">PLAY NOW</button>
</div>

        ))}
      </div>

      <Modal
        isOpen={true}
        className="bg-red-500 p-8"
        overlayClassName="fixed inset-0 flex justify-center items-start z-50"
      >
        
      </Modal>
    </div>
  );
};

export default FeaturedWheelsSection;
