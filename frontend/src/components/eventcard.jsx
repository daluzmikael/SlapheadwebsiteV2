// src/components/EventCard.jsx
export default function EventCard({ title, date, location, onRSVP }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white text-center">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="mb-1">{date}</p>
      <p className="mb-3 text-sm text-gray-600">{location}</p>
      <button
        onClick={onRSVP}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        RSVP
      </button>
    </div>
  );
}
