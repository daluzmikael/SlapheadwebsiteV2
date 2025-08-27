import { useEffect, useState } from "react";
import "./Saved.css";

export default function Saved() {
  const [pets, setPets] = useState([]);
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/pets/saved/${userId}`)
      .then(res => res.json())
      .then(data => setPets(data));

    fetch(`http://localhost:5000/api/events/rsvped/${userId}`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [userId]);

  const handleUnsavePet = (petId) => {
    fetch(`http://localhost:5000/api/pets/${petId}/unsave`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setPets(prev => prev.filter(pet => pet.id !== petId));
      })
      .catch(err => console.error("Unsave failed:", err));
  };

  const handleUnRSVP = (eventId) => {
    fetch(`http://localhost:5000/api/events/${eventId}/rsvp`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setEvents(prev => prev.filter(e => e.id !== eventId));
      })
      .catch(err => console.error("Un-RSVP failed:", err));
  };

  return (
    <div className="saved-page">
      <h2 className="saved-title">Your Saved Pets & Events</h2>

      <h3></h3>
      <div className="saved-grid">
        {pets.map(p => (
          <div key={p.id} className="pet-card">
            <img
              src={`/images/${p.image || "placeholder.jpg"}`}
              className="pet-image"
              alt={p.name || "Saved Pet"}
            />
            <p className="pet-name">{p.name}</p>
            <p>{p.species}</p>
            <button
              className="save-button"
              onClick={() => handleUnsavePet(p.id)}
            >
              Unsave Pet
            </button>
          </div>
        ))}
      </div>

      <h3 className="mt-8"></h3>
      <div className="saved-grid">
        {events.map(e => (
          <div key={e.id} className="pet-card">
            <p className="pet-name">{e.name}</p>
            <p>{e.date}</p>
            <button
              className="save-button"
              onClick={() => handleUnRSVP(e.id)}
            >
              Remove RSVP
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
