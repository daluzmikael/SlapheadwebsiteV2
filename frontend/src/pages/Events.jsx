import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [rsvpedIds, setRsvpedIds] = useState(new Set());
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events:', err));

    if (userId) {
      fetch(`http://localhost:5000/api/events/rsvped/${userId}`)
        .then(res => (res.ok ? res.json() : []))
        .then(data => setRsvpedIds(new Set(data.map(e => e.id))))
        .catch(err => console.error('Failed to fetch RSVPs:', err));
    }
  }, [userId]);

  const handleRSVP = (eventId) => {
    if (!userId) {
      navigate('/?error=login_required');
      return;
    }

    fetch(`http://localhost:5000/api/events/${eventId}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Number(userId) }),
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          alert(data.error || 'RSVP failed');
          return;
        }
        setRsvpedIds(prev => new Set([...prev, eventId]));
        alert(data.message);
      })
      .catch(() => alert('RSVP failed: network error'));
  };

  const EventCard = ({ title, date, location, eventId, rsvped, onRSVP }) => (
    <div className="event-card">
      <h3 className="event-title">{title}</h3>
      <p className="event-details">📅 {date}</p>
      <p className="event-details">📍 {location}</p>
      <button
        className="event-button"
        onClick={onRSVP}
        disabled={rsvped}
      >
        {rsvped ? 'RSVPed' : 'RSVP'}
      </button>
    </div>
  );

  return (
    <div className="events-page">
      <h2 className="events-title">Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventId={event.id}
            title={event.name}
            date={event.date}
            location={event.location || 'Location TBD'}
            rsvped={rsvpedIds.has(event.id)}
            onRSVP={() => handleRSVP(event.id)}
          />
        ))}
      </div>
    </div>
  );
}
