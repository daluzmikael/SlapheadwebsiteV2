import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SongPlayer from "../components/SongPlayer";
import { getSongDisplayTitle } from "../utils/songAudio";
import "./Saved.css";

export default function Saved() {
  const [songs, setSongs] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/?error=login_required");
      return;
    }

    fetch(`http://localhost:5000/api/songs/saved/${userId}`)
      .then(res => (res.ok ? res.json() : []))
      .then(data => setSongs(data));

    fetch(`http://localhost:5000/api/events/rsvped/${userId}`)
      .then(res => (res.ok ? res.json() : []))
      .then(data => setEvents(data));
  }, [userId, navigate]);

  const handleUnsaveSong = (songId) => {
    fetch(`http://localhost:5000/api/songs/${songId}/unsave`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: Number(userId) }),
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          alert(data.error || "Remove failed");
          return;
        }
        alert(data.message);
        setSongs(prev => prev.filter(song => song.id !== songId));
      })
      .catch(err => console.error("Unsave failed:", err));
  };

  const handleUnRSVP = (eventId) => {
    fetch(`http://localhost:5000/api/events/${eventId}/rsvp`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: Number(userId) }),
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          alert(data.error || "Remove RSVP failed");
          return;
        }
        alert(data.message);
        setEvents(prev => prev.filter(e => e.id !== eventId));
      })
      .catch(err => console.error("Un-RSVP failed:", err));
  };

  return (
    <div className="saved-page">
      <h2 className="saved-title">Your Saved Songs & Events</h2>

      <h3 className="saved-section-title">Saved Songs</h3>
      <div className="saved-grid">
        {songs.length === 0 ? (
          <p>No saved songs yet.</p>
        ) : (
          songs.map(s => (
            <div key={s.id} className="song-card">
              <h3 className="song-title">{getSongDisplayTitle(s)}</h3>
              <SongPlayer song={s} />
              <button
                className="save-button"
                onClick={() => handleUnsaveSong(s.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <h3 className="saved-section-title">RSVPed Events</h3>
      <div className="saved-grid">
        {events.length === 0 ? (
          <p>No RSVPs yet.</p>
        ) : (
          events.map(e => (
            <div key={e.id} className="event-card-saved">
              <p className="song-title">{e.name}</p>
              <p>{e.date}</p>
              <button
                className="save-button"
                onClick={() => handleUnRSVP(e.id)}
              >
                Remove RSVP
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
