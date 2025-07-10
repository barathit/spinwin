// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useScrollToTop from './hooks/useScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import Usecases from './pages/Usecases';
import Contact from './pages/Contact';
import Dashboardlogin from './pages/Dashboardlogin';
import Dashboardhome from './pages/Dashboardhome';
import Spinpage from './pages/Spinpage';
import CreateWheel from './components/Createwheel';
import WheelBannerGenerator from './pages/WheelBannerGenerator';
// import other pages as needed

// Component that uses the scroll hook inside Router context
function AppRoutes() {
  // This hook will automatically scroll to top on route changes
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/usecases" element={<Usecases />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Dashboardlogin" element={<Dashboardlogin />} />
       <Route path="/Dashboardhome" element={<Dashboardhome />} />

       <Route path="/spinpage" element={<Spinpage />} />
       <Route path="/CreateWheel" element={<CreateWheel />} />
       <Route path="/WheelBannerGenerator" element={<WheelBannerGenerator />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;


