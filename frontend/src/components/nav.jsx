// src/components/nav.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './nav.css';

export default function Nav() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <>
      <button
        className="sidebar-toggle-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Hide navigation' : 'Show navigation'}
        aria-expanded={open}
      >
        {open ? '×' : '☰'}
      </button>

      <div className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <nav className="nav-links">
          <Link to="/landing">Home</Link>
          <Link to="/song">Songs</Link>
          <Link to="/saved">Saved</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/events">Events</Link>
          <Link to="/guide">Artists</Link>
          <Link to="/questionnaire">Taste Profile</Link>
          <Link to="/search">Search</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </div>
    </>
  );
}
