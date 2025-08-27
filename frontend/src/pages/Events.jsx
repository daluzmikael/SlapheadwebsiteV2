import { useState, useEffect } from 'react';
import './Events.css';

export default function Events() {
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const handleRSVP = (eventId) => {
    fetch(`http://localhost:5000/api/events/${eventId}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => console.error("RSVP error:", err));
  };

  const EventCard = ({ title, date, location, onRSVP }) => (
    <div className="event-card">
      <h3 className="event-title">{title}</h3>
      <p className="event-details">📅 {date}</p>
      <p className="event-details">📍 {location}</p>
      <button className="event-button" onClick={onRSVP}>RSVP</button>
    </div>
  );

  return (
    <div className="events-page">
      <h2 className="events-title">Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.name}
            date={event.date}
            location={event.location || "Location TBD"}
            onRSVP={() => handleRSVP(event.id)}
          />
        ))}
      </div>
    </div>
  );
}
