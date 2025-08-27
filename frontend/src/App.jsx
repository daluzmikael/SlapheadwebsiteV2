// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Nav from './components/nav';

import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Landing from './pages/Landing';
import Adopt from './pages/Adopt';
import Saved from './pages/Saved';
import FAQ from './pages/FAQ';
import Events from './pages/Events';
import Guide from './pages/Guide';
import Questionnaire from './pages/Questionnaire';
import Matching from './pages/Matching';

function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("userEmail");
  const hideNav = location.pathname === "/";

  return (
    <>
      {isLoggedIn && !hideNav && <Nav />}
      <div className="min-h-screen bg-white text-black font-sans">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} /> {}
          <Route path="/landing" element={<Landing />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/events" element={<Events />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/matching" element={<Matching />} />
        </Routes>
      </div>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
