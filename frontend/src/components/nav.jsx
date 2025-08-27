// src/components/nav.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './nav.css';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <>
      {/* Toggle button always visible in corner */}
      <button className="sidebar-toggle-button" onClick={() => setOpen(!open)}>
        {open ? '×' : '☰'}
      </button>

      <div className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <nav className="nav-links">
          <Link to="/landing" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/song" onClick={() => setOpen(false)}>Songs</Link>
          <Link to="/saved" onClick={() => setOpen(false)}>Account</Link>
          <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          <Link to="/events" onClick={() => setOpen(false)}>Events</Link>
          <Link to="/guide" onClick={() => setOpen(false)}>Guide</Link>
          <Link to="/questionnaire" onClick={() => setOpen(false)}>Questionnaire</Link>
          <Link to="/search" onClick={() => setOpen(false)}>Search</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </div>
    </>
  );
}
