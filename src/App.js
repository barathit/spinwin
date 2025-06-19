// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import Usecases from './pages/Usecases';
import Contact from './pages/Contact';
import Dashboardlogin from './pages/Dashboardlogin';

// import other pages as needed

function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/usecases" element={<Usecases />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Dashboardlogin" element={<Dashboardlogin />} />
      </Routes>
      
    </Router>
  );
}

export default App;
