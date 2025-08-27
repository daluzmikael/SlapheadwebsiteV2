// src/pages/RSVP.jsx
export default function RSVP() {
    const events = [
      { title: "Paws & Play Adoption Day", date: "April 13, 2025", time: "11:00 AM – 3:00 PM", location: "Pet Haven Main Store Parking Lot" },
      { title: "Caturday Lounge & Cat Adoption", date: "April 20, 2025", time: "12:00 PM – 4:00 PM", location: "Pet Haven Indoor Cat Lounge" }
    ];
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Event RSVP</h2>
        {events.map((event, i) => (
          <div key={i} className="border p-4 mb-4">
            <p className="font-bold">{event.title}</p>
            <p>{event.date} | {event.time}</p>
            <p>{event.location}</p>
            <button className="bg-blue-500 text-white px-4 py-1 mt-2">RSVP</button>
          </div>
        ))}
      </div>
    );
  }