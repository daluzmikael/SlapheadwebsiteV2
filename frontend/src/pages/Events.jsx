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

  const EventCard = ({ title, date, location, rsvped, past, onRSVP }) => (
    <div className="event-card">
      <h3 className="event-title">{title}</h3>
      <p className="event-details">📅 {date}</p>
      <p className="event-details">📍 {location}</p>
      <button
        className="event-button"
        onClick={onRSVP}
        disabled={rsvped || past}
      >
        {past ? 'Event ended' : rsvped ? 'RSVPed' : 'RSVP'}
      </button>
    </div>
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter((event) => new Date(`${event.date}T00:00:00`) >= today);
  const pastEvents = events.filter((event) => new Date(`${event.date}T00:00:00`) < today);

  const renderEvents = (items, past = false) => items.map((event) => (
    <EventCard
      key={event.id}
      title={event.name}
      date={event.date}
      location={event.location || 'Location TBD'}
      rsvped={rsvpedIds.has(event.id)}
      past={past}
      onRSVP={() => handleRSVP(event.id)}
    />
  ));

  return (
    <div className="events-page">
      <h2 className="events-title">Events</h2>
      <h3 className="events-section-title">Upcoming</h3>
      <div className="events-grid">
        {upcomingEvents.length > 0
          ? renderEvents(upcomingEvents)
          : <p className="events-empty">No upcoming events have been announced.</p>}
      </div>

      {pastEvents.length > 0 && (
        <>
          <h3 className="events-section-title events-section-title--past">Past events</h3>
          <div className="events-grid events-grid--past">{renderEvents(pastEvents, true)}</div>
        </>
      )}
    </div>
  );
}
