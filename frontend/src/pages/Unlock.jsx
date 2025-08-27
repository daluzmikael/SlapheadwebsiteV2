// src/pages/Unlock.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Unlock.css';

export default function Unlock() {
  const navigate = useNavigate();

  const songs = [
    {
      id: 1,
      title: "Golden Skies",
      artist: "slaphead",
      length: "3:42"
    },
    {
      id: 2,
      title: "Shape of You",
      artist: "Ed Sheeran",
      length: "3:53"
    },
    {
      id: 3,
      title: "Levitating",
      artist: "Dua Lipa",
      length: "3:23"
    }
  ];

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/?error=login_required");
    }
  }, [navigate]);

  const handleSave = (songId) => {
    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:5000/api/songs/${songId}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: userId })
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => console.error("Save failed:", err));
  };

  const handleImageError = (e) => {
    e.target.src = '/default.jpg'; 
  };

  return (
    <div className="unlock-page">
      <h2 className="unlock-title">Available Songs</h2>
      <div className="unlock-grid">
        {songs.map((song) => {
          const imageName = `${song.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
          return (
            <div key={song.id} className="song-card">
              <img
                src={`/${imageName}`}
                alt={song.title}
                className="song-image"
                onError={handleImageError}
              />
              <h3 className="song-title">{song.title}</h3>
              <p className="song-details">{song.artist} - {song.length}</p>
              <button
                className="save-button"
                onClick={() => handleSave(song.id)}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
